
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';

interface Subject {
  name: string;
  code: string;
  credits: number;
}

@Component({
  selector: 'app-semester',
  standalone: true,
  imports: [PanelModule, DialogModule, ListboxModule, FormsModule, CommonModule],
  template: `
  <div class="w-full flex flex-col ">
    <div class="flex items-center justify-between w-full mb-2">
      <h1 class="m-0">Materias</h1>
      <button class="px-3 py-1 bg-red-600 text-white rounded text-sm" (click)="clearAllSelections()">Limpiar</button>
    </div>
    @for (tab of tabs; track tab.title) {
      <div class="mb-2">
        <button class="w-full flex items-center px-4 py-2 bg-base-100 rounded shadow" (click)="dialogVisible[tab.value] = true">
          <span>{{ tab.title }}</span>
          <span class="ml-auto text-sm text-secondary m-2">
            {{ getSelectedCount(tab.value) }}/{{ subjects.length }} materias seleccionadas
          </span>
        </button>
          <p-dialog [(visible)]="dialogVisible[tab.value]" [modal]="true" [closable]="true" [dismissableMask]="true" [style]="{ width: '95vw', maxWidth: '720px' }" [baseZIndex]="10000">

          
          <ng-template pTemplate="header">
            <div class="flex items-center w-full">
              <span>{{ tab.title }}</span>
              <span class="ml-auto text-sm text-secondary m-2">
                {{ getSelectedCount(tab.value) }}/{{ subjects.length }} materias seleccionadas
              </span>
            </div>
          </ng-template>
          <div class="card flex justify-center w-full">
            <p-listbox 
              [(ngModel)]="selectedSubjects[tab.value]" 
              (ngModelChange)="onSelectionChange(tab.value, $event)"
              [options]="subjects" 
              [multiple]="true" 
              [checkbox]="true" 
              optionLabel="name" 
               class="w-full md:w-80 max-h-[60vh] overflow-auto" />
          </div>
        </p-dialog>
      </div>
    }
  </div>
  `,
})
export class Semester implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  tabs = [
        { title: 'Semestre 1', value: '1' },
        { title: 'Semestre 2', value: '2' },
        { title: 'Semestre 3', value: '3' },
        { title: 'Semestre 4', value: '4' },
        { title: 'Semestre 5', value: '5' },
        { title: 'Semestre 6', value: '6' },
        { title: 'Semestre 7', value: '7' },
        { title: 'Semestre 8', value: '8' },
        { title: 'Semestre 9', value: '9' },
        { title: 'Semestre 10', value: '10' }
    ];

  subjects!: Subject[];
  selectedSubjects: { [key: string]: Subject[] } = {};
  collapsedPanels: { [key: string]: boolean } = {};
  dialogVisible: { [key: string]: boolean } = {};

  ngOnInit() {
      // obtener lista de materias del servicio (no duplicar datos aquí)
      this.subjects = this.dashboardService.subjects;

      // Inicializar collapsedPanels y dialogVisible para cada panel
      this.tabs.forEach(tab => {
        this.collapsedPanels[tab.value] = true;
        this.dialogVisible[tab.value] = false;
      });

      // Suscribirse a las selecciones del servicio y sincronizar el estado local
      this.dashboardService.selections$.subscribe((selections) => {
        // Asegurar que el servicio tenga una entrada para cada tab (si no existe, inicializarla)
        this.tabs.forEach(tab => {
          if (!selections || !selections[tab.value]) {
            this.dashboardService.updateSelection(tab.value, []);
          }
        });

        // Reflejar el estado en el arreglo local de selectedSubjects (clonando arrays)
        const current: { [key: string]: Subject[] } = {};
        this.tabs.forEach(tab => {
          current[tab.value] = selections && selections[tab.value] ? [...selections[tab.value]] : [];
        });
        this.selectedSubjects = current;
      });
  }

      getSelectedCount(tabValue: string): number {
        return this.selectedSubjects[tabValue]?.length || 0;
      }

      onSelectionChange(tabValue: string, selected: Subject[]) {
        // actualizar localmente y notificar al servicio
        this.selectedSubjects[tabValue] = selected || [];
        this.dashboardService.updateSelection(tabValue, this.selectedSubjects[tabValue]);
      }

      clearAllSelections() {
        this.tabs.forEach(tab => {
          this.selectedSubjects[tab.value] = [];
          this.dashboardService.updateSelection(tab.value, []);
          if (this.dialogVisible && this.dialogVisible[tab.value] !== undefined) {
            this.dialogVisible[tab.value] = false;
          }
        });
      }
}
