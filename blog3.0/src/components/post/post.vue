<template>
<div>
	<NOTFOUND v-if='notfound'></NOTFOUND>
	<div v-else class="post-container">
		<div class="title">
			<h1>{{post.title}}</h1>
			<span class="avatar"><img :src="userInfo.avatar">{{userInfo.name}}</span>
			<span>日期：{{post.date}}</span>
			<router-link v-if='loginCheck' :to="{path:'edit'}" class="operate" append tag="span" :groupInfo='groupInfo'>编辑</router-link>
			<span class="operate" v-if='loginCheck' @click="deleteArtical">删除</span>
		</div>
		<div class="content markdown-body" v-html='compiledMarkdown'></div>
	</div>
</div>
</template>
<script>
const Err = 0;
const OK = 1;
import avatar from 'common/avatar/avatar.jpg';
import NOTFOUND from 'components/404/404';
export default {
	data() {
		return {
			avatar:avatar,
			post: Object,
			notfound: false
		}
	},
	props: {
		userInfo: {
			type: Object
		},
		groupInfo: {
			type: Array
		},
		loginCheck: [Boolean,Function]
	},
	mounted() {
		this.$nextTick(function(){
			this.getPostData();
		})
	},
	methods: {
		__init(){
			this.notfound = false;
			this.getPostData();
		},
		getPostData() {
			var postId = this.$route.params.id;
			this.$http.get('/post/post',{params:{id:postId}},{emulateJSON:true}).then((response) => {
				response = response.body;
				if (response.style == OK) {
					this.post = response.post;
				}else{
					this.notfound = true;
				}
			})
		},
		deleteArtical(){
			var postId = this.$route.params.id;
			this.$http.post('/post/deleteArtical',{id:postId},{emulateJSON:true}).then((response) => {
				response = response.body;
				if (response.style == OK) {
			     this.$message({
			       type: 'success',
			       message: '删除分组成功!'
			     });
			     this.$router.push({path: '/posts'})
			 }else{
			 	this.$message({
			 	  type: 'warning',
			 	  message: '删除分组失败!'
			 	});
			}
			})
		}
	},
	computed: {
		compiledMarkdown() {
		  return marked(this.post.content);
		}
	},
	watch: {
		'$route' () {
			if (this.$route.name == 'post') {
				this.__init();
			}
		}
	},
	components: {
		NOTFOUND
	}
};
</script>
<style lang="less">
.post-container{
    font-family:Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif;
	width: 960px;
	padding: 0 50px;
	box-sizing: border-box;
	margin: 0 auto;
	padding-top: 50px;
	text-align: center;
	.title{
		h1{
			font-size: 32px;
			line-height: 45px;
			font-weight: 700;
			margin-bottom: 20px;
		}
		span{

			img{
				position: relative;
				top: 6px;
				width: 24px;
				height: 24px;
				border-radius: 50%;
				margin-right: 10px;
			}
			font-size: 12px;
			color: #969696;
			margin-right:10px; 
			&.operate{
				cursor: pointer;
			}
		}
	}
	.content{
		margin: 30px 0; 
		text-align: left;
	}
}
</style>
