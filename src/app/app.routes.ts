import { Routes } from '@angular/router';
import { APP_ROUTES } from '@core/routes/routes.config';
import { authGuard } from '@features/admin/guards/auth.guard';

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
      {
        path: APP_ROUTES.SENTENCE_STRUCTURE.path,
        data: { title: APP_ROUTES.SENTENCE_STRUCTURE.title },
        loadComponent: () =>
          import('@features/sentence-structure/sentence-structure').then(
            (m) => m.SentenceStructure,
          ),
      },
      {
        path: APP_ROUTES.VOCABULARY.path,
        data: { title: APP_ROUTES.VOCABULARY.title },
        loadComponent: () =>
          import('@features/vocabulary/vocabulary').then((m) => m.Vocabulary),
      },
      {
        path: APP_ROUTES.GRAMMAR_REVIEW.path,
        data: { title: APP_ROUTES.GRAMMAR_REVIEW.title },
        loadComponent: () =>
          import('@features/grammar-review/grammar-review').then(
            (m) => m.GrammarReview,
          ),
      },
      {
        path: APP_ROUTES.MOCK_EXAM.path,
        data: { title: APP_ROUTES.MOCK_EXAM.title },
        loadComponent: () =>
          import('@features/mock-exam/mock-exam').then(
            (m) => m.MockExam,
          ),
      },
    ],
  },
  // ── Admin area ────────────────────────────────────────────
  {
    path: APP_ROUTES.ADMIN.path,
    children: [
      // /admin/login → login page (pública)
      {
        path: APP_ROUTES.ADMIN_LOGIN.path,
        data: { title: APP_ROUTES.ADMIN_LOGIN.title },
        loadComponent: () =>
          import('@features/admin/components/login/login').then(
            (m) => m.AdminLogin,
          ),
      },
      // /admin/ y sus hijos → protegidos por authGuard
      {
        path: APP_ROUTES.ADMIN_INDEX.path,
        canActivate: [authGuard],
        loadComponent: () =>
          import('@features/admin/admin-layout/admin-layout').then(
            (m) => m.AdminLayout,
          ),
        children: [
          {
            path: APP_ROUTES.ADMIN_INDEX.path,
            data: { title: APP_ROUTES.ADMIN_INDEX.title },
            loadComponent: () =>
              import('@features/admin/admin-index/admin-index').then(
                (m) => m.AdminIndex,
              ),
          },
          {
            path: APP_ROUTES.ADMIN_CONTENT_MANAGER.path,
            data: { title: APP_ROUTES.ADMIN_CONTENT_MANAGER.title },
            loadComponent: () =>
              import('@features/content-manager/content-manager').then(
                (m) => m.ContentManager,
              ),
          },
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────
  {
    path: '**',
    redirectTo: APP_ROUTES.INDEX.path,
  },
];
