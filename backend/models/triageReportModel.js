import mongoose from "mongoose";

const triageReportSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "" },
    patient: {
      name: { type: String, default: "" },
      age: { type: Number, default: null },
      gender: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
    intake: {
      symptoms: { type: String, required: true },
      duration: { type: String, default: "" },
      history: { type: String, default: "" },
      preferredVisitDate: { type: String, default: "" },
    },
    analysis: {
      urgency: { type: String, default: "Routine" },
      summary: { type: String, required: true },
      probableDepartments: { type: [String], default: [] },
      redFlags: { type: [String], default: [] },
      careAdvice: { type: [String], default: [] },
    },
    recommendedDoctors: { type: [Object], default: [] },
    source: { type: String, default: "rule-based-fallback" },
    pdfDownloads: { type: Number, default: 0 },
  },
  { timestamps: true, minimize: false },
);

const triageReportModel =
  mongoose.models.triageReport || mongoose.model("triageReport", triageReportSchema);

export default triageReportModel;
