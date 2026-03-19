import PDFDocument from "pdfkit";
import doctorModel from "../models/doctorModel.js";
import triageReportModel from "../models/triageReportModel.js";
import { analyzeSymptomsWithOpenAI } from "../services/aiRecommendationService.js";

const analyzePatientCase = async (req, res) => {
  try {
    const { userId = "", patient = {}, symptoms = "", duration = "", history = "", preferredVisitDate = "" } = req.body;

    if (!symptoms.trim()) {
      return res.json({ success: false, message: "Symptoms are required for AI analysis" });
    }

    const doctors = await doctorModel.find({}).select("-password");
    const recommendation = await analyzeSymptomsWithOpenAI(
      { patient, symptoms, duration, history, preferredVisitDate },
      doctors,
    );

    const report = await triageReportModel.create({
      userId,
      patient,
      intake: { symptoms, duration, history, preferredVisitDate },
      analysis: recommendation.analysis,
      recommendedDoctors: recommendation.recommendedDoctors,
      source: recommendation.source,
    });

    res.json({
      success: true,
      reportId: report._id,
      report,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getTriageReport = async (req, res) => {
  try {
    const report = await triageReportModel.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, report });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserReportHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    const reports = await triageReportModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, reports });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const downloadTriageReportPdf = async (req, res) => {
  try {
    const report = await triageReportModel.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    report.pdfDownloads += 1;
    await report.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="appointex-triage-${report._id}.pdf"`,
    );

    const doc = new PDFDocument({ margin: 48 });
    doc.pipe(res);

    doc.fontSize(24).text("Appointex AI Summary Report");
    doc.moveDown(0.4);
    doc.fontSize(11).fillColor("#555").text(`Generated on: ${new Date(report.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.fillColor("#000").fontSize(16).text("Patient Intake");
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Name: ${report.patient.name || "Not provided"}`);
    doc.text(`Age: ${report.patient.age || "Not provided"}`);
    doc.text(`Gender: ${report.patient.gender || "Not provided"}`);
    doc.text(`Symptoms: ${report.intake.symptoms}`);
    doc.text(`Duration: ${report.intake.duration || "Not provided"}`);
    doc.text(`History: ${report.intake.history || "Not provided"}`);
    doc.moveDown();

    doc.fontSize(16).text("AI Guidance");
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Urgency: ${report.analysis.urgency}`);
    doc.text(`Summary: ${report.analysis.summary}`);
    doc.text(`Relevant departments: ${report.analysis.probableDepartments.join(", ") || "General review"}`);
    if (report.analysis.redFlags.length) {
      doc.moveDown(0.3);
      doc.text(`Red flags: ${report.analysis.redFlags.join(", ")}`);
    }

    doc.moveDown();
    doc.fontSize(16).text("Recommended Doctors");
    doc.moveDown(0.5);
    report.recommendedDoctors.forEach((doctor, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ${doctor.name} • ${doctor.speciality} • ${doctor.opdDays || "OPD to be confirmed"}`,
      );
    });

    doc.moveDown();
    doc.fontSize(16).text("Patient Guidance");
    doc.moveDown(0.5);
    report.analysis.careAdvice.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. ${item}`);
    });

    doc.moveDown();
    doc.fontSize(10).fillColor("#666").text(
      "This summary supports doctor discovery and appointment routing. It is not a confirmed medical diagnosis.",
    );

    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { analyzePatientCase, getTriageReport, getUserReportHistory, downloadTriageReportPdf };
