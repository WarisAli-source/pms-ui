import { Component, OnInit } from '@angular/core';
import { Patient, PatientService } from '../../services/patient.service';
import { CommonModule, DatePipe} from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [DatePipe,CommonModule,FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];

  newPatient: Patient = {
    id:0,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  }; 

  constructor(private fb: FormBuilder, private patientService: PatientService) {}
  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
    
    this.patientService.getAllPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patients', error);
      }
    );
  }
  onSubmit(patientForm: any) {debugger
      const newPatient: Patient = this.newPatient;
      this.patientService.registerPatient(newPatient).subscribe(
        (response) => {
          debugger
          console.log('Patient added successfully', response);
          $('.btn-close').click(); 
          this.getAllPatients();
        },
        (error) => {
          console.error('Error adding patient', error);
        }
      );
  }

  editPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe(
      (patient) => {
        console.log('Editing patient', patient);
      },
      (error) => {
        console.error('Error fetching patient data for editing', error);
      }
    );
  }

  deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe(
      (response) => {
        if (response === 'Success') {
          this.patients = this.patients.filter(patient => patient.id !== id);
        } else {
          console.error('Failed to delete patient');
        }
      },
      (error) => {
        console.error('Error deleting patient', error);
      }
    );
  }
}
