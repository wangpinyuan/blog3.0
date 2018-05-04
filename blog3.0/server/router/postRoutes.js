var express = require('express');
var path = require("path");
var sha1 = require('sha1');
var postModel = require('../model/db').postModel;
var groupModel = require('../model/db').groupModel;
var moment = require('moment');

var postRoutes = express.Router();
var Err = 0;
var OK = 1;
// 主页
postRoutes.get('/posts',function(req,res){
	postModel.find({}).sort({ date: -1 }).exec(function(err,posts){
		if (err) {
			res.json({'style':Err});
			return;
		}
		res.json({'style':OK,"posts":posts});
	})
});
// title: String,
// author: String,
// content: String,
// group: String,
// date: Date,
// pv: Number
postRoutes.post("/create",function(req,res){
	var title = req.body.title;
	var desc = req.body.desc;
	var author = '王品源';
	var content = req.body.content;
	var group = req.body.group;
	var dateObject = new Date();
	var date = moment(dateObject).format('YYYY-MM-DD HH:mm:ss');
	// var pv = 0;
	if (!title || !desc || !content || !group || !date) {
		res.json({"style":Err});
		return;
	}
	var post = new postModel({
		title,
		desc,
		author,
		content,
		group,
		date
	})
	post.save(function(err){
		if(err){
			res.json({"style":Err});
			return;
		}
		return res.json({"style":OK});
	})

});
// 文章页
postRoutes.get('/post',function(req,res){
	const postId = req.query.id;
	postModel.findOne({_id:postId},function(err,post){
		if (err || !post) {
			res.json({"style":Err})
			return;
		}
		return res.json({"style":OK,"post":post});
	});
});
// 编辑
postRoutes.post('/edit',function(req,res){
	var id = req.body._id;
	var title = req.body.title;
	var desc = req.body.desc;
	var author = req.body.author;
	var content = req.body.content;
	var group = req.body.group;
	// var dateObject = new Date();
	// var date = moment(dateObject).format('YYYY-MM-DD HH:mm:ss');

	if (!title || !desc || !content || !group) {
		res.json({"style":Err});
		return;
	}
	var conditions = {
		_id:id
	}
	var options = {
		$set: {
			title: title,
			desc: desc,
			author: author,
			content: content,
			group: group,
			// date: date
		}
	}
	postModel.update(conditions,options,function(err){
		if (err) {
			res.json({"style":Err});
			return;
		}
		return res.json({"style":OK});
	})
});
// 添加分组
postRoutes.post("/createGroup",function(req,res){
	var group = req.body.group;
	if (!group) {
		res.json({"style":Err});
	}
	var groups = new groupModel({
		group
	})
	groups.save(function(err){
		if(err){
			res.json({"style":Err});
			return;
		}
		
		return res.json({"style":OK});
	})
});
// 删除分组
postRoutes.post("/deleteGroup",function(req,res){
	var group = req.body.group;
	if (!group) {
		res.json({"style":Err});
		return;
	}
	groupModel.remove({group:group},function(err){
		if(err){
			res.json({"style":Err});
			return;
		}
		return res.json({"style":OK});
		
	})
});
// 删除文章
postRoutes.post("/deleteArtical",function(req,res){
	var postId = req.body.id;
	if (!postId) {
		res.json({"style":Err});
		return;
	}
	postModel.remove({_id:postId},function(err){
		if(err){
			res.json({"style":Err});
			return;
		}
		return res.json({"style":OK});
	})
});
module.exports = postRoutes;
