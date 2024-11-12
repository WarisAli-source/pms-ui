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
  newRecord: MedicalRecord = {id: 0, diagnosis: '', treatment: '', notes: '',patientId:0};

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
    if (this.newRecord.patientId) {
      this.medicalRecordsService.addMedicalRecord(this.newRecord.patientId,this.newRecord).subscribe(() => {
        this.toastr.success('Medical Record added successfully');
        form.resetForm(); 
        $('.btn-close').click(); 
        this.fetchPatientsWithRecords();
        this.newRecord = { id: 0, diagnosis: '', treatment: '', notes: '' ,patientId:0};
      }, error => {
        console.error('Error adding medical record:', error);
        this.toastr.error('Error adding medical record');
      });
    } else {
      this.toastr.error('Please select a patient');
    }
  }
  editRecord(id: number,patientId:number) {
    this.medicalRecordsService.getMedicalRecordById(id).subscribe(
      (record) => {
        this.newRecord = record;
        this.newRecord.patientId = patientId;
        $('#patientId').prop("disabled",true)
      },
      () => {
        this.toastr.error('Something went wrong !!!');
      }
    );
  }
  updateRecord(id:number,patientForm :MedicalRecord){
    this.medicalRecordsService.updateMedicalRecord(id,patientForm).subscribe(
      (MedicalRecord) =>{
        this.toastr.success('Patient Updated successfully');
        $('.btn-close').click(); 
        this.fetchPatientsWithRecords();
      },() => {
        this.toastr.error('Something went wrong !!!');
      }
    )
  }

deleteRecord(recordId: number) {
    this.medicalRecordsService.deleteMedicalRecord(recordId)
      .subscribe(() => {
        this.toastr.success('Medical Record Deleted successfully');
        this.fetchPatientsWithRecords();
      }, error => {
        this.toastr.error('Error deleting medical record');
        console.error('Error adding medical record:', error);
      });
}

}
