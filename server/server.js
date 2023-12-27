const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect('mongodb://127.0.0.1/google-docs-clone');


const io = require("socket.io")(3001, {
  cors: {
    origin: "https://docs-clone-vite-client.vercel.app",
    methods: ["GET", "POST"],
  },
})
console.log("Hello connected")
const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}
