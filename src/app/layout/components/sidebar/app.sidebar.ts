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
  imports: [MenuModule, BadgeModule,RippleModule,AvatarModule, CommonModule],
  template: `
   <p-menu [model]="items" class="flex justify-center w-full h-full" styleClass="w-full md:w-60 !border-0 h-full flex flex-col">
        <ng-template #start>
            <span class="inline-flex items-center gap-1 px-2 py-3">
                
                <span class="text-xl font-semibold">MATER<span class="text-secondary">IA</span>PP</span>
            </span>
        </ng-template>
        <ng-template #submenuheader let-item>
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
  `,
  
})
export class AppSidebar {
  items: MenuItem[] | undefined;

  ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Carreras',
                items: [
                    {
                        label: 'Mi Carrera',
                        icon: 'pi pi-graduation-cap',
                        shortcut: '⌘+N'
                    },
                    {
                        label: 'Recomendacion',
                        icon: 'pi pi-microchip-ai',
                        shortcut: '⌘+S'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search',
                        shortcut: '⌘+S'
                    }
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
