import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: true },
    hospital: { type: String, default: "O.P. Jindal / NCJIMS, Hisar" },
    opdDays: { type: String, default: "Monday to Saturday" },
    opdNote: { type: String, default: "" },
    consultationModes: { type: [String], default: ["In-person OPD"] },
    symptomFocus: { type: [String], default: [] },
    secondarySpecialities: { type: [String], default: [] },
    departmentFacilities: { type: [String], default: [] },
    languages: { type: [String], default: ["English", "Hindi"] },
    sourceUrl: { type: String, default: "https://www.ncjims.org/departments.html" },
    date: { type: Number, required: true },
}, { minimize: false })

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;
