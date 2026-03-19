import bcrypt from "bcrypt";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import doctorModel from "../models/doctorModel.js";
import { ncjimsDoctors } from "../data/ncjimsDoctors.js";

const run = async () => {
  try {
    await connectDB();

    for (const doctor of ncjimsDoctors) {
      const exists = await doctorModel.findOne({ email: doctor.email });
      if (exists) {
        continue;
      }

      const hashedPassword = await bcrypt.hash("Doctor@123", 10);
      await doctorModel.create({
        ...doctor,
        password: hashedPassword,
        consultationModes: ["In-person OPD", "Follow-up review"],
        languages: ["English", "Hindi"],
        date: Date.now(),
      });
    }

    console.log("NCJIMS doctor seed complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
