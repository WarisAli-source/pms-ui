import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { AuthServiceService } from './auth-service.service';
import { PaginatedResponse } from '../model/medical-record';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient,private authService :AuthServiceService) {}

  private apiUrl = environment.API_URL_CLIENT + '/patients'; 

  
  getHeaders(): { [header: string]: string } {
    const token = this.authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  getAllPatients(): Observable<Patient[]> {
    const headers = this.getHeaders();
    return this.http.get<Patient[]>(this.apiUrl, { headers });
  }
  getAllPatientsPagination(page: number, size: number, sortBy: string, direction: string): Observable<PaginatedResponse<Patient>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);
  
    const headers = new HttpHeaders(this.getHeaders());
    return this.http.get<PaginatedResponse<Patient>>(this.apiUrl, { params, headers });
  }

  getAllPatientsCount(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/patientCount`, { headers });
  }

  getPatientById(id: number): Observable<Patient> {
    const headers = this.getHeaders();
    return this.http.get<Patient>(`${this.apiUrl}/${id}`, { headers });
  }

  registerPatient(patient: Patient): Observable<Patient> {
    const headers = this.getHeaders();
    return this.http.post<Patient>(this.apiUrl, patient, { headers });
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    const headers = this.getHeaders();
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient, { headers });
  }

  deletePatient(id: number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers, responseType: 'text' as 'json' });
  }

  searchPatients(query: string): Observable<Patient[]> {
    const headers = this.getHeaders();
    return this.http.get<Patient[]>(`${this.apiUrl}/search?name=${query}`, { headers });
  }
}
