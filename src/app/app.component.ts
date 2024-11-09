import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientsComponent } from './components/patients/patients.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,PatientsComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pms-ui';
  isSidebarVisible = true;

  constructor(private router: Router) {}

  // Handle sidebar visibility change event
  onSidebarVisibilityChanged(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }
}
