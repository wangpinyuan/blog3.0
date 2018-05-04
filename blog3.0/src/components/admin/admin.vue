<template>
	<div class="admin">
		<div class="content-wrapper">
			<router-view></router-view>
		</div>
	</div>
</template>
<style lang="less">
.admin{
	height: 100%;	
	.content-wrapper{
		margin-top: 100px;
		display: flex;
		justify-content: center; 
		align-items: center;
	}
}
</style>