import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

interface PlanOption {
  title: string;
  description: string;
  icon: string;
  severity: 'info' | 'warning' | 'help';
}

@Component({
  selector: 'app-options-plan',
  imports: [CommonModule, CardModule, ButtonModule, BadgeModule],
  template: `
    <div class="w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Opciones de Plan</h2>

      <div class="grid gap-6 md:grid-cols-3   ">
        <p-card
          *ngFor="let option of options"
          styleClass="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-300"
          (click)="selectOption(option)">
          
          <ng-template pTemplate="header">
            <div class="p-6 bg-gradient-to-r container-header-table" 
                 [ngClass]="{
                   'from-blue-500 to-blue-600': option.severity === 'info',
                   'from-amber-500 to-amber-600': option.severity === 'warning',
                   'from-purple-500 to-purple-600': option.severity === 'help'
                 }">
              <div class="flex items-center justify-between mb-4">
                <div class="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <i class="{{ option.icon }} text-white text-3xl"></i>
                </div>
                <p-badge value="Recomendado" severity="contrast"></p-badge>
              </div>
              <h3 class="text-xl font-bold text-white">{{ option.title }}</h3>
            </div>
          </ng-template>

          <p class="text-gray-600 mb-4">{{ option.description }}</p>

          <ng-template pTemplate="footer">
            <p-button 
              label="Seleccionar" 
              
              styleClass="w-full"
              [outlined]="true"
              icon="pi pi-check">
            </p-button>
          </ng-template>
        </p-card>
      </div>
    </div>
  `
})
export class OptionsPlan {
  options: PlanOption[] = [
    {
      title: 'Matrícula Recomendada',
      description: 'Plan personalizado basado en tu historial y progreso académico',
      icon: 'pi pi-star',
      severity: 'info'
    },
    {
      title: 'Calcular Horario',
      description: 'Optimiza tu horario según disponibilidad y preferencias',
      icon: 'pi pi-calendar',
      severity: 'warning'
    },
    {
      title: 'Matrícula Académica',
      description: 'Configura manualmente tu carga académica del semestre',
      icon: 'pi pi-verified',
      severity: 'help'
    }
  ];

  selectOption(option: PlanOption) {
    console.log('Opción seleccionada:', option.title);
  }
}
