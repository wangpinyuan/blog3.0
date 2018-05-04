<template>
	<div>
		<div class="creat-container" v-if='loginCheck'>
			<el-alert class="dialog" v-show='err_show' title="您的输入有误!" type="warning" @close="reloadPage"></el-alert>
			<el-button style="display:none;" :plain="true" @click="open"></el-button>
			<input class="title" type="text" name="title" placeholder="请输入标题" v-model='post.title'>
			<input class="desc" type="text" name="desc" placeholder="请输入描述" v-model='post.desc'>
			<textarea class="content" v-model='post.content' @input="update" placeholder="请输入文本"></textarea>
			<div class="showContent markdown-body" v-html='showContent'></div>
			<select class="group" name="group" v-model='post.group'>
				<option v-for="group in groupInfo" :value="group">{{group}}</option>
			</select>
			<div class="button" @click="submit">发表</div>
		</div>
		<NOTFOUND v-else></NOTFOUND>
	</div>
</template>
<script>
import NOTFOUND from 'components/404/404';

const Err = 0;
const OK = 1;
export default {
	data() {
		return {
			post: {
				title: '',
				desc: '',
				content: '',
				group: ''
			},
			showContent: '',
			err_show: false
		}
	},
	props: {
		groupInfo: {
			type: [Object,Array]
		},
		loginCheck: [Boolean,Function]
	},
	activated() {
		this.post.title = '';
		this.post.desc = '';
		this.post.content = '';
		this.post.group = '';
		this.showContent = '';
	},
	methods: {
		submit() {
			if (!this.post.title || !this.post.desc || !this.post.content || !this.post.group) {
				this.err_show = true;
			}
			this.$http.post('/post/create',this.post,{emulateJSON:true}).then((response) => {
				if (response.body.style == OK) {
					this.open();
				}else{
					this.err_show = true;
				}
			})
		},
		reloadPage(){
			this.err_show = false;
			this.$router.replace({path: '/create'});
		},
		open() {
			this.$message({
					message: '发表成功!',
					type: 'success'
				});		
			this.$router.push({path: '/posts'});
		},
		update(){
			this.showContent = marked(this.post.content);
		}
	},
	components: {
		NOTFOUND
	}
};
</script>
<style lang="less">
	.creat-container{
		position: relative;
		margin: 0 auto;
		padding-top: 20px;
		max-width: 1160px;
		.title{
			display: block;
			width: 100%;
			height: 50px;
			font-size: 32px;
			line-height: 1.4;
			font-weight: 700;
			color: #333;
			border: none;
			border-bottom: 1px solid #ccc;
			padding-bottom: 10px;
		}
		.desc{
			margin-top: 20px;
			display: block;
			width: 100%;
			height: 30px;
			font-size: 16px;
			line-height: 1.4;
			font-weight: 700;
			color: #333;
			border: none;
			border-bottom: 1px solid #ccc;
			padding-bottom: 5px;
		}
		.content{
			margin: 30px 0;
			padding-bottom: 30px;
			font-size: 16px;
			line-height: 1.7;
			font-weight: 400;
			width: 45%;
			height:350px;
			outline: 0;
			border:none;
			border-bottom: 1px dashed #ccc;
			resize:none;
		}
		.showContent{
			float: right;
			margin: 30px 0;
			padding-bottom: 30px;
			width: 45%;
			height:350px;
			outline: 0;
			border:none;
			border-bottom: 1px dashed #ccc;
			resize:none;
			overflow-y: scroll;
		}
		.group{
			display: block;
			height: 30px;
			color: #696969;
			border: 1px solid #ccc;
			padding: 0 5px;
			margin: 0;
			float: none;
			text-align: center;
		}
		.button{
			margin-top: 10px;
			border-radius: 5px;
			background-color: #4470B7;
			color: #fff;
			padding: 10px 0px;
			cursor: pointer;
			width: 77px;
			text-align: center;
			box-sizing: border-box;
		}
	}
</style>