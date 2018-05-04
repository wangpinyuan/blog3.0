module.exports = {
	port:3000,
	session:{
		secret:"caicaikan",
		key:"blog",
		maxAge:60*60*24*30*1000, // 一个月
	},
	mongodb:"mongodb://localhost:27017/blog"

}