const courseRouter = require("express").Router()
const { adminAuthentication } = require ("../utils/middleware")

const Courses = require("../models/courses")

courseRouter.get("/", async (req, res) => {
    const courses = await Courses.find({})
    res.json(courses)
})

courseRouter.post("/",adminAuthentication, async (req, res, next) => {
    try {
        const newCourse = new Courses(req.body)
        const result = await newCourse.save()
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

courseRouter.put("/:id",adminAuthentication, async (req, res, next) => {
    const eidtId = req.params.id
    const updateBody = req.body
    try {
        const updatedCourse = await Courses.findByIdAndUpdate(
            eidtId,
            updateBody,
            { new: true }
        )
        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" })
        }
        res.status(200).json(updatedCourse)
    } catch (error) {
        next(error)
    }
})

courseRouter.delete("/:id",adminAuthentication, async (req, res, next) => {
    const deleteId = req.params.id
    try {
        const deletetedCourse = await Courses.findByIdAndDelete(deleteId)
        if (!deletetedCourse) {
            return res.status(404).json({ error: "Course Not found" })
        }
        res.status(200).json({ message: "Course deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = courseRouter;
