import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
//import { RecommendationService } from '../../services/recommendation.service';
 
interface Recomendacion {
  icon: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CardModule, CommonModule],
  template: `
    <div class="flex flex-col gap-4 container-recomendation">
      <h1>descomentar card</h1>
      <!-- <p-card
        *ngFor="let item of recomendaciones"
        class="border rounded-xl shadow-sm hover:shadow-lg transition-all"
      >
        <ng-template pTemplate="header">
          <div class="flex items-center gap-3 p-3 pb-0">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="{{ item.icon }} text-gray-700 text-xl"></i>
            </div>
            <h2 class="text-black text-lg font-semibold leading-tight">
              {{ item.title }}
            </h2>
          </div>
        </ng-template>

        <p class="text-gray-600 text-sm mt-2 leading-snug px-3 pb-3">
          {{ item.subtitle }}
        </p>
      </p-card> -->
    </div>
  `,
})
export class AppMessage   {

  // recomendaciones: Recomendacion[] = [];

  // constructor(private recomendationsService: RecommendationService) {}

  // ngOnInit() {
  //   this.loadRationale(1); // ejemplo: curriculum 14
  // }

  // loadRationale(curriculumId: number) {
  //   this.recomendationsService.getRecomendations(curriculumId).subscribe({
  //     next: (response) => {
  //       this.recomendaciones = [
  //         {
  //           icon: 'pi pi-info-circle',
  //           title: 'Recomendación basada en tu historial académico',
  //           subtitle: response.rationale,
  //         }
  //       ];
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }
}
