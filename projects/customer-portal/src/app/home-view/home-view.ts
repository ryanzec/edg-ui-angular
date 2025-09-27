import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cp-home-view',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss',
})
export class HomeView {}
