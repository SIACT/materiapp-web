import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <section class="w-full h-full flex items-center justify-center">
      <div class="text-center">
        <p class="mb-4">Redirigiendo al inicio de sesión...</p>
        <button pButton type="button" label="Iniciar sesión" (click)="login()" class="p-button-primary"></button>
      </div>
    </section>
  `
})
export class LoginRedirect implements OnInit {
  constructor(private keycloak: KeycloakService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.login();
  }

  async login() {
    try {
      // Allow optional redirect after login (passed as query param `redirect`)
      const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/app';
      const redirectUri = window.location.origin + redirect;
      await this.keycloak.login({ redirectUri });
    } catch (err) {
      // fallback: do nothing (user can click button)
      console.error('Login redirect failed', err);
    }
  }
}
