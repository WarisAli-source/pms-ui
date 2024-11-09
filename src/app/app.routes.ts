import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { 
        path: 'patients', 
        component: PatientsComponent 
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