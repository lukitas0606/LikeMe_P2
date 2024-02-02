const express = require("express")
const cors = require("cors")
const app = express()
const {
    obtenerPost,
    addPost,
    updatePost,
    deletePost,
} = require("../utils/pg.js")

app.use(express.json())
app.use(cors())

app.get("/posts", async (_, res, next) => {
    try {
        const posteos = await obtenerPost()
        res.json(posteos)
    } catch (error) {
        next(error)
    }
});

app.post("/posts", async (req, res, next) => {
    const { titulo, img, descripcion } = req.body
    try {
        await addPost(titulo, img, descripcion)
        res.status(201).json("Se ha agregado con éxito")
    } catch (error) {
        next(error)
    }
});

app.put("/posts/like/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        await updatePost(id)
        res.status(200).json("Post modificado con éxito")
    } catch (error) {
        next(error)
    }
});

app.delete("/posts/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        await deletePost(id)
        res.status(204).json("Post eliminado con éxito")
    } catch (error) {
        next(error)
    }
});

app.listen(3000, () => console.log("¡Servidor OK!"))
