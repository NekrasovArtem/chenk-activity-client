import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			name: 'Auth',
			component: () => import('@/views/Auth/AuthView.vue'),
		},
		{
			path: '/registration',
			name: 'Register',
			component: () => import('@/views/Auth/RegisterView.vue'),
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
			component: () => import('@/views/Events/EventsView.vue'),
		},
		{
			path: '/events/:id',
			name: 'EventDetail',
			component: () => import('@/views/Events/EventDetailView.vue'),
		},
		{
			path: '/groups',
			name: 'Groups',
			component: () => import('@/views/Groups/GroupsView.vue'),
		},
		{
			path: '/groups/:id',
			name: 'GroupDetail',
			component: () => import('@/views/Groups/GroupDetailView.vue'),
		},
	],
})

export default router
