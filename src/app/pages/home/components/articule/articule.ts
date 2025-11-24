import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-articule',
  standalone: true,
  imports: [AvatarModule, CardModule],
  template: `
    <section class="relative w-full flex flex-col items-center text-black px-6 overflow-hidden">

      <svg class="absolute top-0 left-0 w-[750px] opacity-25" viewBox="0 0 800 600" fill="none">
        <polygon points="0,0 400,0 250,200 0,120" fill="#22c55e" />
        <polygon points="200,150 450,0 550,120 300,250" fill="#22c55e" opacity="0.5"/>

        <g opacity="0.10" stroke="#22c55e" stroke-width="3">
          <path d="M80 50 h80 v100 h-80 z" fill="none"/>
          <path d="M260 40 h70 v90 h-70 z" fill="none"/>
          <path d="M330 50 h20 v80 h-20" fill="none"/>
        </g>
      </svg>

      <div class="flex flex-col items-center mb-10 z-[5]">
      
        <span class="animate-bounce mt-2 h-10 w-10 bg-green-100 text-primary-contrast rounded-full flex items-center justify-center ">
          <i class="pi pi-arrow-down text-green-900"></i>
        </span>
      </div>

      <h2 class="text-3xl font-bold mb-10 text-center z-[5]">
        Student Academic Tracking
        
      </h2>

      <div class="grid md:grid-cols-3 gap-8 mb-32 z-[5]">
        <p-card styleClass="shadow-lg hover:shadow-2xl transition-all rounded-2xl text-center bg-white/90 backdrop-blur">
          <div class="rounded-full bg-primary text-primary-contrast w-14 h-14 mx-auto flex items-center justify-center mb-3">
            <i class="pi pi-chart-line text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Academic Progress</h3>
          <p class="opacity-80">
            View completed credits, approved subjects, and semester-based progress.
          </p>
        </p-card>

        <p-card styleClass="shadow-lg hover:shadow-2xl transition-all rounded-2xl text-center bg-white/90 backdrop-blur">
          <div class="rounded-full bg-primary text-primary-contrast w-14 h-14 mx-auto flex items-center justify-center mb-3">
            <i class="pi pi-robot text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">AI Recommendations</h3>
          <p class="opacity-80">
            Automated suggestions for next-semester enrollment based on performance and prerequisites.
          </p>
        </p-card>

        <p-card styleClass="shadow-lg hover:shadow-2xl transition-all rounded-2xl text-center bg-white/90 backdrop-blur">
          <div class="rounded-full bg-primary text-primary-contrast w-14 h-14 mx-auto flex items-center justify-center mb-3">
            <i class="pi pi-chart-bar text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Statistics</h3>
          <p class="opacity-80">
            Comparative charts and academic analytics by subject clusters.
          </p>
        </p-card>
      </div>

      <h2 class="text-3xl font-bold mb-10 text-center z-[5]">
        Development Team
         
      </h2>

      <div class="grid md:grid-cols-2 gap-8 mb-32 z-[5]">

        <p-card styleClass="shadow-lg text-center rounded-2xl bg-white/90 backdrop-blur">
          <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" size="xlarge"></p-avatar>
          <h3 class="text-xl font-medium mt-4">Yorth Ortegón Sánchez</h3>
          <p class="opacity-70">Software Developer</p>
        </p-card>

        <p-card styleClass="shadow-lg text-center rounded-2xl bg-white/90 backdrop-blur">
          <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" size="xlarge"></p-avatar>
          <h3 class="text-xl font-medium mt-4">Christian Salazar Botina</h3>
          <p class="opacity-70">Software Developer</p>
        </p-card>

      </div>

      <h2 class="text-3xl font-bold mb-10 text-center z-[5]">
        Technologies Used
      
      </h2>

      <div class="grid md:grid-cols-3 gap-8 mb-32 z-[5]">

        <p-card styleClass="shadow-lg hover:shadow-xl text-center rounded-2xl bg-white/90 backdrop-blur">
          <div class="rounded-full bg-green-600 text-white w-14 h-14 mx-auto flex items-center justify-center mb-3">
            <i class="pi pi-key text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Keycloak</h3>
          <p class="opacity-80">
            Centralized identity, roles, and secure authentication management.
          </p>
        </p-card>

        <p-card styleClass="shadow-lg hover:shadow-2xl text-center rounded-2xl bg-white/90 backdrop-blur">
          <div class="rounded-full bg-red-600 text-white w-14 h-14 mx-auto flex items-center justify-center mb-3">
            <i class="pi pi-server text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">NestJS</h3>
          <p class="opacity-80">
            Modular, scalable backend framework built on Node.js.
          </p>
        </p-card>

        <p-card styleClass="shadow-lg hover:shadow-xl text-center rounded-2xl bg-white/90 backdrop-blur">
          <div class="rounded-full bg-orange-500 text-white w-14 h-14 mx-auto flex items-center justify-center mb-3">
            <i class="pi pi-desktop text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Angular</h3>
          <p class="opacity-80">
            Robust frontend framework for scalable, modular interfaces.
          </p>
        </p-card>
      </div>

      <svg class="absolute bottom-0 right-0 w-full opacity-15" viewBox="0 0 1440 320" fill="none">

        <path fill="#22c55e" d="M0,256L48,256C96,256,192,256,288,240C384,224,
          480,192,576,176C672,160,768,160,864,170.7C960,181,1056,203,
          1152,224C1248,245,1344,267,1392,277.3L1440,288V320H0Z"
        />

        <g opacity="0.12" stroke="#22c55e" stroke-width="3">
          <path d="M200 180 h90 v110 h-90 z" />
          <path d="M640 150 h100 v130 h-100 z" />
          <path d="M1100 190 h80 v110 h-80 z" />
        </g>

      </svg>

    </section>
  `,
})
export class Articule {}
