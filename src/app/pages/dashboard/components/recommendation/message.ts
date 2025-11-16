import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [ButtonModule, ButtonGroupModule, SplitButtonModule],
    template: `<div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            <h1>Message</h1>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Default</div>
                <div class="flex flex-wrap gap-2">
                    <p-button label="Submit"></p-button>
                    <p-button label="Disabled" [disabled]="true"></p-button>
                    <p-button label="Link" class="p-button-link" />
                </div>
            </div>
        </div>
    </div>`,
 
})
export class MessageComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}