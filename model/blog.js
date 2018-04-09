var db = require('./../conf/database');

var model = {
	blogList (callback , search) {
		var sql = 'select a.*,b.name from pt_blog a LEFT JOIN pt_blog_cate b on a.cid = b.id where a.status = 1 ';
		if(search){
			sql += 'and a.title like "%'+search+'%" ';
		}
		sql += 'limit 8';
		db.sqlQuery(sql , rs => {
			callback(rs);
		})
	},
	blogDetail (id , callback) {
		var sql = 'select a.*,b.name from pt_blog a LEFT JOIN pt_blog_cate b on a.cid = b.id where a.status = 1 and a.id = ' + id + ' limit 1';
		db.sqlQuery(sql , rs => {
			callback(rs[0]);
		})
	},
	tjList (callback) {
		var sql = 'select * from pt_blog where status = 1 and is_recommend = 1 limit 8';
		db.sqlQuery(sql , rs => {
			callback(rs);
		})
	},
}

module.exports = model;
