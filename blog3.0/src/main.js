import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
// 
import posts from 'components/posts/posts';
import post from 'components/post/post';
import create from 'components/create/create';
import edit from 'components/edit/edit';
import admin from 'components/admin/admin';
import register from 'components/admin/register';
import login from 'components/admin/login';
import NOTFOUND from 'components/404/404';
// 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'common/less/reset.less';

import 'github-markdown-css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
const Err = 0;
const OK = 1;
const routes = [
	 {
	 	path: '/',
	 	component: posts,
	 	name: 'home'
	 },
	 {
	 	path: '/posts',
	 	component: posts,
	 	name: 'posts'
	 },
	 {
	 	path: '/post/:id',
	 	component: post,
	 	name: 'post'
	 },
	 {
	 	path: '/post/:id/edit',
	 	component: edit,
	 	name: 'edit'
	 },
	 {
	 	path: '/create',
	 	component: create,
	 	name: 'create'
	 },
	 {
	 	path: '/admin',
	 	component: admin,
	 	children: [
	 		{
	 			path: 'register',
	 			component: register,
	 			name: 'register'
	 		},
	 		{
	 			path: 'login',
	 			component: login,
	 			name: 'login'
	 		}
	 	]
	 },
	 {
	 	path: '*',
	 	component: NOTFOUND
	 }
];

const router = new VueRouter({
	// mode:'history',
	routes
});


var vm = new Vue({
	el: "#app",
	router,
	...App
})
router.beforeEach((to,from,next) => {
	vm.$http.post('/admin/checkLogin').then((response) => {
		response = response.body
		if (response.style == OK) {
			sessionStorage.setItem("login", 'OK');
		}else{
			sessionStorage.setItem("login", 'Err');
		}
		next();
	});
})
