import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { NgModule } from '@angular/core';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [

    { 
        path: 'signup', 
        component: SignupComponent 
    },
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {   path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'patients', 
        component: PatientsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'medical-records', 
        component: MedicalRecordsComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'app-dashboard', 
        component:DashboardComponent ,
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }