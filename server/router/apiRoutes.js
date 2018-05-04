var express = require('express');
var userModel = require('../model/db').userModel;
var groupModel = require('../model/db').groupModel;
var apiRoutes = express.Router();

const Err = 0;
const OK = 1;

apiRoutes.get('/userInfo',function(req,res){
	userModel.findOne({name:'王品源'},function(err,user){
		res.json({
			'style': OK,
			'user':user
		})
	})
});

apiRoutes.get('/groupInfo',function(req,res){
	groupModel.find({},function(err,doc){
		var groups = [];
		doc.forEach(function(val,index,arr){
			groups.push(val.group);
		})
		res.json({
			'style': OK,
			'groups':groups
		});
	})
});



module.exports = apiRoutes;