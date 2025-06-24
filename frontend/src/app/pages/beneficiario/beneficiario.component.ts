import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficiario',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css'
})
export class BeneficiarioComponent {
   isDialogOpen = false;
  editingBeneficiario: any = null;

  planos = [
    { id: 1, nome: 'Multiplan', valor: 120.0 },
    { id: 2, nome: 'Salute Max', valor: 180.5 },
    { id: 3, nome: 'Salute Uni', valor: 250.0 }
  ];

  beneficiarios: any[] = [];

  formData = {
    nome: '',
    cpf: '',
    email: '',
    idade: null,
    planoId: null
  };

  openDialog(b: any = null) {
    this.isDialogOpen = true;

    if (b) {
      this.editingBeneficiario = b;
      this.formData = { ...b };
    } else {
      this.editingBeneficiario = null;
      this.formData = {
        nome: '',
        cpf: '',
        email: '',
        idade: null,
        planoId: null
      };
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.editingBeneficiario = null;
    this.formData = {
      nome: '',
      cpf: '',
      email: '',
      idade: null,
      planoId: null
    };
  }

  handleSubmit() {
    if (this.editingBeneficiario) {
      const index = this.beneficiarios.findIndex(b => b.id === this.editingBeneficiario.id);
      if (index > -1) {
        this.beneficiarios[index] = { ...this.formData, id: this.editingBeneficiario.id };
      }
    } else {
      const newId = this.beneficiarios.length ? Math.max(...this.beneficiarios.map(b => b.id)) + 1 : 1;
      this.beneficiarios.push({ ...this.formData, id: newId });
    }

    this.closeDialog();
  }

  editBeneficiario(b: any) {
    this.openDialog(b);
  }

  deleteBeneficiario(id: number) {
    this.beneficiarios = this.beneficiarios.filter(b => b.id !== id);
  }

  getPlanoNome(planoId: number | null): string | null {
    const plano = this.planos.find(p => p.id === planoId);
    return plano ? plano.nome : null;
  }
}
