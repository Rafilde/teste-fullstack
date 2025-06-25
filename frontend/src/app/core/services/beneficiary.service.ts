import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary } from '../../shared/models/beneficiary.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
    private readonly API = `${environment.apiUrl}/beneficiaries`;

  constructor(private http: HttpClient) { }

  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(this.API);
  }

  createBeneficiary(beneficiaryData: any): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.API, beneficiaryData);
  }

  updateBeneficiary(id: number, beneficiaryData: any): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.API}/${id}`, beneficiaryData);
  }

  deleteBeneficiary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}