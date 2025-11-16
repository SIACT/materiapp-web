import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooter } from "../app.footer/app.footer";
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { AppHeader } from "../app.header/app.header";
import { AppSidebar } from "../sidebar/app.sidebar";
import { AppLogo } from "../logo/logo";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  PanelMenuModule, AppHeader, AppSidebar],
  template: `
   <div class="flex flex-col min-h-screen">
     
      <div class="flex flex-1">
        <!-- Sidebar (Nav) - Fondo Primario -->
        <nav class="hidden lg:block w-72 h-screen container-sidebar text-inverse overflow-y-auto lg:static z-[1100]
                    {{ sidebarOpen ? 'block' : 'hidden' }}
                    lg:block">
          
          <!-- Sidebar Header (solo móvil) -->
          <div class="flex justify-between items-center p-4 border-b border-primary-dark lg:hidden">
            <h2 class="text-xl font-semibold">Menú</h2>
            <button 
              class="text-2xl hover:text-warning transition-colors"
              (click)="toggleSidebar()">
              ✕
            </button>
          </div>
 
          <!-- Navigation Menu -->
          <div class="flex justify-center">
            <app-sidebar></app-sidebar>
          </div>
        
        </nav>

        <!-- Overlay (solo móvil) -->
        <div 
          class="fixed inset-0 bg-black/50 z-[1050] transition-opacity duration-300 lg:hidden
                 {{ sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible' }}"
          (click)="toggleSidebar()">
        </div>

        <!-- Main Content - Fondo Base -->
        <main class="flex-1 container-primary overflow-auto flex flex-col pt-4 pr-4">
            <div class="!container-primary">
            <!-- Header -->
                <div class="container-header">
                   <app-header></app-header>
                </div>

                <!-- Router Outlet - Fondo claro -->
                <div class="flex-1 p-4 lg:p-8 bg-base text-base-primary">
                    <router-outlet />
                </div>
            </div>
           
        </main>
      </div>
    

    </div>
  `,
  
})
export class AppLayout implements OnInit {
  items!: MenuItem[];


  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  


  ngOnInit() {
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
      ]
  }
}
