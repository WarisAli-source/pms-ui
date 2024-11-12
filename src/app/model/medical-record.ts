export interface MedicalRecord {
    patientId: number | null;
    diagnosis: string;
    treatment: string;
    notes: string;
    createdAt?: string;
    updatedAt?: string;
    id:number;
}