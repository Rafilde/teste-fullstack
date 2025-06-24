import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-planos',
  imports: [CommonModule, FormsModule, DataViewModule, HeaderComponent],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent {
 isDialogOpen = false;
  editingPlano: any = null;

  planos: any[] = [
  { id: 1, nome: 'Multiplan', valor: 120.00 },
  { id: 2, nome: 'Salute Max', valor: 180.50 },
  { id: 3, nome: 'Salute Uni', valor: 250.00 }
];


  formData = {
    nome: '',
    valor: null
  };

openDialog(plano?: any) {
  this.isDialogOpen = true;

  if (plano) {
    this.editingPlano = plano;
    this.formData = {
      nome: plano.nome,
      valor: plano.valor
    };
  } else {

    this.editingPlano = null;
    this.formData = {
      nome: '',
      valor: null
    };
  }
}

closeDialog() {
  this.isDialogOpen = false;
  this.editingPlano = null;
  this.formData = {
    nome: '',
    valor: null
  };
}

handleSubmit() {
  if (this.editingPlano) {
    const index = this.planos.findIndex(p => p.id === this.editingPlano.id);
    if (index > -1) {
      this.planos[index] = {
        ...this.editingPlano,
        nome: this.formData.nome,
        valor: this.formData.valor
      };
    }
  } else {
    const newId = this.planos.length ? Math.max(...this.planos.map(p => p.id)) + 1 : 1;
    this.planos.push({
      id: newId,
      nome: this.formData.nome,
      valor: this.formData.valor
    });
  }

  this.closeDialog();
}

editPlano(plano: any) {
  this.openDialog(plano);
}

deletePlano(id: number) {
  this.planos = this.planos.filter(p => p.id !== id);
}

}
