import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentCurriculum } from '../../../../core/dto/interfaces.types';
import { StudentCurriculaService } from '../../../../core/services/student-curricula.service';
import { CommonModule } from '@angular/common';
import { Modal } from "./modal";
import { SelectCurriculumModal } from "./modal3";
import { ProfileSelectionService } from '../../../../core/services/profile-selection.service';

@Component({
  selector: 'app-modal2',
  standalone: true,
  imports: [
    CommonModule,
    Modal,
    SelectCurriculumModal
  ],
  template: `
    <div class="grid grid-cols-2 gap-6 mx-3">
      
      <!-- Card 1: Seleccionar Currículum Existente -->
      <div 
        class="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-200"
        (click)="toggleSelectModal()"
        [class.ring-4]="showSelectModal"
        [class.ring-emerald-300]="showSelectModal">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Mis Currículums</h2>
          <div class="bg-emerald-100 text-emerald-700 p-3 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
        </div>

        <p class="text-gray-600 mb-4">
          Selecciona uno de tus currículums existentes para gestionar tus materias
        </p>

        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">
            {{ existingCurricula.length }} currículum(s) disponible(s)
          </span>
          <div class="flex items-center gap-2 text-emerald-600 font-semibold">
            <span>{{ showSelectModal ? 'Cerrar' : 'Abrir' }}</span>
            <svg 
              class="w-5 h-5 transition-transform duration-300"
              [class.rotate-180]="showSelectModal"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        <!-- Modal de selección dentro de la card -->
        <div 
          *ngIf="showSelectModal" 
          class="mt-6 pt-6 border-t-2 border-gray-200 animate-slideDown"
          (click)="$event.stopPropagation()">
          <app-select-curriculum-modal
            [curricula]="existingCurricula"
            (curriculumSelected)="onCurriculumSelected($event)">
          </app-select-curriculum-modal>
        </div>
      </div>

      <!-- Card 2: Agregar Nuevo Currículum -->
      <div 
        class="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
        (click)="toggleCreateModal()"
        [class.ring-4]="showCreateModal"
        [class.ring-blue-300]="showCreateModal">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Nuevo Currículum</h2>
          <div class="bg-blue-100 text-blue-700 p-3 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
        </div>

        <p class="text-gray-600 mb-4">
          Crea un nuevo currículum asociado a un programa académico
        </p>

        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">
            Agrega un currículum existente
          </span>
          <div class="flex items-center gap-2 text-blue-600 font-semibold">
            <span>{{ showCreateModal ? 'Cerrar' : 'Crear' }}</span>
            <svg 
              class="w-5 h-5 transition-transform duration-300"
              [class.rotate-180]="showCreateModal"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        <!-- Modal de creación dentro de la card -->
        <div 
          *ngIf="showCreateModal" 
          class="mt-6 pt-6 border-t-2 border-gray-200 animate-slideDown"
          (click)="$event.stopPropagation()">
          
          <!-- Componente Modal (oculto, se controla por ViewChild) -->
          <app-modal #createModal (curriculumCreated)="onCurriculumCreated()"></app-modal>
        </div>
      </div>

    </div>
  `,
  styles: [`
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slideDown {
      animation: slideDown 0.3s ease-out;
    }
  `]
})
export class Modal2 implements OnInit {
  @ViewChild('createModal') createModal!: Modal;
  
  existingCurricula: StudentCurriculum[] = [];
  showCreateModal = false;
  showSelectModal = false;

  constructor(
    private curriculaService: StudentCurriculaService,
    private profile: ProfileSelectionService
  ) {}

  ngOnInit(): void {
    this.loadCurricula();
  }

  loadCurricula(): void {
    this.curriculaService.findMe().subscribe((resp) => {
      this.existingCurricula = resp;
      console.log('Currículums cargados:', resp.length);
    });
  }

  toggleSelectModal(): void {
    console.log('Toggle Select Modal - Antes:', this.showSelectModal);
    this.showSelectModal = !this.showSelectModal;
    if (this.showSelectModal) {
      this.showCreateModal = false;
    }
    console.log('Toggle Select Modal - Después:', this.showSelectModal);
  }

  toggleCreateModal(): void {
    console.log('Toggle Create Modal - Antes:', this.showCreateModal);
    this.showCreateModal = !this.showCreateModal;
    if (this.showCreateModal) {
      this.showSelectModal = false;
      
      // Esperar un tick para que el ViewChild esté disponible
      setTimeout(() => {
        if (this.createModal) {
          console.log('Abriendo modal de creación...');
          this.createModal.open();
        } else {
          console.error('createModal no está disponible');
        }
      }, 0);
    }
    console.log('Toggle Create Modal - Después:', this.showCreateModal);
  }

  onCurriculumSelected(item: StudentCurriculum): void {
    console.log('Currículum seleccionado:', item);
    this.profile.patchState({
      studentCurriculumId: item.id
    });
    this.showSelectModal = false;
  }

  onCurriculumCreated(): void {
    console.log('Currículum creado exitosamente');
    this.showCreateModal = false;
    // Recargar la lista de currículums
    this.loadCurricula();
  }
}