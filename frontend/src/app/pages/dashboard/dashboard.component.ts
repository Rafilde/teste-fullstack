import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PlanService } from '../../core/services/plan.service';
import { BeneficiaryService } from '../../core/services/beneficiary.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, DataViewModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalNumberOfPlans: number = 0;
  totalNumberOfBeneficiaries: number = 0;

  constructor(
    private planService: PlanService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit(): void {
    this.loadDatasDashboard();
    this.loadDatasBeneficiaries();
  }

  loadDatasBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe({
      next: (beneficiaries) => {
        this.totalNumberOfBeneficiaries = beneficiaries.length;
      },
      error: (err) => {
        console.error('Erro ao carregar os dados dos beneficiários:', err);
      },
    });
  }

  loadDatasDashboard(): void {
    this.planService.getPlans().subscribe({
      next: (planos) => {
        this.totalNumberOfPlans = planos.length;
      },
      error: (err) => {
        console.error('Erro ao carregar os dados dos planos:', err);
      },
    });
  }
}
