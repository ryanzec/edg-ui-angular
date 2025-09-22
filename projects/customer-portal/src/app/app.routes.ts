import { Routes } from '@angular/router';
import { HomeView } from './home-view/home-view';
import { UsersList } from '@organization/shared-ui';
import { NotFoundView } from './not-found-view/not-found-view';
import { TodoView } from './todo-view/todo-view';

export const routes: Routes = [
  { path: 'home', component: HomeView },
  { path: 'users', component: UsersList },
  { path: 'todo', component: TodoView },

  // default
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', component: NotFoundView },
];
