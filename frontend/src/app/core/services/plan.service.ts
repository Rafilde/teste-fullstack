import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../../shared/models/plan.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private readonly API = `${environment.apiUrl}/plans`;

  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.API);
  }

  createPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.API, plan);
  }

  updatePlan(id: number, plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.API}/${id}`, plan);
  }

  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}