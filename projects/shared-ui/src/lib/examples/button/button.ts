import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ComponentColorDirective } from '@organization/shared-ui';

@Component({
  selector: 'org-examples-button',
  imports: [MatButtonModule, ComponentColorDirective],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  protected setTotalItems(total: number) {
    console.log('setTotalItems', total);
  }
}
