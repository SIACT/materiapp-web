import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, CommonModule],
  template: `
   <!-- Mobile toggle button -->
   <button class="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded shadow-lg" (click)="showMobileMenu = true" aria-label="Open menu">
     <i class="pi pi-bars text-lg"></i>
   </button>

   <!-- Mobile menu using p-menu -->
   <div class="fixed inset-0 left-0 top-0 w-64 h-screen transform transition-transform duration-300 z-40 md:hidden"
        [class.-translate-x-full]="!showMobileMenu"
        (click)="$event.target === $event.currentTarget && (showMobileMenu = false)">
     <div class="absolute inset-0 bg-black bg-opacity-50 -z-10 md:hidden" (click)="showMobileMenu = false"></div>
     <p-menu [model]="items" styleClass="w-full !border-0 h-full flex flex-col bg-surface">
       <ng-template #start>
         <span class="inline-flex items-center gap-1 px-2 py-3">
           <span class="text-xl font-semibold">MATER<span class="text-secondary">IA</span>PP</span>
         </span>
       </ng-template>
       <ng-template #submenuheader let-item>
         <br>
         <span class="!text-primary font-bold">{{ item.label }}</span>
       </ng-template>
       <ng-template #item let-item>
         <a pRipple class="flex items-center p-menu-item-link">
           <span [class]="item.icon"></span>
           <span class="ml-2">{{ item.label }}</span>
           <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
           <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
         </a>
       </ng-template>
       <ng-template #end>
         <br>
         <button pRipple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
           <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" shape="circle" />
           <span class="inline-flex flex-col">
             <span class="font-bold">Amy Elsner</span>
             <span class="text-sm">Admin</span>
           </span>
         </button>
       </ng-template>
     </p-menu>
   </div>

   <!-- Desktop menu (hidden on mobile) -->
   <div class="hidden md:block h-full">
     <p-menu [model]="items" styleClass="w-full md:w-60 !border-0 h-full flex flex-col ">
        <ng-template #start>
            <span class="inline-flex items-center gap-1 px-2 py-3">      
                <span class="text-xl font-semibold">MATER<span class="text-secondary">IA</span>PP</span>
            </span>
        </ng-template>
      
        <ng-template #submenuheader let-item>
          <br>
            <span class="!text-primary font-bold">{{ item.label }}</span>
        </ng-template>
        <ng-template #item let-item>
            <a pRipple class="flex items-center p-menu-item-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            </a>
        </ng-template>
      
        <ng-template #end>
            <button pRipple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" shape="circle" />
                <span class="inline-flex flex-col">
                    <span class="font-bold">Amy Elsner</span>
                    <span class="text-sm">Admin</span>
                </span>
            </button>
        </ng-template>
        
        
    </p-menu>
   </div>
  `,
  
})
export class AppSidebar {
  items: MenuItem[] | undefined;
  showMobileMenu = false;

  ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Carreras',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-home',
                        shortcut: '⌘+S'
                    },
                    {
                        label: 'Mi Pensum',
                        icon: 'pi pi-graduation-cap',
                        shortcut: '⌘+N'
                    },
                    {
                        label: 'Recomendacion',
                        icon: 'pi pi-microchip-ai',
                        shortcut: '⌘+S'
                    },
                    {
                        label: 'Carga Academica',
                        icon: 'pi pi-file-arrow-up',
                        shortcut: '⌘+C'
                    },
                    
                     {
                        label: '',
                        icon: '',
                        shortcut: ''
                    },
                    {
                        label: '',
                        icon: '',
                        shortcut: ''
                    },
                    {
                        label: '',
                        icon: '',
                        shortcut: ''
                    },
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Messages',
                        icon: 'pi pi-inbox',
                        badge: '2'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        shortcut: '⌘+Q'
                    }
                ]
            },
            {
                separator: true
            }
        ];
    }

}
