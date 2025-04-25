export interface PatientData {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  address?: string;
  email?: string;
  contactNumber?: string;
  governmentIdType?: string;
  governmentIdNumber?: string;
  governmentIdFile?: File | null;
}

export interface AdmissionData {
  admissionDateTime: string;
  dischargeDateTime: string;
  patientType: string;
}

export interface MedicalData {
  medicalAbstract: File | null;
  finalDiagnosis: File | null;
  testResults: File | null;
}

export interface InsuranceData {
  policyNumber: string;
  memberName: string;
  relationship: string;
  hmoProvider: string;
  otherHmoProvider?: string;
  loa: File | null;
}

export interface BillingData {
  soa: File | null;
  billingAmount: number;
}
