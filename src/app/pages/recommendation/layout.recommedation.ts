import { Component } from '@angular/core';
import { OptionsPlan } from "./components/options-plan/options-plan";
import { TableResults } from "./components/table-results/table-results";
import { AppMessage } from "./components/message/message";
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-layout-recommedation',
  imports: [OptionsPlan, TableResults, AppMessage, CardModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br   to-gray-100 py-8 px-4">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-8">
        <p-card styleClass="border-l-4 border-emerald-500">
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl">
              <i class="pi pi-lightbulb text-white text-3xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">Recomendación Inteligente</h1>
              <p class="text-gray-600">Diseñada especialmente para tu progreso académico</p>
            </div>
          </div>
        </p-card>
      </div>

      <!-- Options -->
      <section class="max-w-7xl mx-auto mb-8">
        <app-options-plan></app-options-plan>
      </section>

      <!-- Grid Principal -->
      <section class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Tabla de Resultados -->
          <div class="lg:col-span-2">
            <app-table-results></app-table-results>
          </div>
          
          <!-- Mensajes/Rationale -->
          <div class="lg:col-span-1">
            <app-message></app-message>
          </div>
        </div>
      </section>
    </div>
  `
})
export class LayoutRecommedation {}