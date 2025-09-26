import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type Section = {
  name: string;
  updated: Date;
};

@Component({
  selector: 'org-example-list',
  imports: [MatListModule, MatIconModule, DatePipe],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class EXAMPLEList {
  public folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  public notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  public typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
