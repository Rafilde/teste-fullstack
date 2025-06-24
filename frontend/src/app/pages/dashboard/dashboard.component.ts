import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, DataViewModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
