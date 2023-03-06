import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/ForntLayout.vue'),
      children: [
        {
          path: 'Products',
          component: () => import('../views/front/ProductsView.vue'),
        },
        {
          path: 'Product/:id',
          component: () => import('../views/front/ProductView.vue'),
        },
        {
          path: 'About',
          component: () => import('../views/front/AboutView.vue'),
        },
        {
          path: '/',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'Cart',
          component: () => import('../views/front/CartView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'Products',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'Product/:id',
          component: () => import('../views/admin/AdminProduct.vue'),
        },
        {
          path: 'Statistics',
          component: () => import('../views/admin/StatisticsView.vue'),
        },
      ],
    },
    {
      path: '/Login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
});

export default router;
