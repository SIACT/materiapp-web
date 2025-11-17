
import { Component, OnInit, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { FieldsetModule } from 'primeng/fieldset';
import { InplaceModule } from 'primeng/inplace';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [InplaceModule, FieldsetModule, AvatarModule, ButtonModule, ButtonGroupModule, SplitButtonModule, TableModule, SkeletonModule, ToastModule, ProgressBarModule],
  providers: [MessageService],
  template: `
    <div class="flex flex-col md:flex-row gap-8 items-center justify-center">

    <p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
      <ng-template let-message #headless let-closeFn="closeFn">
        <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
          <div class="flex items-center gap-5">
            <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
            <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <p-progressbar [value]="progress" [showValue]="false" [style]="{ height: '4px' }" class="!bg-primary/80" />
            <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% generated</label>
          </div>
          <div class="flex gap-4 mb-4 justify-end">
          
            <p-button label="Cancel" (click)="closeFn($event)" size="small" />
          </div>
        </section>
      </ng-template>
    </p-toast>

         <p-inplace #inplace (onActivate)="loadData()">
         <ng-template #display>
          <div (click)="$event.stopPropagation()">
           <p-fieldset >
          <ng-template #header>
            <div class="flex items-center gap-2 px-2  ">
              <p-avatar
                image="https://avatars.githubusercontent.com/u/219891296?s=400&u=8d1613353899b189957add673260d6db5b98ac60&v=4"
                shape="circle" />
                <span class="font-bold">MATER<span class="text-tertiary">IA</span>PP</span>
            </div>
          </ng-template>
          
            <div class="flex flex-col items-center gap-8">
              <p class="m-0 w-full">
              No plan yet. Finish marking your completed courses and click "Generate AI Plan" to get personalized suggestions.
              </p>
              <p-button (onClick)="startGeneratePlan()">Generar Plan</p-button>          
            </div>
            
        </p-fieldset>
      </div>

    </ng-template>

    <ng-template #content>

      <div class="md:w-auto ">
 
        <p-fieldset >
          <ng-template #header>
            <div class="flex items-center gap-2 px-2">
              <p-avatar
                image="https://avatars.githubusercontent.com/u/219891296?s=400&u=8d1613353899b189957add673260d6db5b98ac60&v=4"
                shape="circle" />
                <span class="font-bold">MATER<span class="text-tertiary">IA</span>PP</span>
            </div>
          </ng-template>
            <p class="m-0 w-full">
              Hola, te recomomendamos las siguientes materias para este semestre basándonos en tu progreso actual y en las materias que has seleccionado previamente. Estas materias te ayudarán a avanzar en tu plan de estudios de manera efectiva.
            </p>
        </p-fieldset>


      <div class="card pt-8">
      <p-table [value]="products" stripedRows [tableStyle]="{'min-width': '60rem'}"  class="container-secondary w-max">
        <ng-template #header>
          
            <tr>
                <th>Code</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Creditos</th>
            </tr>
        </ng-template>
        <ng-template #body let-product>
            <tr>
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
            </tr>
        </ng-template>
      </p-table>
        </div>      
        </div>
        </ng-template>
    </p-inplace>
</div>
    `,

})
export class AppMessage implements OnInit {
  products: any[] = [];
  progress = 0;
  private timerId: any;
  @ViewChild('inplace') inplace: any;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.products = this.getSampleProducts();
  }

  loadData(): void {
    // Populate or refresh table data when the inplace component is activated
    this.products = this.getSampleProducts();
  }

  startGeneratePlan(): void {
    // reset
    this.progress = 0;
    // show toast with key 'confirm'
    this.messageService.clear('confirm');
    this.messageService.add({ key: 'confirm', severity: 'info', summary: 'Generando Plan', detail: 'Procesando...', sticky: true });

    this.timerId = setInterval(() => {
      // increment progress randomly to simulate work
      this.progress += Math.floor(Math.random() * 15) + 5;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.timerId);
        // hide toast after short delay and activate the inplace content
        setTimeout(() => {
          this.messageService.clear('confirm');
          // programmatically activate the inplace component
          try {
            this.inplace?.activate();
          } catch (e) {
            // fallback: ensure data is loaded
            this.loadData();
          }
        }, 400);
      }
    }, 400);
  }

  onClose(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.progress = 0;
  }

  private getSampleProducts(): any[] {
    return [
      { code: 'MAT101', name: 'Cálculo Diferencial', category: 'Pensum', quantity: 45 },
      { code: 'FIS201', name: 'Física General I', category: 'Electiva', quantity: 38 },
      { code: 'PRG301', name: 'Programación Orientada a Objetos', category: 'Humanistica', quantity: 52 },
      { code: 'QUI102', name: 'Química Inorgánica', category: 'Pensum', quantity: 41 },
      { code: 'ING401', name: 'Inglés Técnico', category: 'Idiomas', quantity: 36 }
    ];
  }
}