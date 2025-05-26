export type Patient = {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  address: string;
  registration_date: string;
  national_id?: string ;
  gender: string;
  email?: string | null;
  emergency_contact?: string ;
  blood_type?: string ;
  medical_history?: string | null;
  insurance_provider?: string | null;
  insurance_number?: string | null;
  language_preference?: string ;
  notes?: string | null;
};
