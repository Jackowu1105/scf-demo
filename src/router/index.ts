import { createRouter, createWebHistory } from 'vue-router'
import AssetListView from '../views/AssetListView.vue'
import AssetCalculatorView from '../views/AssetCalculatorView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
 
    {
      path: '/asset-list',
      name: 'asset-list',
      component: AssetListView,
    },
    {
      path: '/asset-calculator',
      name: 'asset-calculator',
      component: AssetCalculatorView,
    },
  ],
})

export default router
