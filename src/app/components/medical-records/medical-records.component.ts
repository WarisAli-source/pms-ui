import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecord } from '../../model/medical-record';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../services/patient.service';
import { PatientWithRecordsDTO, MedicalRecordsService } from '../../services/medical-records.service';
import { ToastService } from '../../services/toast.service';

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

  constructor(private medicalRecordsService: MedicalRecordsService,private toastService: ToastService) {}

  ngOnInit(): void {
    this.fetchPatientsWithRecords();
    this.fetchPatients();
  }

  fetchPatientsWithRecords() {
    this.medicalRecordsService.getAllPatientsWithMedicalRecords().subscribe(data => {
      this.patientsWithRecords = data;
    });
  }

  fetchPatients() {
    this.medicalRecordsService.getAllPatients().subscribe(data => {
      this.patients = data;
    }, error => {
      console.error('Error show medical record:', error);
      this.toastService.showToast('Error showin medical record', 'danger', 3000);
    });
  }

  onSubmit(form: any) {
    if (this.newRecord.patientId) {
      this.medicalRecordsService.addMedicalRecord(this.newRecord.patientId,this.newRecord).subscribe(() => {
        this.toastService.showToast('Medical Record added successfully', 'success', 3000);

        form.resetForm(); 
        $('.btn-close').click(); 
        this.fetchPatientsWithRecords();
        this.newRecord = { id: 0, diagnosis: '', treatment: '', notes: '' ,patientId:0};
      }, error => {
        console.error('Error adding medical record:', error);
        this.toastService.showToast('Error adding medical record', 'danger', 3000);

      });
    } else {
      this.toastService.showToast('Please select a patient', 'danger', 3000);
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
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    );
  }
  updateRecord(id:number,patientForm :MedicalRecord){
    this.medicalRecordsService.updateMedicalRecord(id,patientForm).subscribe(
      (MedicalRecord) =>{
        this.toastService.showToast('Patient Updated successfully', 'success', 3000);
        $('.btn-close').click(); 
        this.fetchPatientsWithRecords();
      },() => {
        this.toastService.showToast('Something went wrong !!!', 'danger', 3000);
      }
    )
  }

deleteRecord(recordId: number) {
    this.medicalRecordsService.deleteMedicalRecord(recordId)
      .subscribe(() => {
        this.toastService.showToast('Medical Record Deleted successfully','success',3000);
        this.fetchPatientsWithRecords();
      }, error => {
        this.toastService.showToast('Error deleting medical record','danger',2000);
        console.error('Error adding medical record:', error);
      });
}

}
