import { Plan } from "./plan.model";

export interface Beneficiary {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  age: number;
  plan: Plan | null;
}