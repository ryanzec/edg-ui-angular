import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload';

@Component({
  selector: 'org-users-list',
  imports: [FileUploadComponent],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {}
