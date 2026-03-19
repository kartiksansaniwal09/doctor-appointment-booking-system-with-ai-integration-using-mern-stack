import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    patientConcern: { type: String, default: "" },
    reportId: { type: String, default: "" },
    symptomProfile: { type: Object, default: {} },
    recommendationSnapshot: { type: Object, default: {} },
    doctorNotes: { type: String, default: "" },
    doctorDiagnosis: { type: String, default: "" },
    followUpPlan: { type: String, default: "" },
    prescriptionSummary: { type: String, default: "" },
    notesUpdatedAt: { type: Number, default: 0 },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
})

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel
