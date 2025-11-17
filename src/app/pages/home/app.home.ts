import { Component } from '@angular/core';
import { Articule } from "./components/articule/articule";

@Component({
  selector: 'app-app-home',
  standalone: true,
  imports: [Articule],
  template: `
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-4xl font-bold mb-4 text-black">Bienvenido a SIACT</h1>
      <p class="text-lg text-center max-w-md text-black">
        Esta es la página de inicio de la aplicación. Navega a través del menú lateral para explorar las diferentes funcionalidades disponibles.
      </p>
    </div>
  <app-articule></app-articule>

  `,
  
})
export class AppHome {

}
