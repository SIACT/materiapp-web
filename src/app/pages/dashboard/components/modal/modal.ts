import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { SelectModule } from "primeng/select";
import { KeycloakService } from 'keycloak-angular';
import { firstValueFrom } from 'rxjs';
import { StudentsService } from '../../../../core/services/student.service';
import { ProgramsService } from '../../../../core/services/programs.service';
import { SchoolsService } from '../../../../core/services/schools.service';
import { CurriculaService } from '../../../../core/services/curricula.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, SelectModule, FormsModule, CommonModule],
  template: `
     <p-dialog 
      [(visible)]="visible" 
      header="Completa tu perfil"
      [modal]="true" 
      [closable]="false"
      [style]="{ width: '90vw', maxWidth: '500px' }"
      styleClass="modal-profile"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="school-select" class="text-sm font-semibold text-gray-700">Facultad</label>
          <p-select
            id="school-select"
            [(ngModel)]="form.schoolId"
            [options]="schools"
            optionLabel="name"
            optionValue="id"
            placeholder="Selecciona una facultad"
            [showClear]="true"
            class="w-full"
            (onChange)="onSchoolChange($event.value)"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="program-select" class="text-sm font-semibold text-gray-700">Programa</label>
          <p-select
            id="program-select"
            [(ngModel)]="form.programId"
            [options]="programs"
            optionLabel="name"
            optionValue="id"
            placeholder="Selecciona un programa"
            [showClear]="true"
            [disabled]="!form.schoolId || loadingPrograms"
            class="w-full"
          />
          <small *ngIf="!form.schoolId" class="text-xs text-gray-500">Primero selecciona una facultad</small>
          <small *ngIf="loadingPrograms" class="text-xs text-gray-500">Cargando programas...</small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="semester-select" class="text-sm font-semibold text-gray-700">Semestre</label>
          <p-select
            id="semester-select"
            [(ngModel)]="form.semester"
            [options]="semesterOptions"
            placeholder="Selecciona un semestre"
            [showClear]="true"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="curriculum-select" class="text-sm font-semibold text-gray-700">Pensum</label>
          <p-select
            id="curriculum-select"
            [(ngModel)]="form.curriculumId"
            [options]="curricula"
            optionLabel="version"
            optionValue="id"
            placeholder="Selecciona un pensum"
            [showClear]="true"
            class="w-full"
          />
        </div>

        <div class="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-200">
          <p-button 
            label="Cancelar" 
            severity="secondary" 
            [outlined]="true"
            (onClick)="visible = false"
          />
          <p-button 
            label="Guardar" 
            (onClick)="submit()" 
            [disabled]="!form.programId || !form.semester || !form.schoolId || !form.curriculumId"
          />
        </div>
      </div>
    </p-dialog>
  `,
 
})
export class Modal implements OnInit {
  visible = false;

  form = {
    programId: null as number | null,
    semester: null as number | null,
    schoolId: null as number | null,
    curriculumId: null as number | null,
  };

  programs: { id: number; name: string }[] = [];
  semesterOptions: { label: string; value: number }[] = Array.from({ length: 12 }, (_, i) => ({
    label: `Semestre ${i + 1}`,
    value: i + 1
  }));
  schools: { id: number; name: string }[] = [];
  curricula: { id: number; version: string }[] = [];
  loadingPrograms = false;

  constructor(
    private students: StudentsService,
    private programsService: ProgramsService,
    private schoolsService: SchoolsService,
    private curriculaService: CurriculaService,
    private keycloak: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Verificar que el usuario esté autenticado antes de hacer peticiones
    const isLoggedIn = this.keycloak.isLoggedIn();
    
    if (!isLoggedIn) {
      console.warn('User not authenticated, modal will not be shown');
      // No mostrar el modal si el usuario no está autenticado
      this.visible = false;
      return;
    }

    // Mostrar el modal solo si el usuario está autenticado
    this.visible = true;

    // Cargar solo schools y curricula al inicio
    // Los programas se cargarán cuando se seleccione una school
    this.schoolsService.getAll().subscribe({
      next: (list) => {
        this.schools = (list || []).map((s: any) => ({ id: s.id, name: s.name || s.title || `School ${s.id}` }));
      },
      error: (err) => {
        console.error('Failed to load schools', err);
        if (err.status === 401) {
          console.warn('Unauthorized - user may need to login again');
        }
      }
    });
    
    this.curriculaService.getAll().subscribe({
      next: (list) => {
        this.curricula = (list || []).map((c: any) => ({ id: c.id, version: c.version || `Pensum ${c.id}` }));
      },
      error: (err) => {
        console.error('Failed to load curricula', err);
        if (err.status === 401) {
          console.warn('Unauthorized - user may need to login again');
        }
      }
    });
  }

  async onSchoolChange(schoolId: number | null): Promise<void> {
    // Limpiar la selección de programa cuando cambia la escuela
    this.form.programId = null;
    this.programs = [];

    if (!schoolId) {
      return;
    }

    // Verificar autenticación antes de hacer la petición
    const isLoggedIn = this.keycloak.isLoggedIn();
    if (!isLoggedIn) {
      console.warn('User not authenticated');
      alert('Debes estar autenticado para cargar los programas. Por favor, inicia sesión.');
      return;
    }

    // Verificar que tengamos un token válido antes de hacer la petición
    try {
      const token = await this.keycloak.getToken();
      if (!token || token.trim() === '') {
        console.warn('No token available');
        alert('Error de autenticación. Por favor, recarga la página.');
        return;
      }
      console.log('Token available, length:', token.length);
    } catch (error) {
      console.error('Error getting token:', error);
      alert('Error de autenticación. Por favor, recarga la página.');
      return;
    }

    // Cargar programas de la escuela seleccionada usando getBySchoolId
    this.loadingPrograms = true;
    this.programsService.getBySchoolId(schoolId).subscribe({
      next: (list) => {
        this.programs = (list || []).map((p: any) => ({ 
          id: p.id, 
          name: p.name || p.title || `Program ${p.id}` 
        }));
        this.loadingPrograms = false;
      },
      error: (err) => {
        console.error('Failed to load programs for school', schoolId, err);
        this.loadingPrograms = false;
        
        if (err.status === 401) {
          console.warn('Unauthorized - token may be expired or invalid');
          console.log('Error details:', err);
          // No redirigir automáticamente, solo mostrar mensaje
          alert('Error de autenticación. Por favor, recarga la página e intenta de nuevo.');
        } else {
          alert(`Error al cargar los programas: ${err.message || 'Error desconocido'}`);
        }
      }
    });
  }

  async submit() {
    const keycloakId = this.keycloak.getKeycloakInstance().subject;

 
    if (!this.form.programId || !this.form.semester || !this.form.schoolId || !this.form.curriculumId) {
      alert('Por favor selecciona programa, semestre, pensum y facultad.');
      return;
    }

    try {
      await firstValueFrom(this.students.create({
        keycloakId,
        programId: this.form.programId,
        semester: this.form.semester,
        schoolId: this.form.schoolId,
        curriculumId: this.form.curriculumId,
      }));

      this.visible = false;
      this.router.navigate(['/app']);
    } catch (err) {
      console.error('Failed to create student record', err);
      alert('Hubo un problema guardando tu información. Intenta de nuevo.');
    }
  }

}
