export * from './admin-panel-card';

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminSession {
  username: string;
  loggedInAt: string;
}
