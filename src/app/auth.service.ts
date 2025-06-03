import { Injectable, signal, WritableSignal } from '@angular/core';
import { API_LOGIN_URL } from './shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  async login({ name, password }: { name: string; password: string }) {
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      localStorage.setItem('accessToken', response.headers.get('token') ?? '');
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}
