import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../shared/models/plan.model';
import { PlanService } from '../../core/services/plan.service';
import { Beneficiary } from '../../shared/models/beneficiary.model';
import { BeneficiaryService } from '../../core/services/beneficiary.service';

@Component({
  selector: 'app-beneficiario',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css',
})
export class BeneficiarioComponent implements OnInit {
  isDialogOpen = false;
  editingBeneficiario: Beneficiary | null = null;
  planos: Plan[] = [];
  beneficiarios: Beneficiary[] = [];

  formData: {
    name: string;
    cpf: string;
    email: string;
    age: number | null;
    planId: number | null; 
  } = {
    name: '',
    cpf: '',
    email: '',
    age: null,
    planId: null,
  };

  constructor(
    private planService: PlanService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit(): void {
    this.loadPlanos();
    this.loadBeneficiarios();
  }

  loadPlanos(): void {
    this.planService.getPlans().subscribe(data => this.planos = data);
  }

  loadBeneficiarios(): void {
    this.beneficiaryService.getBeneficiaries().subscribe(data => this.beneficiarios = data);
  }

  openDialog(beneficiary: Beneficiary | null = null) {
    this.isDialogOpen = true;
    if (beneficiary) {
      this.editingBeneficiario = beneficiary;
      this.formData = {
        name: beneficiary.name,
        cpf: beneficiary.cpf,
        email: beneficiary.email,
        age: beneficiary.age,
        planId: (beneficiary.plan && beneficiary.plan.id) || null
      };
    } else {
      this.editingBeneficiario = null;
      this.formData = { name: '', cpf: '', email: '', age: null, planId: null };
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  handleSubmit() {
    if (!this.formData.name || !this.formData.cpf || !this.formData.email || !this.formData.age) {
      alert('Preencha os campos obrigatórios.');
      return;
    }
    
    const dataToSend = {
      name: this.formData.name,
      cpf: this.formData.cpf,
      email: this.formData.email,
      age: this.formData.age,
      plan: this.formData.planId ? { id: this.formData.planId } : null
    };

    if (this.editingBeneficiario && this.editingBeneficiario.id) {
      this.beneficiaryService.updateBeneficiary(this.editingBeneficiario.id, dataToSend)
        .subscribe(() => {
          this.loadBeneficiarios();
          this.closeDialog();
        });
    } else {
      this.beneficiaryService.createBeneficiary(dataToSend)
        .subscribe(() => {
          this.loadBeneficiarios();
          this.closeDialog();
        });
    }
  }

  deleteBeneficiario(id: number | undefined) {
    if (id === undefined) return;
    if (confirm('Tem certeza que deseja excluir?')) {
      this.beneficiaryService.deleteBeneficiary(id).subscribe(() => {
        this.loadBeneficiarios();
      });
    }
  }

  getPlanoNome(plan: Plan | null): string {
    return plan ? plan.name : 'Nenhum';
  }
}
