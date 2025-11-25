import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenubarModule } from 'primeng/menubar';
import { SelectModule } from 'primeng/select';
 
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {   DashboardService } from '../../services/dashboard.service';

interface MenuEntry {
  label: string;
  icon: string;
  badge?: string;
  shortcut?: string;
  children?: MenuEntry[];
}

interface SelectOption {
  label: string;
  code: string;
}

@Component({
  selector: 'app-shearch',
  providers: [ConfirmationService, MessageService],
  standalone: true,
  imports: [ButtonModule,ConfirmDialogModule,ToastModule,IconFieldModule,InputIconModule,SelectModule,ToggleSwitchModule,MenubarModule,BadgeModule,AvatarModule,FormsModule,CommonModule],
  template: `
  <div class="card">
    <div class="flex gap-4 items-center container-shearch justify-between ">

    <div class="card flex flex-wrap justify-center gap-4  pl-14">
      <p-iconfield>
        <p-inputicon class="pi pi-search " />
        <input type="text" pInputText placeholder="Search" class="container-shearch px-12 text-black w-64"
        (input)="onSearch($event)"
        />
        
        </p-iconfield>
      </div>


      <div class="flex p-3 gap-4 items-center">
        <label for="select-calendar" class="text-xs font-semibold text-gray-700 mb-1">Calendario</label>
        <p-select
          id="select-calendar"
          [options]="selectOptions"
          [(ngModel)]="selectedOption"
          [checkmark]="true"
          optionLabel="label"
          [showClear]="true"
          size="small"
          placeholder="All"
          class="shearch-select"
          (onChange)="onCalendarChange($event.value)"
        />
      </div>
      <div class="flex items-center gap-2">
        <p-toggleswitch [(ngModel)]="checked"  (onChange)="onToggleRemaining($event.checked)"/>
        <label class="text-sm whitespace-nowrap text-black">Show only remaining</label>
      </div>
      <div class="card flex justify-center">
        <p-toast />
        <p-confirmdialog #cd>
            <ng-template #headless let-message let-onAccept="onAccept" let-onReject="onReject">
                <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                    <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                        <i class="pi pi-question !text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex items-center gap-2 mt-6">
                        <p-button label="Save" (onClick)="onAccept()" styleClass="w-32"></p-button>
                        <p-button label="Cancel" [outlined]="true" (onClick)="onReject()" styleClass="w-32"></p-button>
                    </div>
                </div>
            </ng-template>
        </p-confirmdialog>

        <!-- Botón cambia después de guardar -->
        <p-button
          *ngIf="!saved"
          (onClick)="confirm()"
          label="Save"
        ></p-button>

        <p-button
          *ngIf="saved"
          icon="pi pi-sparkles"
          label="Generar IA"
          severity="success"
          (onClick)="goToIA()"
        ></p-button>

      </div>
    
    </div>
  </div>
  `,
   
})
export class Shearch implements OnInit{
  checked: boolean = true;
  saved= false;
  items: MenuItem[] | undefined;
  selectOptions: SelectOption[] = [];
  selectedOption: SelectOption | null = null;
  private menuEntries: MenuEntry[] = [];

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService, 
    private router: Router, 
    private dashboardFilters: DashboardService
  ) {}

  ngOnInit() {
      this.menuEntries = [
        {
          label: 'Calendario',
          icon: 'pi pi-search',
          badge: '3',
          children: [
            { label: 'A', icon: 'pi pi-bolt'   },
            { label: 'B', icon: 'pi pi-server'  },
            { label: 'C', icon: 'pi pi-pencil'  },
          ],
        },
      ];

      this.items = this.menuEntries.map(entry => this.toMenuItem(entry));
      this.selectOptions = this.menuEntries.flatMap(entry => {
        if (entry.children?.length) {
          return entry.children;
        }
        return [entry];
      }).map(option => ({
        label: option.label,
        code: option.shortcut ?? option.label.toLowerCase().replace(/\s+/g, '-')
      }));
  }

  private toMenuItem(entry: MenuEntry): MenuItem {
    return {
      label: entry.label,
      icon: entry.icon,
      badge: entry.badge,
      shortcut: entry.shortcut,
      items: entry.children?.map(child => this.toMenuItem(child))
    };
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Estas seguro?',
      message: 'Por favor, confirma para guardar.',
      accept: () => {
        this.saved = true;
        this.messageService.add({ severity: 'info', summary: 'Guardado', detail: 'Proceso exitoso' });

        setTimeout(() => {
          this.router.navigate(['/dashboard/ia']);
        }, 800);
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Proceso denegado' });
      }
    });
  }
  goToIA() {
    this.router.navigate(['/recommendation/ia']);
  }
  onSearch(event: any) {
    const value = event.target.value;
    this.dashboardFilters.updateFilters({ search: value });
  }
  
  onCalendarChange(value: string) {
    this.dashboardFilters.updateFilters({ calendar: value });
  }
  
  onToggleRemaining(value: boolean) {
    this.dashboardFilters.updateFilters({ onlyRemaining: value });
  }
}
