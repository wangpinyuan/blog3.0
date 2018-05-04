<template>
	<div class="artical-container"  v-if='articals'>
		<div class="artical" v-for="artical in articals" v-if='filterArticals(artical.group)'>
			<div class="info">
				<span><img :src="userInfo.avatar">{{userInfo.name}}</span>
				<span>分组：<span class="group">{{artical.group}}</span></span>
				<span>日期：{{artical.date}}</span>
			</div>
			<router-link :to="'/post/'+artical._id" :userInfo="userInfo" class="title" :loginCheck='loginCheck'>{{artical.title}}</router-link>
			<p class="desc">{{artical.desc}}</p>
<!-- 			<div class="pv">
				<span>阅读：50</span>
			</div> -->
		</div>
	</div>
</template>
<script>
	import avatar from 'common/avatar/avatar.jpg';
	export default {
		data() {
			return {
				avatar: avatar
			}
		},
		created(){
			this.filterArticals();
		},
		props: {
			articals: {
				type: [Object,Array]
			},
			userInfo: {
				type: [Object,Array]
			},
			selectGroup: {
				type: [String,Function]	
			},
			loginCheck: [Boolean,Function]

		},
		methods: {
			filterArticals(group){
				if (this.selectGroup.name == 'String' || this.selectGroup == '全部' || group === this.selectGroup) {
					return true;
				}
			},
			compiledMarkdown(content){
				return marked(content)
			}
		}
	};
</script>
<style lang="less">
	.artical-container{
			height: 100%;
			overflow: auto;
			padding-right: 50px;
		.artical{
			position: relative;
			width: 100%;
			border-bottom: 1px dashed #d9d9d9;
			padding: 10px 25px;
			box-sizing: border-box;
			.info{
				margin: 0px 0 10px 0;
				font-size: 12px;
				color: #969696;;
				a{
					color: #969696;
				}
				a:hover{
					color: #626262;
				}
				span{
					margin-right: 15px;
					img{
						width: 24px;
						height: 24px;
						border-radius: 50%;
						margin-right: 10px;
						position: relative;
						top: 6px;
					}
					.group{
						padding: 2px 6px;
						color: #6699cc !important;
						border: 1px solid #6699cc;
						border-radius: 3px;
					}
				}
			}
			.title{
				color:#333;
				line-height: 1.5; 
				font-size: 18px;
				font-weight: 700;
				margin: 10px 0;
				display: inline-block;

			}
			.desc{
				display: block;
				margin-top: 5px;
				font-size: 13px;
				line-height: 24px;
				color: #333;
			}
			.pv{
				color: #969696;
				font-size: 12px;
				margin-top: 15px;
			}
		}
	}
</style>