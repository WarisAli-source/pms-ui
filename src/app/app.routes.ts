import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { NgModule } from '@angular/core';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';

export const routes: Routes = [
    { 
        path: 'patients', 
        component: PatientsComponent 
    },
    { 
        path: 'medical-records', 
        component: MedicalRecordsComponent 
    },
    { 
        path: '', 
        redirectTo: '', 
        pathMatch: 'full' 
    }, 
    { 
        path: '**', 
        redirectTo: '/patients' 
    }  
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }