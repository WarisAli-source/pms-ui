import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Patient } from './patient.service';
import { MedicalRecord } from '../model/medical-record';
import { AuthServiceService } from './auth-service.service';


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

  constructor(private http: HttpClient,private authService: AuthServiceService) {}
  getHeaders(): { [header: string]: string } {
    const token = this.authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  getAllPatientsWithMedicalRecords(): Observable<PatientWithRecordsDTO[]> {
    const headers = this.getHeaders();
    return this.http.get<PatientWithRecordsDTO[]>(`${this.apiUrl}/medical-records/all-records`,{headers});
  }

  getAllPatients(): Observable<Patient[]> {
    const headers = this.getHeaders();
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/allPatientsWithoutPagination`,{headers});
  }

  getAllMedicalRecords(): Observable<MedicalRecord[]> {
    const headers = this.getHeaders();
    return this.http.get<MedicalRecord[]>(`${this.apiUrl}/medical-records`,{headers});
  }
  getAllMedicalRecordsCount():Observable<number>{
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/medical-records/medicalRecordsCount`,{headers});
  }

  addMedicalRecord(patientId: number, record: MedicalRecord): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/medical-records?patientId=${patientId}`;
    return this.http.post(url, record,{headers});
  }
  deleteMedicalRecord(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/medical-records/${id}`,{headers});
  }
  getMedicalRecordById(id: number): Observable<MedicalRecord> {
    const headers = this.getHeaders();
    return this.http.get<MedicalRecord>(`${this.apiUrl}/medical-records/records/${id}`,{headers}); 
  }

  updateMedicalRecord(id: number, record: MedicalRecord): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<MedicalRecord>(`${this.apiUrl}/medical-records/${id}`, record,{headers}); 
  }

}
