import { Routes } from '@angular/router';
import { HomeView } from './home-view/home-view';
import { NotFoundView } from './not-found-view/not-found-view';
import { loggedInGuard, TodoList } from '@organization/shared-ui';

export const routes: Routes = [
  { path: 'home', component: HomeView },
  { path: 'todo', component: TodoList, canActivate: [loggedInGuard] },

  // default
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // catch all for not found
  { path: '**', component: NotFoundView },
];
