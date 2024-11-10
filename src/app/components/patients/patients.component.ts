import { Component, OnInit } from '@angular/core';
import { Patient, PatientService } from '../../services/patient.service';
import { CommonModule, DatePipe} from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private fb: FormBuilder, private patientService: PatientService,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
  
    this.patientService.getAllPatients().subscribe(
      (data) => {
        this.patients = data;
        this.toastr.success('Patients Data Fetched Successfully');
      },
      (error) => {
        this.toastr.error('Something went wrong !!!');
      }
    );
  }
  onSubmit(patientForm: any) {
      const newPatient: Patient = this.newPatient;
      this.patientService.registerPatient(newPatient).subscribe(
        (response) => {
          this.toastr.success('Patient added successfully');
          $('.btn-close').click(); 
          this.getAllPatients();
        },
        (error) => {
          this.toastr.error('Something went wrong !!!');
        }
      );
  }

  editPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe(
      (patient) => {
        this.newPatient = patient;
      },
      (error) => {
        this.toastr.error('Something went wrong !!!');
      }
    );
  }
  updatePatient(patientForm :any){
    this.patientService.updatePatient(this.newPatient.id,this.newPatient).subscribe(
      (resp) =>{
        this.toastr.success('Patient Updated successfully');
        $('.btn-close').click(); 
        this.getAllPatients();
      },(error) => {
        this.toastr.error('Something went wrong !!!');
      }
    )
  }

  deletePatient(id: number): void {
    debugger
    this.patientService.deletePatient(id).subscribe(
      (response) => {
        debugger;
        if (response === 'Success') {
          this.toastr.success('Patient Deleted successfully');
          this.getAllPatients();
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
