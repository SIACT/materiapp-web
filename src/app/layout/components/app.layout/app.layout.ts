import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { AppHeader } from "../app.header/app.header";
import { AppSidebar } from "../sidebar/app.sidebar";
import { LayoutService } from '../../services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, PanelMenuModule, AppHeader, AppSidebar],
  template: `
   <div class="layout-shell flex  container-primary min-h-screen relative mt-4 ">
      <!-- Desktop Sidebar -->
      <nav 
        *ngIf="isDesktop && sidebarVisible" 
        class="layout-sidebar w-[clamp(15rem,18vw,19rem)] fixed  left-0 top-0 min-h-screen max-h-screen   border-primary-dark/10 container-sidebar text-inverse z-[1100]">
        <div class="container flex justify-center w-full ">
          <app-sidebar></app-sidebar>
        </div>
      </nav>

      <!-- Collapsed icon bar when sidebar is hidden (desktop) -->
      <div *ngIf="isDesktop && !sidebarVisible" class="fixed left-0 top-0 h-screen z-[1150] flex flex-col items-center justify-center gap-2 w-12 container-sidebar text-inverse ">
        <div class="w-full flex flex-col  text-green-600 pr-10">
          
          <a routerLink="/app/pensum/materias" class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-100" title="Mi Pensum">
            <span class="pi pi-graduation-cap text-lg"></span>
          </a>
          <a routerLink="/app/recommendation/ia" class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-100" title="Recomendación">
            <span class="pi pi-microchip-ai text-lg"></span>
          </a>
           
        </div>
      </div>

      <!-- Mobile Sidebar Ove -->
      <div *ngIf="!isDesktop && sidebarVisible" class="fixed inset-0 z-[1200] lg:hidden">
        <div class="absolute inset-0 bg-black/50" (click)="closeSidebar()"></div>
        <div class="relative h-full w-[min(80vw,18rem)] bg-primary text-base-primary shadow-xl">
          <div class="flex justify-between items-center p-4 border-b border-primary-dark/40">
             
            <button class="text-2xl bg-secondary-custom hover:text-warning transition-colors" (click)="closeSidebar()" aria-label="Cerrar menú">
              ✕
            </button>
          </div>
          <div class="h-[calc(100%-4rem)] overflow-y-auto min-h-lvh">
            <app-sidebar ></app-sidebar>
          </div>
        </div>
      </div>

      <div 
        class="layout-main flex flex-col flex-1 min-h-screen  container-main   transition-all duration-300 first-line:"
        [style.marginLeft]="desktopMargin">
        <!-- Header -->
        <div class="container-header flex-shrink-0">
          <app-header></app-header>
        </div>

        <!-- Main Content - Con scroll -->
        <main class="flex-1 bg-secondary overflow-y-auto  ">
          <div class="p-4 lg:p-8 text-base-primary h-full min-h-[calc(100vh-5rem)] ">
            <router-outlet />
          </div>
        </main>
      </div>

    </div>
  `,
  
})
export class AppLayout implements OnInit, OnDestroy {
  items!: MenuItem[];
  sidebarVisible = true;
  isDesktop = true;
  private sidebarSub?: Subscription;
  readonly desktopSidebarWidth = 'clamp(15rem, 18vw, 19rem)';

  constructor(private layoutService: LayoutService) {}

  get desktopMargin(): string {
    // If desktop and sidebar visible -> full sidebar width
    // If desktop and sidebar hidden -> keep a small margin for the collapsed icon bar (w-12 => 3rem)
    if (this.isDesktop) {
      return this.sidebarVisible ? this.desktopSidebarWidth : '3rem';
    }
    return '0px';
  }

  ngOnInit() {
      this.updateViewportFlags();
      this.sidebarSub = this.layoutService.sidebarVisible$.subscribe(visible => {
        this.sidebarVisible = visible;
      });
      this.items = [
          {
              label: 'Files',
              icon: 'pi pi-file',
              items: [
                  {
                      label: 'Documents',
                      icon: 'pi pi-file',
                      items: [
                          {
                              label: 'Invoices',
                              icon: 'pi pi-file-pdf',
                              items: [
                                  {
                                      label: 'Pending',
                                      icon: 'pi pi-stop'
                                  },
                                  {
                                      label: 'Paid',
                                      icon: 'pi pi-check-circle'
                                  }
                              ]
                          },
                          {
                              label: 'Clients',
                              icon: 'pi pi-users'
                          }
                      ]
                  },
                  {
                      label: 'Images',
                      icon: 'pi pi-image',
                      items: [
                          {
                              label: 'Logos',
                              icon: 'pi pi-image'
                          }
                      ]
                  }
              ]
          },
          {
              label: 'Cloud',
              icon: 'pi pi-cloud',
              items: [
                  {
                      label: 'Upload',
                      icon: 'pi pi-cloud-upload'
                  },
                  {
                      label: 'Download',
                      icon: 'pi pi-cloud-download'
                  },
                  {
                      label: 'Sync',
                      icon: 'pi pi-refresh'
                  }
              ]
          },
          {
              label: 'Devices',
              icon: 'pi pi-desktop',
              items: [
                  {
                      label: 'Phone',
                      icon: 'pi pi-mobile'
                  },
                  {
                      label: 'Desktop',
                      icon: 'pi pi-desktop'
                  },
                  {
                      label: 'Tablet',
                      icon: 'pi pi-tablet'
                  }
              ]
          }
      ];
  }

  ngOnDestroy() {
    this.sidebarSub?.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewportFlags();
  }

  closeSidebar() {
    if (!this.isDesktop) {
      this.layoutService.setSidebarVisibility(false);
    }
  }

  openSidebar() {
    this.layoutService.setSidebarVisibility(true);
  }

  private updateViewportFlags() {
    if (typeof window === 'undefined') {
      return;
    }
    const wasDesktop = this.isDesktop;
    this.isDesktop = window.innerWidth >= 1024;
    if (this.isDesktop && !wasDesktop) {
      this.layoutService.setSidebarVisibility(true);
    }
  }
}
