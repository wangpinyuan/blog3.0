<template>
	<div class="posts">
		<div class="sideBar-wrapper">
			<sideBar @showDesc="showDesc" @showGroup='showGroup' :loginCheck='loginCheck'></sideBar>
		</div>
		<div class="desc-wrapper">
			<description @select="select" :selectGroup='selectGroup' :userInfo='userInfo' :groupInfo='groupInfo' :descShow='descShow' :groupShow='groupShow' :loginCheck='loginCheck'></description>
		</div>
		<div class="main-content-wrapper">
			<div class="main-content">
				<div class="search-wrapper">
					<search></search>
				</div>
				<div class="articals-wrapper">
					<articalList :articals="articals" :groupInfo='groupInfo' :userInfo='userInfo' :selectGroup='selectGroup' :loginCheck='loginCheck'></articalList>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import sideBar from 'components/sideBar/sideBar';
import description from 'components/desc/desc';
import search from 'components/search/search';
import articalList from 'components/articals/articals';
const Err = 0;
const OK = 1;

export default {
	data() {
		return {
			articals: {
				type: [Array,Object]
			},
			descShow: true,
			groupShow: false,
			selectGroup: String
		}
	},
	props: {
		groupInfo: {
			type: [Object,Array]
		},
		userInfo: {},
		loginCheck: [Boolean,Function]
	},
	activated(){
		this.getPostsData();
	},
	methods: {
		getPostsData(){
			this.$http.get('/post/posts').then((response) => {
				response = response.body;
				this.articals = response.posts;
			});
		},
		showDesc(){
			this.descShow = true;
			this.groupShow = false;
		},
		showGroup(){
			this.descShow = false;
			this.groupShow = true;
		},
		select(selectGroup){
			this.selectGroup = selectGroup;
		}
	},
	components: {
		sideBar,
		description,
		search,
		articalList
	}
};
</script>
<style lang="less">
	.posts{
		display: flex;
		width: 100%;
		height: 100%;
		.sideBar-wrapper{
			flex: 0 0 45px;
			height: 100%;
			z-index: 999;
		}
		.desc-wrapper{
			height: 99.8%;
			flex: 0 0 350px;
		}
		.main-content-wrapper{
			flex: 1;
			.main-content{
				display: flex;
				flex-direction: column;
				height: 100%;
				.search-wrapper{
					height: 50px;
				}
				.articals-wrapper{
					height: 100%;
					flex:1;
					overflow: auto;
				}
			}
		}
	}
</style>