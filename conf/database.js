var util = require('util');
var prefix = 'pt_';
var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'ngwse9d2FH12412fsFd',
	database : 'laysen'
});

function where_fun(where){
	var _WHERE = '';
    if(util.isObject(where)){
        _WHERE += 'WHERE ';
        for(var k in where){
            _WHERE += k + "='" + where[k] + "' AND ";
        }
        _WHERE = _WHERE.slice(0,-4);
    }else if(typeof where =='string'){
        _WHERE = 'WHERE ' + where;
    }
    return _WHERE;
}

function params_fun(params){
	var fields = '';
    var values = '';
    for(var k in params){
        fields += k + ',';
        values = values + "'" + params[k] + "',"
    }
    fields = fields.slice(0,-1);
    values = values.slice(0,-1);
    return {fields:fields,values:values};
}

// connection.connect();
var db = {
    sqlQuery (sql , callback) {
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    },
    find (table , where , callback) {
        // whre is arr; {id:1},{username:admin};
        var _WHERE = where_fun(where);
        var sql = "SELECT * FROM " + prefix+table + ' ' + _WHERE + ' LIMIT 1';
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    },
    page (table , where , limit , callback){
        // whre is arr; {id:1},{username:admin};
        var _WHERE = where_fun(where);
        var sql = "SELECT * FROM " + prefix+table + ' ' + _WHERE + ' limit ' + limit;
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    },
    all (table , where , callback){
        // whre is arr; {id:1},{username:admin};
        var _WHERE = where_fun(where);
        var sql = "SELECT * FROM " + prefix+table + ' ' + _WHERE;
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    },
    add (table , params , callback){
        // {username:'guojikai',age:'55',sex:'1'}
        res = params_fun(params);
        var sql = "INSERT INTO "+ prefix + table + '('+res.fields+') VALUES('+res.values+')';
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    },
    del (table , where , callback){
        // {username:'guojikai',age:'55',sex:'1'}
        var _WHERE = where_fun(where);
        var sql = "DELETE FROM "+ prefix + table + ' ' + _WHERE;
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    },
    update (table , params , where , callback){
        var _SETS='';
        for(var k in params){
            _SETS += k + "='" + params[k] + "',";
        }
        _SETS = _SETS.slice(0,-1);

        var _WHERE = where_fun(where);
        var sql = "UPDATE " + prefix + table + ' SET ' + _SETS + ' ' + _WHERE;
        connection.query(sql,function (err, result) {
            if(err){
                callback(err.message)
                return;
            }
            callback(result)
        });
    }
}

module.exports = db
// connection.end();
