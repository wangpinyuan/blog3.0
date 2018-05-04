<template>
	<div class="app">
	<keep-alive :exclude="posts">
		<router-view 
			:groupInfo='groupInfo' 
			:userInfo='userInfo' 
			:loginCheck='loginCheck'
		>
		</router-view>
	</keep-alive>
	</div>
</template>
<script>
import router from './main.js';
const Err = 0;
const OK = 1;
export default {
	data() {
		return {
			groupInfo:{},
			userInfo:{},
			loginCheck: Boolean
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.__init();
		})
	},
	watch: {
		'$route' () {
			if (this.$route.name == 'posts') {
				if (this.$route.query.reload) {
					this.$router.push({path: '/posts'});
				}else{
					// this.__init();
					this.getGroupData();
					this.checkLogin();
				}
			}
		}
	},
	methods: {
		__init(){
			this.getGroupData();
			this.getUserData();
			this.checkLogin();
		},
		getGroupData(){
			this.$http.get('/api/groupInfo').then((response) => {
				response = response.body;
				if (response.style == OK) {
					this.groupInfo = response.groups;
				}
			})
		},
		getUserData(){
			this.$http.get('/api/userInfo').then((response) => {
				response = response.body;
				this.userInfo = response.user;
			})
		},
		checkLogin(){
			if(sessionStorage.getItem("login") === 'OK'){
				this.loginCheck = true;
			}else{
				this.loginCheck = false;
			}
		}
	}
};
</script>
<style lang="less">
	.app{
		height: 100%;
	}
</style>
