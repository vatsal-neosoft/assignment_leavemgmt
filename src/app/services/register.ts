import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(data: any, role: 'HOD' | 'STAFF') {
    const url = role === 'HOD'
      ? '/api/register/hod'
      : '/api/register/staff';

    return this.http.post(url, data);
  }
  
}
