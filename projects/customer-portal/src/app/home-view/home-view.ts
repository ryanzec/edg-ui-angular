import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentColorDirective } from '@organization/shared-ui';

@Component({
  selector: 'cp-home-view',
  imports: [MatButtonModule, MatIconModule, ComponentColorDirective],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss',
})
export class HomeView {
  protected setTotalItems(total: number) {
    console.log('setTotalItems', total);
  }
}
