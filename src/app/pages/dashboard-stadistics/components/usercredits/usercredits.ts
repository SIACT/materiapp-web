import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-usercredits',
  standalone: true,
  imports: [AvatarModule, CardModule, DividerModule],
  template: `
    <div
      class="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      <!-- Banner -->
      <div class="h-24 w-full overflow-hidden">
        <img
          src="{{ imageUrl }}"
          alt="banner"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Avatar -->
      <div class="flex justify-center -mt-10">
        <p-avatar
          image="{{ imageProfile }}"  
          shape="circle"
          size="xlarge"
          class="border-4 border-white shadow-md"
        ></p-avatar>
      </div>

      <!-- Name & Location -->
      <div class="text-center mt-3 mb-6">
        <h3 class="text-xl font-semibold text-black">Arika Maulana</h3>
        <p class="text-gray-500 text-sm">Surakarta, INA</p>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-2 gap-3 px-6 pb-6">
        <!-- Courses -->
        <div
          class="bg-purple-50 rounded-2xl p-4 flex flex-col justify-center items-center"
        >
          <i class="pi pi-book text-purple-500 text-xl mb-1"></i>
          <span class="text-2xl font-bold text-purple-600">24</span>
          <span class="text-gray-600 text-sm">Course</span>
        </div>

        <!-- Certifications -->
        <div
          class="bg-purple-50 rounded-2xl p-4 flex flex-col justify-center items-center"
        >
          <i class="pi pi-star text-purple-500 text-xl mb-1"></i>
          <span class="text-2xl font-bold text-purple-600">18</span>
          <span class="text-gray-600 text-sm">Certification</span>
        </div>
      </div>
    </div>
  `,
})
export class Usercredits {
  imageUrl = 'https://img.freepik.com/foto-gratis/vista-superior-surtido-suministros-oficina-espacio-copia_23-2148543746.jpg?semt=ais_hybrid&w=740&q=80';
  imageProfile = 'https://avatars.githubusercontent.com/u/92270218?v=4';
}
