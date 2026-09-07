import { Routes } from '@angular/router';
import { APP_ROUTES } from '@core/routes/routes.config';

export const routes: Routes = [
  {
    path: APP_ROUTES.INDEX.path,
    data: { title: APP_ROUTES.INDEX.title },
    loadComponent: () => import('@features/index/index').then((m) => m.Index),
  },
  {
    path: '',
    loadComponent: () =>
      import('@common/layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: APP_ROUTES.ERROR_SPOTTING.path,
        data: { title: APP_ROUTES.ERROR_SPOTTING.title },
        loadComponent: () =>
          import('@features/error-spotting/error-spotting').then(
            (m) => m.ErrorSpotting
          ),
      },
      {
        path: APP_ROUTES.READING_COMPREHENSION.path,
        data: { title: APP_ROUTES.READING_COMPREHENSION.title },
        loadComponent: () =>
          import('@features/reading-comprehension/reading-comprehension').then(
            (m) => m.ReadingComprehension,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.INDEX.path,
  },
];