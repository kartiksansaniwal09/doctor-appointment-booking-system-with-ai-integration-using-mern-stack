import OpenAI from "openai";

const SPECIALITY_RULES = [
  {
    speciality: "Cardiology",
    keywords: ["chest pain", "palpitations", "bp", "blood pressure", "heart", "breathless", "shortness of breath"],
    redFlags: ["chest pain", "breathless", "fainting"],
  },
  {
    speciality: "Internal Medicine",
    keywords: ["fever", "body ache", "weakness", "infection", "fatigue", "general physician", "adult medicine"],
    redFlags: ["high fever", "confusion", "sepsis"],
  },
  {
    speciality: "Neurology",
    keywords: ["headache", "migraine", "seizure", "stroke", "weakness", "numbness", "vertigo", "dizziness"],
    redFlags: ["stroke", "seizure", "one-sided weakness", "loss of speech"],
  },
  {
    speciality: "Neuro Surgery",
    keywords: ["brain tumor", "spine injury", "slip disc", "spinal", "neurosurgery", "head injury"],
    redFlags: ["head injury", "paralysis"],
  },
  {
    speciality: "Gastroenterology",
    keywords: ["acidity", "gas", "stomach pain", "vomiting", "liver", "jaundice", "endoscopy", "digestion"],
    redFlags: ["vomiting blood", "black stool"],
  },
  {
    speciality: "Pulmonology",
    keywords: ["cough", "asthma", "wheezing", "breathing", "lung", "allergy", "spo2"],
    redFlags: ["low oxygen", "breathing difficulty"],
  },
  {
    speciality: "Nephrology",
    keywords: ["kidney", "creatinine", "urine", "swelling", "dialysis"],
    redFlags: ["stopped urine", "severe swelling"],
  },
  {
    speciality: "Urology",
    keywords: ["urination", "stone", "burning urine", "prostate", "bladder"],
    redFlags: ["blood in urine", "acute retention"],
  },
  {
    speciality: "Orthopedics",
    keywords: ["joint pain", "knee", "back pain", "fracture", "shoulder", "bone"],
    redFlags: ["fracture", "unable to walk"],
  },
  {
    speciality: "Pediatrics",
    keywords: ["child", "baby", "fever in child", "vaccination", "newborn"],
    redFlags: ["child breathing difficulty", "dehydration"],
  },
  {
    speciality: "ENT, Head and Neck Surgery",
    keywords: ["ear pain", "sinus", "throat pain", "tonsil", "hearing", "nose blockage", "ent"],
    redFlags: ["stridor", "airway swelling", "sudden hearing loss"],
  },
  {
    speciality: "Ophthalmology",
    keywords: ["eye pain", "vision", "blurred vision", "red eye", "eye injury", "cataract"],
    redFlags: ["sudden vision loss", "chemical injury", "eye trauma"],
  },
  {
    speciality: "Gynae & Obs.",
    keywords: ["pregnancy", "period", "gyne", "gynae", "pcod", "bleeding", "women health"],
    redFlags: ["pregnancy bleeding", "severe abdominal pain in pregnancy"],
  },
  {
    speciality: "Dermatology",
    keywords: ["skin", "rash", "itching", "acne", "hair fall", "pigmentation"],
    redFlags: ["rapid swelling", "severe allergic rash"],
  },
  {
    speciality: "Psychiatry",
    keywords: ["anxiety", "depression", "stress", "panic", "sleep issue", "mental health"],
    redFlags: ["self harm", "suicidal"],
  },
  {
    speciality: "Dental Surgery",
    keywords: ["tooth pain", "gum pain", "dental", "root canal", "oral pain", "jaw pain"],
    redFlags: ["facial swelling", "dental abscess"],
  },
  {
    speciality: "Medical Oncology",
    keywords: ["cancer", "chemotherapy", "tumor", "oncology"],
    redFlags: ["active bleeding", "rapid weight loss"],
  },
  {
    speciality: "Endocrinology",
    keywords: ["thyroid", "diabetes", "hormone", "pcod", "sugar", "weight gain", "metabolism"],
    redFlags: ["very high sugar", "dka", "thyroid storm"],
  },
];

const normalize = (value = "") => value.toLowerCase().trim();
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const getRuleScores = (text) => {
  const haystack = normalize(text);

  return SPECIALITY_RULES.map((rule) => {
    const score = rule.keywords.reduce(
      (total, keyword) => total + (haystack.includes(keyword) ? 1 : 0),
      0,
    );
    return { ...rule, score };
  }).filter((rule) => rule.score > 0);
};

