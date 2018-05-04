<template>
<div class="register">
	<el-alert class="dialog" v-show='err_show' title="您的输入有误!" type="warning" @close="reloadPage"></el-alert>
	<el-button style="display:none;" :plain="true" @click="open"></el-button>
	<form>
		<div class="item-wrapper">
			<input type="text" name='name' placeholder="用户名" v-model.trim='user.userName'>
		</div>
		<div class="item-wrapper">
			<input type="password" name='password1' placeholder="密码" v-model.trim='user.password1'>
		</div>
		<div class="item-wrapper">
			<input type="password" name='password2' placeholder="密码确认" v-model.trim='user.password2'>
		</div>
		<img v-show='user.avatar' :src="user.avatar" class="image">
		<div class="item-wrappper">
		  <label for="avatar">上传头像</label>
		  <input type="file" name="avatar" @change="onFileChange">
		</div>
		<div class="item-wrapper">
			<div class="button" @click="submit">注册</div>
		</div>
	</form>
</div>
</template>
<script>
const OK = 1;
const Err = 0;
	export default {
		data() {
			return {
				image: '',
				user: {
					userName: '',
					avatar: '',
					password1: '',
					password2: ''
				},
				err_show: false
			}
		},
		methods: {
			onFileChange(e) {
				const files = e.target.files || e.dataTransfer.files;
				if (!files.length) {
					return;
				}
				this.createImage(files[0]);
			},
			createImage(file) {
				const image = new Image();
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					this.user.avatar = e.target.result;
				}
			},
			submit() {
				if (!this.user.userName || !this.user.password1 || !this.user.password2 || !this.user.avatar || !(this.user.password1 === this.user.password2)) {
					this.err_show = true;
				}
				this.$http.post('/admin/register',this.user,{emulateJSON:true}).then((response) => {
					if (response.body.style == OK) {
						this.open();
					}else{
						this.err_show = true;
					}
				});
			},
			reloadPage(){
				this.err_show = false;
				this.$router.replace({path: '/admin/register'});
				this.user.userName = this.user.avatar = this.user.password1 = this.user.password2 = '';
			},
			open() {
				this.$message({
						message: '注册成功!',
						type: 'success'
					});		
				this.$router.replace({path: '/admin/login'});
			}
		}
	};	
</script>
<style lang="less">
	.register{
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
			input[name='password2']{
				border-radius: 0 0 4px 4px;
			}
			input[name='avatar']{
				margin-top: 10px;
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
			&:nth-child(3){
				margin-bottom: 10px;
			}
		}
		.image{
			width: 100px;
		}
	}
</style>
