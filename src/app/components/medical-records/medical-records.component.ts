import { Component } from '@angular/core';
import { PatientWithRecordsDTO, MedicalRecordsService } from '../../services/medical-records.service';
import { CommonModule } from '@angular/common';
import { MedicalRecord } from '../../model/medical-record';
import { Patient } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './medical-records.component.html',
  styleUrl: './medical-records.component.css'
})

export class MedicalRecordsComponent {
  
  patientsWithRecords: PatientWithRecordsDTO[] = [];
  patients: Patient[] = [];
  medicalRecords: MedicalRecord[] = [];
  newRecord: MedicalRecord = {patientId: 0, diagnosis: '', treatment: '', notes: '' };

  constructor(private medicalRecordsService: MedicalRecordsService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchPatientsWithRecords();
    this.fetchPatients();
  }

  fetchPatientsWithRecords() {
    this.medicalRecordsService.getAllPatientsWithMedicalRecords().subscribe(data => {
      this.patientsWithRecords = data;
      this.toastr.success('Patient Medical Records Fetched Successfully');
    });
  }

  fetchPatients() {
    this.medicalRecordsService.getAllPatients().subscribe(data => {
      this.patients = data;
    });
  }

  onSubmit(form: any) {
    debugger;
    if (this.newRecord.patientId) {
      this.medicalRecordsService.addMedicalRecord(this.newRecord.patientId,this.newRecord).subscribe(() => {
        this.toastr.success('Medical Record added successfully');
        form.resetForm(); 
        $('.btn-close').click(); 
        this.fetchPatientsWithRecords();
        this.newRecord = { patientId: 0, diagnosis: '', treatment: '', notes: '' };
      }, error => {
        console.error('Error adding medical record:', error);
        this.toastr.error('Error adding medical record');
      });
    } else {
      this.toastr.error('Please select a patient');
    }
  }
}
