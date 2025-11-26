import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { SelectModule } from "primeng/select";
import { KeycloakService } from 'keycloak-angular';
import { firstValueFrom } from 'rxjs';
import { ProgramsService } from '../../../../core/services/programs.service';
import { SchoolsService } from '../../../../core/services/schools.service';
import { CurriculaService } from '../../../../core/services/curricula.service';
import { ProfileSelectionService } from '../../../../core/services/profile-selection.service';
import { StudentCurriculaService } from '../../../../core/services/student-curricula.service';

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
            (ngModelChange)="onProgramChange($event)"
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
            (ngModelChange)="onSemesterChange($event)"
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
            (ngModelChange)="onCurriculumChange($event)"
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
  hasExistingCurricula = false;

  visible = false;
  private dataLoaded = false;
  private loadingInitialData = false;

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
    private programsService: ProgramsService,
    private schoolsService: SchoolsService,
    private curriculaService: CurriculaService,
    private keycloak: KeycloakService,
    private profileSelection: ProfileSelectionService,
    private studentCurricula: StudentCurriculaService
  ) {}

  async ngOnInit(): Promise<void> {
    const cachedSelection = this.profileSelection.getSnapshot();
    this.form = {
      ...this.form,
      ...cachedSelection
    };
  }
 
  async open(): Promise<void> {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para continuar.');
    return;
  }
  
  // 1. Buscar pensum existentes del usuario
    const existing = await firstValueFrom(this.studentCurricula.findMe());

  // 2. Si existen, activar modo selección y NO modo creación
    if (existing && existing.length > 0) {
    this.curricula = existing.map(c => ({
      id: c.id,
      version: c.curriculum?.version || `Pensum ${c.id}`
    }));

    // habilitar solo selección
    this.form = {
      ...this.form,
      curriculumId: null
    };

    // mostrar modal simplificado (solo selección)
    this.visible = true;
    return;
  }

  // 3. Si NO existen, ejecutar flujo normal
  await this.loadInitialData();
  if (this.form.schoolId) {
    await this.loadProgramsBySchool(this.form.schoolId);
  }

  this.visible = true;
}


  async onSchoolChange(schoolId: number | null): Promise<void> {
    this.form.programId = null;
    this.programs = [];
    this.profileSelection.patchState({
      schoolId,
      programId: null
    });

    if (!schoolId) {
      return;
    }
 
    await this.loadProgramsBySchool(schoolId);
  }

  onProgramChange(programId: number | null) {
    this.profileSelection.patchState({ programId });
  }

  onSemesterChange(semester: number | null) {
    this.profileSelection.patchState({ semester });
  }

  onCurriculumChange(curriculumId: number | null) {
    this.profileSelection.patchState({ curriculumId });
  }

  async submit() {
    if (!this.form.programId || !this.form.semester || !this.form.schoolId || !this.form.curriculumId) {
      alert('Por favor selecciona programa, semestre, pensum y facultad.');
      return;
    }

    try {
      const created = await firstValueFrom(
        this.studentCurricula.createByMe({
          semester: this.form.semester,
          curriculumId: this.form.curriculumId
        })
      );

      // store the newly created studentCurriculum id so other parts of the app
      // (e.g., Semester component) can request the user's student-courses
      this.profileSelection.setState({ ...this.form, studentCurriculumId: created?.id ?? null });
      this.visible = false;
    } catch (err) {
      console.error('Failed to create student record', err);
      alert('Hubo un problema guardando tu información. Intenta de nuevo.');
    }
  }

  private async loadInitialData(): Promise<void> {
    if (this.dataLoaded || this.loadingInitialData) {
      return;
    }

    this.loadingInitialData = true;
    try {
      const [schoolsResponse, curriculaResponse] = await Promise.all([
        firstValueFrom(this.schoolsService.getAll()),
        firstValueFrom(this.curriculaService.getAll())
      ]);

      this.schools = (schoolsResponse || []).map((s: any) => ({
        id: s.id,
        name: s.name || s.title || `School ${s.id}`
      }));

      this.curricula = (curriculaResponse || []).map((c: any) => ({
        id: c.id,
        version: c.version || `Pensum ${c.id}`
      }));

      this.dataLoaded = true;
    } catch (error) {
      console.error('Failed to load initial modal data', error);
      alert('No pudimos cargar la información inicial. Intenta de nuevo.');
    } finally {
      this.loadingInitialData = false;
    }
  }

  private async loadProgramsBySchool(schoolId: number): Promise<void> {
    if (!schoolId) {
      return;
    }

    this.loadingPrograms = true;
    try {
      const list = await firstValueFrom(this.programsService.getBySchoolId(schoolId));
      this.programs = (list || []).map((p: any) => ({
        id: p.id,
        name: p.name || p.title || `Program ${p.id}`
      }));
    } catch (err: any) {
      console.error('Failed to load programs for school', schoolId, err);
      if (err?.status === 401) {
        alert('Error de autenticación. Por favor, recarga la página e intenta de nuevo.');
      } else {
        alert(`Error al cargar los programas: ${err?.message || 'Error desconocido'}`);
      }
    } finally {
      this.loadingPrograms = false;
    }
  }
}
