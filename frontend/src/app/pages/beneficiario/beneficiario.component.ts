import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../shared/models/plan.model';
import { PlanService } from '../../core/services/plan.service';

@Component({
  selector: 'app-beneficiario',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css',
})
export class BeneficiarioComponent implements OnInit {
  isDialogOpen = false;
  editingBeneficiario: any = null;

  planos: Plan[] = [];

  beneficiarios: any[] = [];

  formData = {
    name: '',
    cpf: '',
    email: '',
    age: null,
    planoId: null,
  };

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.loadPlanos();
  }

  loadPlanos(): void {
    this.planService.getPlans().subscribe({
      next: (planosData) => {
        this.planos = planosData;
        console.log('Planos carregados com sucesso:', this.planos);
      },
      error: (erro) => {
        console.error('Falha ao carregar os planos', erro);
      },
    });
  }

  openDialog(b: any = null) {
    this.isDialogOpen = true;

    if (b) {
      this.editingBeneficiario = b;
      this.formData = { ...b };
    } else {
      this.editingBeneficiario = null;
      this.formData = {
        name: '',
        cpf: '',
        email: '',
        age: null,
        planoId: null,
      };
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.editingBeneficiario = null;
    this.formData = {
      name: '',
      cpf: '',
      email: '',
      age: null,
      planoId: null,
    };
  }

  handleSubmit() {
    if (this.editingBeneficiario) {
      const index = this.beneficiarios.findIndex(
        (b) => b.id === this.editingBeneficiario.id
      );
      if (index > -1) {
        this.beneficiarios[index] = {
          ...this.formData,
          id: this.editingBeneficiario.id,
        };
      }
    } else {
      const newId = this.beneficiarios.length
        ? Math.max(...this.beneficiarios.map((b) => b.id)) + 1
        : 1;
      this.beneficiarios.push({ ...this.formData, id: newId });
    }

    this.closeDialog();
  }

  editBeneficiario(b: any) {
    this.openDialog(b);
  }

  deleteBeneficiario(id: number) {
    this.beneficiarios = this.beneficiarios.filter((b) => b.id !== id);
  }

  getPlanoNome(planoId: number | null): string | null {
    const plano = this.planos.find((p) => p.id === planoId);
    return plano ? plano.name : null;
  }
}
