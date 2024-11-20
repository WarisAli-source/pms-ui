import { Component, DebugElement, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import $ from 'jquery';
import { Patient, PatientService } from '../../services/patient.service';
import { ToastService } from '../../services/toast.service';
import * as XLSX from 'xlsx';
import { PaginatedResponse } from '../../model/medical-record';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [DatePipe,CommonModule,FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  paginatedPatients: Patient[] = [];
  searchQuery: string = '';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;

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

  constructor(private fb: FormBuilder, private patientService: PatientService,private toastService :ToastService) {}
  ngOnInit(): void {
    this.getAllPatientsPagination();
  }

  getAllPatientsPagination(): void {
    this.patientService.getAllPatientsPagination(
      this.currentPage - 1,
      this.itemsPerPage,
      this.currentSortField || 'id',
      this.sortDirection
    ).subscribe(
      (data: PaginatedResponse<Patient>) => {
        this.patients = data.content;
        this.totalPages = data.totalPages;
      },
      (error) => {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    );
  }
  
  updatePaginatedPatients() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedPatients = this.patients.slice(start, end);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {debugger
      this.currentPage++;
      console.log('Requesting page: ', this.currentPage);
      this.getAllPatientsPagination();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllPatientsPagination();
    }
  }
  onSubmit(patientForm: any) {
      const newPatient: Patient = this.newPatient;
      this.patientService.registerPatient(newPatient).subscribe(
        (response) => {
          this.toastService.showToast('Patient added successfully', 'success', 3000);
          $('.btn-close').click(); 
          this.getAllPatientsPagination();
        },
        (error) => {
          this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
        }
      );
  }

  editPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe(
      (patient) => {
        this.newPatient = patient;
      },
      (error) => {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    );
  }
  updatePatient(patientForm :any){
    this.patientService.updatePatient(this.newPatient.id,this.newPatient).subscribe(
      (resp) =>{
        this.toastService.showToast('Patient Updated successfully', 'success', 3000);
        $('.btn-close').click(); 
        this.getAllPatientsPagination();
      },(error) => {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    )
  }

  deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe(
      (response) => {
        if (response === 'Success') {
          this.toastService.showToast('Patient Deleted successfully', 'success', 3000);
          this.getAllPatientsPagination();
        } else {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
        }
      },
      (error) => {
        this.toastService.showToast('Error deleting patient', 'danger', 3000);
      }
    );
  }
  currentSortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  sortData(field: keyof Patient): void {
    this.currentSortField = field;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getAllPatientsPagination();
  }

  searchPatients(): void {
    if (this.searchQuery) {
      this.patientService.searchPatients(this.searchQuery).subscribe((patients) => {
        this.patients = patients;
      });
    } else {
      this.getAllPatientsPagination();
    }
  }
  exportToExcel(): void {
    // Create a new worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.patients);

    // Create a new workbook and append the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patients');

    // Write the file and trigger download
    XLSX.writeFile(wb, 'patients.xlsx');
  }
}
