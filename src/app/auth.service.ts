import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  login(token: string) {
    localStorage.setItem('accessToken', token);
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}
