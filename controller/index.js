var express = require('express');
var router = express.Router();

var model = require('./../model/blog');
const h = 'http://m.91laysen.cn'

var URL = require('url');

// 首页
router.get('/', function(req, res, next) {
    model.blogList(rs => {
        for(var i in rs){
            rs[i].ctime = timetrans(rs[i].ctime);
        }
        console.log(rs)
        res.render('index',{
            list : rs,
            h: h,
            nav:1
        })
    });
});

// 列表页
router.get('/blog', function(req, res, next) {
    var params = URL.parse(req.url, true).query;
    var search = params.search || '';
	model.blogList(rs => {
        for(var i in rs){
            rs[i].ctime = timetrans(rs[i].ctime);
        }
        model.tjList(tj => {
            for(var i in tj){
                tj[i].ctime = timetrans(tj[i].ctime);
            }
            res.render('blog',{
                list : rs,
                tj:tj,
                h: h,
                nav:2,
                search:search
            })
        });
    } , search);
});

// 详情页
router.get('/detail', function(req, res, next) {
    var params = URL.parse(req.url, true).query;
    model.blogDetail(params.id , rs => {
        rs.ctime = timetrans(rs.ctime);
        model.tjList(tj => {
            for(var i in tj){
                tj[i].ctime = timetrans(tj[i].ctime);
            }
            res.render('detail',{
                info : rs,
                tj:tj,
                nav:2
            })
        });
    });
});

function timetrans(date){
    var date = new Date(date*1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    // return Y+M+D+h+m+s;
    return Y+M+D;
}

module.exports = router;
