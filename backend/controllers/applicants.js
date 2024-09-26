const applicantRouter = require("express").Router()
const Blog = require("../models/applicantSchema")

const { adminAuthentication } = require("../utils/middleware")

applicantRouter.get("/", adminAuthentication, async (request, response) => {
    const blogs = await Blog.find({})
        .populate("preferredCourse.course", {
            name: 1,
        })
        .sort({ createdAt: -1 })
    response.json(blogs)
})

applicantRouter.get(
    "/:id",
    adminAuthentication,
    async (request, response, next) => {
        const id = request.params.id
        try {
            const blog = await Blog.findById(id).populate(
                "preferredCourse.course",
                {
                    name: 1,
                }
            )
            if (!blog) {
                return response.status(404).json({ error: "Blog not found" })
            }
            response.json(blog)
        } catch (error) {
            next(error)
        }
    }
)

applicantRouter.post("/", async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
        if (result) {
            return response.status(201).json({
                success: true,
                result,
            })
        }
    } catch (error) {
        next(error)
    }
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

applicantRouter.put("/:id", adminAuthentication, async (req, res, next) => {
    const id = req.params.id
    const { status } = req.body
    const lastUpdatedBy = req.admin.name

    try {
        const applicant = await Blog.findByIdAndUpdate(
            id,
            { status, lastUpdatedBy },
            { new: true, runValidators: true }
        ).populate("preferredCourse.course", {
            name: 1,
        })
        if (!applicant) {
            return res.status(404).send({ error: "Applicant not found" })
        }
        res.json(applicant)
    } catch (error) {
        next(error)
        // res.status(500).send({ error: "Server error" })
    }
})

module.exports = applicantRouter
