import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			name: 'Auth',
			meta: {
				title: 'Авторизация'
			},
			component: () => import('@/views/Auth/AuthView.vue'),
		},
		{
			path: '/',
			name: 'Home',
			meta: {
				title: 'Главная'
			},
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'About',
			meta: {
				title: 'О системе'
			},
			component: () => import('@/views/AboutView.vue'),
		},
		{
			path: '/profile',
			name: 'Profile',
			meta: {
				title: 'Профиль'
			},
			component: () => import('@/views/ProfileView.vue'),
		},
		{
			path: '/groups',
			name: 'Groups',
			meta: {
				title: 'Группы'
			},
			component: () => import('@/views/Groups/GroupsView.vue'),
		},
		{
			path: '/groups/:id',
			name: 'GroupDetail',
			meta: {
				title: 'Детальная группы'
			},
			component: () => import('@/views/Groups/GroupDetailView.vue'),
		},
		{
			path: '/events',
			children: [
				{
					path: '',
					name: 'Events',
					meta: {
						title: 'Мероприятия'
					},
					component: () => import('@/views/Events/EventsView.vue'),
				},
				{
					path: ':id',
					name: 'EventDetail',
					meta: {
						title: 'Детальная мероприятия'
					},
					component: () => import('@/views/Events/EventDetailView.vue'),
				},
				{
					path: 'page/:page',
					name: 'EventsPagination',
					meta: {
						title: 'Мероприятия'
					},
					component: () => import('@/views/Events/EventsView.vue'),
				},
			]
		},
	],
})

router.beforeEach((to) => {
	document.title = `${to.meta.title} | ЧЭнК Активность`;
})

export default router
