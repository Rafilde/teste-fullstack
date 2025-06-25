import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { Plan } from '../../shared/models/plan.model';
import { PlanService } from '../../core/services/plan.service';

@Component({
  selector: 'app-planos',
  imports: [CommonModule, FormsModule, DataViewModule, HeaderComponent],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent implements OnInit {
  isDialogOpen = false;
  editingPlano: Plan | null = null;
  planos: Plan[] = [];

  formData: { name: string; value: number | null } = {
    name: '',
    value: null
  };

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.planService.getPlans().subscribe({
      next: (data) => this.planos = data,
      error: (err) => console.error('Erro ao carregar planos', err)
    });
  }

  openDialog(plano?: Plan) {
    this.isDialogOpen = true;
    if (plano) {
      this.editingPlano = plano;
      this.formData = { ...plano }; 
    } else {
      this.editingPlano = null;
      this.formData = { name: '', value: null };
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  handleSubmit() {
    if (!this.formData.name || this.formData.value === null) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const planData: Plan = {
      name: this.formData.name,
      value: this.formData.value
    };

    if (this.editingPlano) {
      this.planService.updatePlan(this.editingPlano.id!, planData).subscribe({
        next: () => {
          this.loadPlans(); 
          this.closeDialog();
        },
        error: (err) => console.error('Erro ao atualizar plano', err)
      });
    } else {
      this.planService.createPlan(planData).subscribe({
        next: () => {
          this.loadPlans(); 
          this.closeDialog();
        },
        error: (err) => console.error('Erro ao criar plano', err)
      });
    }
  }

  editPlano(plano: Plan) {
    this.openDialog(plano);
  }

  deletePlano(id: number | undefined) {
    if (id === undefined) return;
    if (confirm('Tem certeza que deseja excluir este plano?')) {
      this.planService.deletePlan(id).subscribe({
        next: () => {
          this.loadPlans();
        },
        error: (err) => console.error('Erro ao excluir plano', err)
      });
    }
  }
}