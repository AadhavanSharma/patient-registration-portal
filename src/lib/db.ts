import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import PGWorker from "./../../public/worker.js?worker";
import type { Patient } from "@/lib/types";

const db = await PGliteWorker.create(new PGWorker({ name: "pglite-worker" }), {
  dataDir: "idb://medBlocks-db",
  meta: {},
  extensions: { live },
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    address TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    national_id TEXT NOT NULL,
    gender TEXT NOT NULL,
    email TEXT,
    emergency_contact TEXT NOT NULL,
    blood_type TEXT NOT NULL,
    medical_history TEXT,
    insurance_provider TEXT,
    insurance_number TEXT,
    language_preference TEXT NOT NULL,
    notes TEXT
  );
`);

export const insertPatient = async (patient: Patient) => {
  try {
    const result = await db.query(
      `INSERT INTO patients (
        first_name, last_name, date_of_birth, gender, email, phone, 
        address, blood_type, medical_history, language_preference, emergency_contact,
        national_id, insurance_provider, insurance_number, notes, registration_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id;`,
      [
        patient.first_name,
        patient.last_name,
        patient.date_of_birth,
        patient.gender,
        patient.email,
        patient.phone,
        patient.address,
        patient.blood_type,
        patient.medical_history,
        patient.language_preference,
        patient.emergency_contact,
        patient.national_id,
        patient.insurance_provider,
        patient.insurance_number,
        patient.notes,
        patient.registration_date,
      ]
    );

    return result;
  } catch (error) {
    console.error("Error inserting patient:", error);
    throw error;
  }
};

export const deletePatient = async (id: number) => {
  try {
    await db.query("DELETE FROM patients WHERE id = $1;", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

export const executeQuery = async (query: string) => {
  try {
    const result = await db.query(query);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

export default db;
