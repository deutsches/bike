import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          component: () => import('../views/front/ProductView.vue'),
        },
        {
          path: 'about',
          component: () => import('../views/front/AboutView.vue'),
        },
        {
          path: '/',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: '/admin',
          component: () => import('../views/admin/StatisticsView.vue'),
        },
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'orders',
          component: () => import('../views/admin/OrdersView.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/ErrorView.vue'),
    },
  ],
});

export default router;
