import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from "primeng/card";

interface PlanOption {
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-options-plan',
  imports: [Card,FormsModule,CommonModule],
  template: `
  <section class="w-full flex flex-col items-start text-black  mt-6">
  <h1 class="text-2xl font-bold mb-4">
    Options Plan / Opciones de Plan
  </h1>

  <div class="grid gap-6 md:grid-cols-3 w-full py-4">
    <p-card
      *ngFor="let option of options"
      class="rounded-2xl shadow-xl  bg-[#0f172a] text-white hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center text-white"
          [ngClass]="option.color"
        >
          <i class="{{ option.icon }} text-xl"></i>
        </div>
        <h2 class="text-lg font-semibold">{{ option.title }}</h2>
      </div>
<!-- 
      <p class="text-sm opacity-80">{{ option.description }}</p> -->
    </p-card>
  </div>
</section>



    `,
 
})
export class OptionsPlan {
  options: PlanOption[] = [
    {
      title: 'Matricula recomendada',
      description: 'Ideal for small tasks. / Ideal para tareas pequeñas.',
      icon: 'pi pi-star',
      color: 'bg-blue-500'
    },
    {
      title: 'Calcula / horario',
      description: 'Advanced tools included. / Incluye herramientas avanzadas.',
      icon: 'pi pi-crown',
      color: 'bg-yellow-500'
    },
    {
      title: 'Matricula / Academica',
      description: 'Full features for teams. / Funciones completas para equipos.',
      icon: 'pi pi-verified',
      color: 'bg-purple-600'
    }
  ];
}
