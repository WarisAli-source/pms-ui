export interface MedicalRecord {
    patientId: number | null;
    diagnosis: string;
    treatment: string;
    notes: string;
    createdAt?: string;
    updatedAt?: string;
    id:number;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
    pageSize: number;
  }