import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { Articule } from "./components/articule/articule";

@Component({
  selector: 'app-app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, RouterLink, Articule],
  template: `
  <!-- Hero institucional -->
<section
  class="w-full min-h-screen flex flex-col items-center justify-center
         relative overflow-hidden px-6 py-24
         bg-gradient-to-br from-green-700 via-green-600 to-green-500
         text-white"
>

  <!-- SVG superior (curva institucional) -->
<svg class="absolute top-0 left-0 w-[750px] opacity-20" viewBox="0 0 800 600" fill="none">
  <polygon points="0,0 400,0 250,200 0,120" fill="white" />
  <polygon points="200,150 450,0 550,120 300,250" fill="white" opacity="0.5"/>
</svg>
  <!-- SVG inferior (ondas geométricas) -->
 <svg class="absolute bottom-0 right-0 w-full opacity-10" viewBox="0 0 1440 320">
  <path fill="white" d="M0,256L48,256C96,256,192,256,288,240C384,224,480,192,576,176C672,160,768,160,864,170.7C960,181,1056,203,1152,224C1248,245,1344,267,1392,277.3L1440,288V320H0Z"/>
</svg>
  <!-- Patrón institucional radial -->
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]"></div>

  <h1 class="relative text-5xl sm:text-6xl font-extrabold mb-6 text-center drop-shadow-xl">
    Bienvenido a 
    <span class="text-white font-black underline underline-offset-4 decoration-white/60">
      SIACT
    </span>
  </h1>

  <p class="relative text-lg sm:text-xl text-center max-w-2xl mb-16 opacity-90 leading-relaxed">
    Sistema Académico Inteligente para Consultas y Trámites.
  </p>

  <!-- Contenedor de cards -->
  <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 w-full max-w-6xl px-4">
    
    <p-card header="Estudiantes" styleClass="home-card">
      <p class="mb-4 text-sm opacity-80 leading-relaxed">
        Consulta tu información académica, asignaturas, historial
        y procesos en la plataforma.
      </p>
      <a routerLink="/login" pButton label="Ingresar" icon="pi pi-user"
         class="p-button-rounded p-button-success w-full"></a>
    </p-card>

    <p-card header="Docentes" styleClass="home-card">
      <p class="mb-4 text-sm opacity-80 leading-relaxed">
        Gestiona calificaciones, asignaturas y reportes administrativos.
      </p>
      <button pButton label="Entrar" icon="pi pi-briefcase"
              class="p-button-rounded p-button-info w-full"></button>
    </p-card>

    <p-card header="Administración" styleClass="home-card">
      <p class="mb-4 text-sm opacity-80 leading-relaxed">
        Control del sistema, gestión de usuarios, auditoría y reportes.
      </p>
      <button pButton label="Panel" icon="pi pi-cog"
              class="p-button-rounded p-button-warning w-full"></button>
    </p-card>

  </div>
</section>

    <app-articule class="mt-32"></app-articule>
  `,

  
  styles: [`
    :host ::ng-deep .home-card {
      @apply shadow-xl rounded-2xl border border-gray-200
             p-6 bg-white/90 backdrop-blur-lg
             transition-all duration-300 
             hover:shadow-2xl hover:-translate-y-1;
    }

    :host ::ng-deep .p-card-header {
      @apply text-xl font-bold mb-4 text-gray-800;
    }

    :host ::ng-deep .p-card-body {
      @apply flex flex-col gap-4;
    }
  `]
})
export class AppHome {}
