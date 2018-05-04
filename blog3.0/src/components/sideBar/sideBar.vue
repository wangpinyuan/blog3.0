<template>
	<ul class="sideBar">
		<el-button style="display:none;" :plain="true" @click="open"></el-button>
		<li><img src='./personal.png' @click='showDesc'></li>
		<li><img src='./classify.png' @click='showGroup'></li>
		<router-link v-if='loginCheck' to='/create' tag='li'><img src='./create.png'></router-link>
		<li><img v-if='loginCheck' src='./logout.png' @click='loginOut'></li>
	</ul>
</template>
<script>
const Err = 0;
const OK = 1;
	export default {
		props: {
			loginCheck: [Boolean,Function]
		},
		methods: {
			showDesc(){
				this.$emit('showDesc',true);
			},
			showGroup(){
				this.$emit('showGroup',true);
			},
			loginOut(){
				this.$http.post('/admin/logout').then((response) => {
					response = response.body;
					if (response.style == OK) {
						this.open();
					}
				})
			},
			open() {
				this.$message({
						message: '登出成功!',
						type: 'success'
					});		
				this.$router.push({path: '/posts',query:{'reload':true}});
			}
		}
	};
</script>
<style lang="less">
	.sideBar{
		box-sizing: border-box;
		padding-top: 20px;
		background-color: #2A2A2A;
		color:#fff;
		z-index: 999;
		height: 100%;
		li{
			height: 32px;
			width: 32px;
			margin: 15px auto;
			cursor: pointer;

			&:first-child{
				margin-top: 0;
			}
		}
	}
</style>