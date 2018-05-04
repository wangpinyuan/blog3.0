var express = require('express');
var path = require('path');
var config = require("./config");// 处理配置文件
var session = require("express-session");// 处理session cookie
var MongoStore = require('connect-mongo')(session);// 将session存到mongoDB
var bodyParser = require("body-parser");// 解析提交内容
var postRoutes = require("./router/postRoutes");
var adminRoutes = require("./router/adminRoutes");
var apiRoutes = require("./router/apiRoutes");

var port = config.port;
var app = express();

// app.use(express.static(path.join(__dirname, '../build')));
app.set("views",path.join(__dirname,"/public"));
app.set("view engine","ejs");
// 中间件session
app.use(session({
	name:config.session.key,
	secret:config.session.secret,
	cookie:{
		maxAge:config.session.maxAge
	},
	store:new MongoStore({
		url:config.mongodb
	})
}));

// 中间件解析form提交
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use("/post",postRoutes);
app.use('/admin',adminRoutes);
app.use('/api',apiRoutes);

app.use(function (req, res) {
  if (!res.headersSent) {
    res.status(404).render('404',{title:'Amumu\'s Blog'});
  }
});

app.listen(port,function(){
	console.log(`listen on port ${port} **************`);
})
