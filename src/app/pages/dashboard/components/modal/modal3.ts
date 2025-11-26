import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCurriculum } from '../../../../core/dto/interfaces.types';

@Component({
  selector: 'app-select-curriculum-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/40 flex justify-center items-center">

      <!-- Modal Container -->
      <div class="bg-white text-black w-96 rounded-xl shadow-xl p-6">

        <h2 class="text-xl font-bold mb-3 text-center">
          Selecciona un Pensum / Select a Curriculum
        </h2>

        <!-- Scroll Area -->
        <div class="max-h-64 overflow-y-auto pr-2 space-y-2">
          <div
            *ngFor="let item of curricula"
            (click)="select(item)"
            class="cursor-pointer border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition"
          >
            <p class="font-semibold">
              Pensum: {{ item.curriculum.version }}
            </p>

            <p class="text-sm text-gray-700">
              Programa: {{ item.curriculum.programId }}
            </p>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class SelectCurriculumModal {

  @Input() curricula: StudentCurriculum[] = [];

  @Output() curriculumSelected = new EventEmitter<StudentCurriculum>();

  select(item: StudentCurriculum) {
    this.curriculumSelected.emit(item);
  }
}
