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
			path: '/',
			name: 'Home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('@/views/AboutView.vue'),
		},
		{
			path: '/profile',
			name: 'Profile',
			component: () => import('@/views/ProfileView.vue'),
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
