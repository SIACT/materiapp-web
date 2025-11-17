import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { Select } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

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
  imports: [Select,ToggleSwitchModule,MenubarModule,BadgeModule,AvatarModule,FormsModule,CommonModule],
  template: `
  <div class="card">
    <p-menubar [model]="items" styleClass="shearch-menubar">
      <ng-template #start>
        <div class="flex items-center justify-center shearch-field">
          <input type="text" pInputText placeholder="Search by name or code ..." class="shearch-input container-shearch" />
        </div>
      </ng-template>

      <ng-template #item let-item let-root="root">
        <div class="flex justify-center shearch-field">
          <p-select 
            [options]="selectOptions" 
            [(ngModel)]="selectedOption" 
            [checkmark]="true" 
            optionLabel="label" 
            [showClear]="true" 
            size="small"
            placeholder="Select an option" 
            class="shearch-select" />
        </div>
      </ng-template>

      <ng-template #end>
        <div class="flex items-center justify-center gap-2 shearch-field">
          <p-toggleswitch [(ngModel)]="checked" />
          <label class="text-sm whitespace-nowrap">Show only remaining</label>
        </div>
      </ng-template>
    </p-menubar>
  </div>
  `,
   
})
export class Shearch implements OnInit{
  checked: boolean = true;
  items: MenuItem[] | undefined;
  selectOptions: SelectOption[] = [];
  selectedOption: SelectOption | null = null;
  private menuEntries: MenuEntry[] = [];

  ngOnInit() {
      this.menuEntries = [
        {
          label: 'Calendario',
          icon: 'pi pi-search',
          badge: '3',
          children: [
            { label: 'Core', icon: 'pi pi-bolt'   },
            { label: 'Blocks', icon: 'pi pi-server'  },
            { label: 'UI Kit', icon: 'pi pi-pencil'  },
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
}
