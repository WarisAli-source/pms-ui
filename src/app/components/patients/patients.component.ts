import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import $ from 'jquery';
import { Patient, PatientService } from '../../services/patient.service';
import { ToastService } from '../../services/toast.service';
import * as XLSX from 'xlsx';


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
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (data) => {
        this.patients = data;
        this.totalPages = Math.ceil(this.patients.length / this.itemsPerPage);
        this.updatePaginatedPatients();
        this.toastService.showToast('Patients Data Fetched Successfully', 'success', 3000);
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
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPatients();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPatients();
    }
  }
  onSubmit(patientForm: any) {
      const newPatient: Patient = this.newPatient;
      this.patientService.registerPatient(newPatient).subscribe(
        (response) => {
          this.toastService.showToast('Patient added successfully', 'success', 3000);
          $('.btn-close').click(); 
          this.getAllPatients();
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
        this.getAllPatients();
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
          this.getAllPatients();
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
    this.patients.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.currentSortField = field;
  }

  searchPatients(): void {
    if (this.searchQuery) {
      this.patientService.searchPatients(this.searchQuery).subscribe((patients) => {
        this.patients = patients;
      });
    } else {
      this.getAllPatients();
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
