export interface Beneficiary {
  id: number;
  name: string;
  cpf: string;
  email: string;
  age: number;
  planId: number | null; 
}