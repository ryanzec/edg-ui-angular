import { HomeView } from './home-view/home-view';
import { loggedInGuard } from '@organization/shared-ui';
import { NotFoundView } from './not-found-view/not-found-view';
import { TodoView } from './todo-view/todo-view';
import { ApplicationRoute } from '@organization/shared-ui';

export const routes: ApplicationRoute[] = [
  { path: 'home', component: HomeView },
  {
    path: 'todo',
    component: TodoView,
    canActivate: [loggedInGuard],
    data: { unauthenticatedRedirect: '/home' },
  },

  // default
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', component: NotFoundView },
];
