import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = signal(false);
  currentUser = signal<any>(null);

  registry(user: any): boolean {
    const userStr = localStorage.getItem(user.email);
    if (userStr) {
      Swal.fire({
        text: `El correo ${user.email} ya está registrado`,
        icon: 'error'
      });
      return false;
    }
    localStorage.setItem(user.email, JSON.stringify(user));
    this.isLogged.update(() => true);
    this.currentUser.set(user);
    return true;
  }

  login(email: string, password: string): boolean {
    const userStr = localStorage.getItem(email);
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.password === password) {
        this.isLogged.update(() => true);
        this.currentUser.set(user);
        return true;
      }
    }
    Swal.fire({ icon: 'error', text: 'Credenciales incorrectas' });
    return false;
  }

  logout() {
    this.isLogged.update(() => false)
    this.currentUser.set(null);;
  }
  
  getCurrentUser() {
    return this.currentUser();
  }
}
