import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			name: 'Auth',
			component: () => import('@/views/AuthView.vue'),
		},
		{
			path: '/registration',
			name: 'Register',
			component: () => import('@/views/RegisterView.vue'),
		},
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/',
			name: 'About',
			component: () => import('@/views/AboutView.vue'),
		},
		{
			path: '/events',
			name: 'Events',
			component: () => import('@/views/EventsView.vue'),
		},
		{
			path: '/groups',
			name: 'Groups',
			component: () => import('@/views/GroupsView.vue'),
		},
		{
			path: '/groups/:id',
			name: 'GroupDetail',
			component: () => import('@/views/GroupDetailView.vue'),
		},
		{
			path: '/students',
			name: 'Students',
			component: () => import('@/views/StudentsView.vue'),
		},
	],
})

export default router
