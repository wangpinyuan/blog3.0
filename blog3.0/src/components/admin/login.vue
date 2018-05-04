<template>
<div class="login">
	<el-alert class="dialog" v-show='err_show' title="您的输入有误!" type="warning" @close="reloadPage"></el-alert>
	<el-button style="display:none;" :plain="true" @click="open">打开消息提示</el-button>
	<form>
		<div class="item-wrapper">
			<input type="text" name='name' placeholder="用户名" v-model.trim="user.userName">
		</div>
		<div class="item-wrapper">
			<input type="password" name='password' placeholder="密码" v-model.trim="user.password">
		</div>
		<div class="item-wrapper">
			<div class="button" @click="login">登录</div>
		</div>
	</form>
</div>
</template>
<script>
const Err = 0;
const OK = 1;
export default {
	data() {
		return {
			user: {
				userName: '',
				password: ''
			},
			err_show: false
		}
	},
	methods: {
		login() {
			this.$http.post('/admin/login',this.user,{emulateJSON:true}).then((response) => {
				if(response.body.style == OK) {
					this.open();
				}else{
					this.err_show = true;
				}
			});
		},
		reloadPage() {
			this.err_show = false;
			this.$router.replace({path: '/admin/login'});
			this.user.userName = this.user.password = '';
		},
		open() {
		  this.$message({
		  		message: '登录成功!',
		  		type: 'success'
		  	});
		  this.$router.replace({path: '/posts',query:{'reload':true}});
		}
	}
}
</script>
<style lang="less">
	.login{
		position: relative;
		.item-wrapper{
			width: 300px;
			height: 50px;
			line-height: 50px;
			input{
				box-sizing: border-box;
				border:none;
				padding: 4px 12px 4px 25px;
				width: 100%;
				height: 50px;
				background-color: hsla(0,0%,71%,.1);
				font-size: 14px;
				line-height: 40px;
				color: #a0a0a0;
				border: 1px solid #c8c8c8;
			}
			input[name='name']{
				border-radius: 4px 4px 0 0;
			}
			input[name='password']{
				border-radius: 0 0 4px 4px;
			}
			.button{
				cursor: pointer;
				box-sizing: border-box;
				margin-top: 10px;
				width: 100%;
				font-size: 18px;
				border-radius: 4px;
				color: #fff;
				background: #42c02e;
				text-align: center;
			}
		}
	}
</style>