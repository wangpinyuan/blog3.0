<template>
<div class="wrapper">
	<transition name='fade' mode="out-in">	
		<div class="desc" v-if='descShow' key='desc'>
			<img class="bg" src="./bg.jpg">
			<div class="content"> 
				<img :src="userInfo.avatar">
				<p class="name">{{userInfo.name}}</p>
				<p class="word">Stay Simple Stay Young;</p>
			</div>
		</div>
		<div class="groups" v-else key='group'>
			<ul>
				<li @click="select" data-value='全部'>全部<i v-if='loginCheck' @click.stop.prevent="createGroup">十</i></li>
				<li v-for="group in groupInfo" @click="select" :data-value='group'>{{group}}<i v-if='loginCheck' @click.stop.prevent="deletegroup">X</i></li>
			</ul>
		</div>
	</transition>
</div>
</template>
<script>
const Err = 0;
const OK = 1;
export default {
	props: {
		groupInfo:{
			type: [Object,Array]
		},
		userInfo:{
			type: [Object,Array]
		},
		descShow: Boolean,
		groupShow: Boolean,
		loginCheck: [Boolean,Function]

	},
	methods:{
		createGroup(){
	       this.$prompt('请输入新分组名称', '提示', {
	         confirmButtonText: '确定',
	         cancelButtonText: '取消',
	       }).then(({ value }) => {
	         this.$http.post('/post/createGroup',{'group':value},{emulateJSON:true}).then((response) => {
	         	response = response.body;
	         	if (response.style == OK) {
			         this.$message({
			           type: 'success',
			           message: '添加分组成功!'
			         });
					this.$router.push({path: '/posts',query:{'reload':true}});
			     }else{
			     	this.$message({
			     	  type: 'warning',
			     	  message: '添加分组失败!'
			     	});
			     }
	         })
	       }).catch(() => {
	         this.$message({
	           type: 'info',
	           message: '取消输入'
	         });       
	       });
		},
		select(e){
			var selectGroup = '全部';
			selectGroup = e.target.getAttribute('data-value');
			this.$emit('select',selectGroup)
			var lis = document.getElementsByClassName('groups')[0].getElementsByTagName('li');
			for (var i = 0; i < lis.length; i++) {
				lis[i].setAttribute('class','');
			}
			e.target.setAttribute('class','active');
		},
		deletegroup(e){
			const group = e.target.parentNode.getAttribute('data-value');
			this.$http.post('/post/deleteGroup',{'group':group},{emulateJSON:true}).then((response) => {
				response = response.body;
				if (response.style == OK) {
			     this.$message({
			       type: 'success',
			       message: '删除分组成功!'
			     });
			 	this.$router.push({path: '/posts',query:{'reload':true}});

			 }else{
			 	this.$message({
			 	  type: 'warning',
			 	  message: '删除分组失败!'
			 	});
			 }
			})
		}
	},
	// computed: {
	// 	checkLogin(){
	// 		if(sessionStorage.getItem("login") === 'OK'){
	// 			return true;
	// 		}
	// 		return false;
	// 	}
	// }
};
</script>
<style lang="less">
.wrapper{
	height: 100%;	
	.desc{
		position: relative;
		height: 100%;
		width: 100%;
		// background: url(./bg.jpg);
		img.bg{
			width: 100%;
			height: 99.6%;
			// filter: blur(1px);
			background-repeat: no-repeat;
			background-size: cover;
			z-index: 777;
		}
		.content{
			position: absolute;
			top: 135px;
			width: 100%;
			text-align: center;
			z-index: 888;
			img{
				width: 135px;
				height: 135px;
				border-radius: 50%;
			}
			.name{
			    margin-top: 30px;
			    font-size: 26px;
			}
			.word{
				font-size: 16px;
				margin-top: 30px;
			}
		}
	}
	.groups{
		height: 100%;
		width: 80%;
		background-color: #555555;;
		overflow: hidden;
		ul{
			padding-top: 50px;
			display: inline-block;
			width: 100%;
			height: 100%;
			text-align: left;
			li{
				display: inline-block;
				position: relative;
				width: 100%;
				height: 35px;
				font-size: 16px;
				line-height: 35px;
				color: #fff;
				box-sizing: border-box;
				padding-left: 50px;
				&:hover{
					background-color: #646464;
					border-left: 3px solid #ec7259;
				}
				&.active{
					background-color: #646464;
					border-left: 3px solid #ec7259;
				}
				i{
					position: absolute;
					right: 20px;
					cursor: pointer;
				}
			}
		}
	}
	.fade-enter-active, .fade-leave {
	  transition: all .5s;
	  opacity: 1;
	  transform:translate3d(0,0,0);
	}
	.fade-enter, .fade-leave-active {
	  // transition: all .5s;
	  opacity: 0;
	  transform:translate3d(-150%,0,0);
	}
}
</style>