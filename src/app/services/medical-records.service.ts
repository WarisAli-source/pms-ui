import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Patient } from './patient.service';
import { MedicalRecord } from '../model/medical-record';


export interface PatientWithRecordsDTO {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  medicalRecords: MedicalRecord[];
}

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordsService {

  private apiUrl = environment.API_URL_CLIENT;

  constructor(private http: HttpClient) {}

  getAllPatientsWithMedicalRecords(): Observable<PatientWithRecordsDTO[]> {
    return this.http.get<PatientWithRecordsDTO[]>(`${this.apiUrl}/medical-records/all-records`);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  getAllMedicalRecords(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.apiUrl}/medical-records`);
  }

  addMedicalRecord(patientId: number, record: MedicalRecord): Observable<any> {
    const url = `${this.apiUrl}/medical-records?patientId=${patientId}`;
    return this.http.post(url, record);
  }
}
