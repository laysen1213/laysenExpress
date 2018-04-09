var L = {
    post : function (url , data , callback){
        if(!url) return false;
        data = data || {};
        data = formatParams(data);
        callback = callback || function(){}
        //创建一个ajax对象
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { 
            //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open('POST',url,true);    
        xhr.onreadystatechange = function(event){    
            //对ajax对象进行监听
            if(xhr.readyState == 4 && xhr.status == 200){    
                callback(JSON.parse(xhr.responseText));
            }
        };
        //建立连接，参数一：发送方式，二：请求地址，三：是否异步，true为异步
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');    
        xhr.send(data);        
    },
    id : function(val){
        val = val || '';
        return val ? document.getElementById(val) : '';
    },
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    // 添加一个随机数，防止缓存  
    arr.push('v=' + random()); 
    return arr.join("&");
}

// 获取随机数
function random() {  
    return Math.floor(Math.random() * 10000 + 500);  
}

// 打印日记
function log(msg){
    console.log(msg);
}

// 读取cookie
function getCookie(name){
    var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}

//写入cookies
function setCookie(name , value ,days){
    days = days || 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + days*24*3600*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}

// 删除cookie
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval != null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
}

//H5 localStorage存储数据
//设置数据
function setStorage(_key, val){
    localStorage[_key] = val;
}

//清除数据
function clearStorage(_key) {
    localStorage.removeItem(_key);
}

//获取数据
function getStorage(_key) {
    return localStorage[_key];
}

// 验证码倒计时
function time(o,wait){
    if(wait == 0) {
        o.removeAttribute("disabled");          
        o.value="获取验证码";
        wait = wait;
    }else{
        o.setAttribute("disabled", true);
        o.value="" + wait + "s";
        wait--;
        setTimeout(function(){time(o,wait)},1000)
    }
}

function get_href(setor){
    setor = setor || '?';
    var href = location.href.split(setor);
    return href.length > 1 ? href[href.length - 1] : '';
}

function search_submit(){
    L.id("search_submit").onclick = function(){
        var val = L.id("search_input").value;
        var url = this.getAttribute("data-url");
        window.location.href = url + '?' + val;
    }
}
