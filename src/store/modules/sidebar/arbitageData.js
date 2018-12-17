// Sidebar Routers
export const menus = {
	'': [
		{
			action: 'zmdi-view-dashboard',
			title: 'Exchange Box',
			active: true,
            items: null,
            path: '/exchange'
        },
        {
			action: 'zmdi-wrench',
			title: 'Trade Box',
			active: false,
            items: null,
            path: '/trade'
        },
        {
			action: 'zmdi-file-plus',
			title: 'Parity',
			active: false,
            items: null,
            path: '/parity'
        },
        {
			action: 'zmdi-widgets',
			title: 'User Box',
			active: false,
            items: null,
            path: '/user'
		}
	],
}
