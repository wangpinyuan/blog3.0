var express = require('express');
var fs = require("fs");
var path = require("path");
var sha1 = require('sha1');
var userModel = require('../model/db').userModel;
var adminRouter = express.Router();
var Err = 0;
var OK = 1;
// 注册
adminRouter.post("/register",function(req,res,next){
	var name = req.body.userName;
	var password1 = req.body.password1;
	var password2 = req.body.password2;
	var avatar = req.body.avatar;
	if (!name || !password1 || !password2 || !avatar || !(password1 === password2)) {
		res.json({"style":Err});
		return;
	}
	var password = sha1(password1);
	var user = new userModel({
		name:name,
		password:password,
		avatar:avatar
	})
	user.save(function(err){
		if(err){
			res.json({"style":Err});
			return;
		}
		delete user.password;
		req.session.user = user;
		return res.json({"style":OK});
	})
}); 
// 登录
adminRouter.post('/login',function(req,res,next){
	var name = req.body.userName;
	var password = req.body.password;

	if (!name || !password) {
		res.json({'style':Err});
		return;
	}
	password = sha1(password);

	userModel.findOne({name:name},function(err,user){
		if (!user || err) {
			res.json({'style':Err});
			return;
		}
		if (user.password === password) {
			delete user.password;
			req.session.user = user;
			res.json({'style':OK});
		}
	})
})
// 检查登陆
adminRouter.post('/checkLogin',function(req,res){
	if (!req.session.user) {
		res.json({'style':Err});
		return; 
	}
	res.json({'style': OK});
})
// 登出
adminRouter.post('/logout',function(req,res){
	req.session.user = null;
	res.json({'style': OK});
})
module.exports = adminRouter;
