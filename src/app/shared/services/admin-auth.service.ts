import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Admin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminsUrl = 'assets/admins.json';

  constructor(private http: HttpClient) {}

  async validarCredenciales(email: string, password: string): Promise<boolean> {
    const admins = await firstValueFrom(this.http.get<Admin[]>(this.adminsUrl));
    return admins.some(admin => admin.email === email && admin.password === password);
  }
}
