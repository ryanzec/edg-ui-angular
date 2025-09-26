import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ComponentColorDirective } from '@organization/shared-ui';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'org-examples-button',
  imports: [MatButtonModule, ComponentColorDirective, MatIconModule, MatDividerModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class EXAMPLEButton {
  protected setTotalItems(total: number) {
    console.log('setTotalItems', total);
  }
}
