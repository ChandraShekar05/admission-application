const applicantRouter = require("express").Router()
const Blog = require("../models/applicantSchema")

applicantRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("preferredCourse.course", {
        name: 1,
    })
    response.json(blogs)
})

applicantRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    return response.status(201).json(result)
})

applicantRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id
    try {
        const blog = await Blog.findByIdAndDelete(id)
        if (!blog) {
            return response.status(404).json({ error: "Blog not found" })
        }
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

applicantRouter.put("/:id", async (req, res, next) => {
    const id = req.params.id
    const blog = req.body

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
            new: true,
        })
        res.status(200).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = applicantRouter