export const analyzeSymptoms = async ({ symptoms, duration, history, patient }, doctors) => {
  const sourceText = [symptoms, duration, history, patient?.gender, patient?.age]
    .filter(Boolean)
    .join(" ");

  const matches = getRuleScores(sourceText).sort((a, b) => b.score - a.score);
  const probableDepartments = matches.length
    ? matches.slice(0, 3).map((item) => item.speciality)
    : ["Internal Medicine"];

  const redFlags = [...new Set(matches.flatMap((item) => item.redFlags.filter((flag) => normalize(sourceText).includes(flag))))];

  const urgency =
    redFlags.length > 0
      ? "High Priority"
      : normalize(sourceText).includes("fever") || normalize(sourceText).includes("pain")
        ? "Priority"
        : "Routine";

  const recommendedDoctors = doctors
    .filter((doctor) => probableDepartments.includes(doctor.speciality))
    .sort((a, b) => Number(b.available) - Number(a.available))
    .slice(0, 4)
    .map((doctor) => ({
      _id: doctor._id,
      name: doctor.name,
      speciality: doctor.speciality,
      degree: doctor.degree,
      experience: doctor.experience,
      opdDays: doctor.opdDays || "Please confirm with hospital desk",
      image: doctor.image,
      available: doctor.available,
      address: doctor.address,
      fees: doctor.fees,
    }));

  const summary = `Based on the symptoms provided${duration ? ` over ${duration}` : ""}, the most relevant starting departments are ${probableDepartments.join(", ")}. This is an assistance layer for doctor discovery and not a final medical diagnosis.`;

  const careAdvice = [
    "Carry any previous reports, prescriptions, and lab values for faster consultation.",
    "If symptoms worsen suddenly or include any emergency signs, seek emergency care immediately.",
    "Use the recommended doctor list to book the closest relevant OPD instead of guessing the specialty manually.",
  ];

  return {
    source: "rule-based-fallback",
    analysis: {
      urgency,
      summary,
      probableDepartments,
      redFlags,
      careAdvice,
    },
    recommendedDoctors,
  };
};

const AI_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    urgency: { type: "string", enum: ["Routine", "Priority", "High Priority"] },
    summary: { type: "string" },
    probableDepartments: {
      type: "array",
      items: { type: "string" },
    },
    redFlags: {
      type: "array",
      items: { type: "string" },
    },
    careAdvice: {
      type: "array",
      items: { type: "string" },
    },
    matchingSymptoms: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["urgency", "summary", "probableDepartments", "redFlags", "careAdvice", "matchingSymptoms"],
};

export const analyzeSymptomsWithOpenAI = async (payload, doctors) => {
  if (!openai) {
    return analyzeSymptoms(payload, doctors);
  }

  const doctorCatalog = doctors.map((doctor) => ({
    id: String(doctor._id),
    name: doctor.name,
    speciality: doctor.speciality,
    degree: doctor.degree,
    experience: doctor.experience,
    opdDays: doctor.opdDays || "Please confirm with hospital desk",
    symptomFocus: doctor.symptomFocus || [],
    available: doctor.available,
  }));

  const prompt = {
    patient: payload.patient || {},
    symptoms: payload.symptoms,
    duration: payload.duration,
    history: payload.history,
    preferredVisitDate: payload.preferredVisitDate,
    doctors: doctorCatalog,
    instruction:
      "Analyze the patient intake, infer the most relevant specialties from the provided doctor list, identify urgency and red flags, and return only structured JSON. Do not claim a confirmed diagnosis. Keep probableDepartments aligned to available doctor specialities.",
  };

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "You are a careful hospital triage assistant for doctor discovery. Recommend appropriate specialties and booking guidance from the supplied doctor catalog. Avoid overclaiming diagnoses.",
        },
        {
          role: "user",
          content: JSON.stringify(prompt),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "triage_recommendation",
          schema: AI_SCHEMA,
          strict: true,
        },
      },
    });

    const parsed = JSON.parse(response.output_text);
    const probableDepartments = parsed.probableDepartments.length
      ? parsed.probableDepartments
      : ["Internal Medicine"];

    const recommendedDoctors = doctors
      .filter((doctor) => probableDepartments.includes(doctor.speciality))
      .sort((a, b) => Number(b.available) - Number(a.available))
      .slice(0, 4)
      .map((doctor) => ({
        _id: doctor._id,
        name: doctor.name,
        speciality: doctor.speciality,
        degree: doctor.degree,
        experience: doctor.experience,
        opdDays: doctor.opdDays || "Please confirm with hospital desk",
        image: doctor.image,
        available: doctor.available,
        address: doctor.address,
        fees: doctor.fees,
      }));

    return {
      source: "openai-responses-api",
      analysis: {
        urgency: parsed.urgency,
        summary: parsed.summary,
        probableDepartments,
        redFlags: parsed.redFlags,
        careAdvice: parsed.careAdvice,
        matchingSymptoms: parsed.matchingSymptoms,
      },
      recommendedDoctors,
    };
  } catch (error) {
    console.log("OpenAI analysis failed, falling back to rules:", error.message);
    return analyzeSymptoms(payload, doctors);
  }
};
