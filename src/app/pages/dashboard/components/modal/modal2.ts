import { Component, OnInit } from '@angular/core';
import { StudentCurriculum } from '../../../../core/dto/interfaces.types';
import { StudentCurriculaService } from '../../../../core/services/student-curricula.service';
import { CommonModule } from '@angular/common';
import { Modal } from "./modal";
import {  SelectCurriculumModal } from "./modal3";
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
    <!-- Modal de selección -->
    <app-select-curriculum-modal
      *ngIf="showSelectModal"
      [curricula]="existingCurricula"
      (curriculumSelected)="onCurriculumSelected($event)"
    >
    </app-select-curriculum-modal>
    <!-- Modal de creación -->
    <app-modal
      *ngIf="showCreateModal">
    </app-modal>
  `
})
export class Modal2 implements OnInit {

 
  existingCurricula: StudentCurriculum[] = [];
  showCreateModal = false;
  showSelectModal = false;

  constructor(private curriculaService: StudentCurriculaService,
    private profile: ProfileSelectionService
  ) {}

  ngOnInit(): void {
    this.loadCurricula();
  }

  loadCurricula(): void {
    this.curriculaService.findMe().subscribe((resp) => {
      this.existingCurricula = resp;

      if (this.existingCurricula.length > 0) {
        this.showSelectModal = true;
      } else {
        this.showCreateModal = true;
      }
    });
  }
  onCurriculumSelected(item: StudentCurriculum) {
  this.profile.patchState({
    studentCurriculumId: item.id
  });

  this.showSelectModal = false;
}


}
