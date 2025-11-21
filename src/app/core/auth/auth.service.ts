import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private keycloak: KeycloakService) {}

  async getToken(): Promise<string> {
    return await this.keycloak.getToken();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.keycloak.isLoggedIn();
  }

  async logout(redirectUri: string): Promise<void> {
    await this.keycloak.logout(redirectUri);  
  }

  getUsername(): string | null {
    const profile = this.keycloak.getKeycloakInstance().profile;
    return profile ? profile.username || null : null;
  }

  getEmail(): string | null {
    const profile = this.keycloak.getKeycloakInstance().profile;
    return profile ? profile.email || null : null;
  }

}
