import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ToastService } from '../../services/toast.service';
import { MedicalRecordsService } from '../../services/medical-records.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalPatientCount: number = 0;
  totalMedicalRecordsCount: number = 0;

  constructor(private patientService: PatientService,private medicalRecordService :MedicalRecordsService,private toastService :ToastService){

  }
  ngOnInit(): void {
    this.getAllPatientsCount();
    this.getAllMedicalRecordsCount();
  }
  getAllPatientsCount(): void {
    this.patientService.getAllPatientsCount().subscribe(
      (data) => {
        this.totalPatientCount=data;
        this.toastService.showToast('Dashboard Data Fetched Successfully', 'success', 3000);
      },
      (error) => {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    );
  }

  getAllMedicalRecordsCount(): void {
    this.medicalRecordService.getAllMedicalRecordsCount().subscribe(
      (data) => {
        this.totalMedicalRecordsCount=data;
        this.toastService.showToast('Dashboard Data Fetched Successfully', 'success', 3000);
      },
      (error) => {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    );
  }
}
