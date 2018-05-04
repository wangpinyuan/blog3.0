<template>
	<div class="search">
		<span class="name">Amumu's</span>
		<div class="content-right">
			<a href="https://github.com/wangpinyuan" target="__blank"><img src="./github.png"></a>
			<a href="mailto:wpystars@163.com"><img src="./Email.png" title='wpystars@163.com'></a>
		</div>
<!-- 		<form method="post" enctype="form-data">
			<input type="text" name="title" class="search-input" placeholder="搜索">
			<i id="J_search"></i>
		</form> -->
	</div>
</template>
<style lang="less">
	.search{
		height: 50px;
		padding: 0 50px;
		line-height: 50px;
		border-bottom: 2px solid #d9d9d9;
		width: 100%;
		box-sizing: border-box;
		z-index: 1;
		span{
			font-size: 36px;
			&.name{
				text-decoration: none;
				color: #525252;
			}
		}
		form{
			display: inline-block;
			float: right;
			.search-input{
				padding: 0 40px 0 20px;
				width: 160px;
				height: 38px;
				font-size: 14px;
				border: 1px solid #eee;
				border-radius: 40px;
				background: #eee;
			}
			i{
				font-size: 0;
				position: relative;
				display: inline-block;
				top: 4px;
				left: -35px;
				width: 16px;
				height: 16px;
				background:url(./search.png);
				background-repeat: no-repeat;
				cursor: pointer;
			}
		}
		.content-right{
			float: right;
			margin-top: 10px;
			a{
				margin-right: 10px;
			}
		}
	}
</style>