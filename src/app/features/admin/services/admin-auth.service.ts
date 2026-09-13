import { Injectable, signal } from '@angular/core';
import { AdminCredentials, AdminSession } from '../domain/models';

const ADMIN_SESSION_KEY = 'toefl_admin_session';

// Hardcoded credentials – replace with backend call when available
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin1234';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly _session = signal<AdminSession | null>(this.loadSession());

  readonly session = this._session.asReadonly();

  login(credentials: AdminCredentials): boolean {
    if (
      credentials.username === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
    ) {
      const session: AdminSession = {
        username: credentials.username,
        loggedInAt: new Date().toISOString(),
      };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      this._session.set(session);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    this._session.set(null);
  }

  isAuthenticated(): boolean {
    return this._session() !== null;
  }

  private loadSession(): AdminSession | null {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminSession;
    } catch {
      return null;
    }
  }
}
