const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: { type: Number, maxlength: 16, unique: true },
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort: Number,
    projects: Array
})


const Student = mongoose.model("Student", studentSchema)

module.exports = Student