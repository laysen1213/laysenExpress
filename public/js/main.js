$(function(){
	var header = $("#header");
	if($("#nav a.on").length <= 0){
		$("#nav a").eq(0).addClass("on");
	}
	var navWidht = $("#nav a.on").outerWidth();
	var navLeft = $("#nav a.on").position().left;
	var line_nav = $("#nav .nav_line");
	line_nav.css({width : navWidht , left : navLeft});
	// 弹性跟随
	$("#nav a").hover(
		function(){
			var navWidht = $(this).outerWidth();
			var navLeft = $(this).position().left;
			line_nav.stop().animate({
				width : navWidht,
				left : navLeft},
				{duration : 1500 , easing : "easeOutElastic"}
			);
		},
		function(){
			line_nav.stop().animate({
				width : navWidht,
				left : navLeft},
				{duration : 1500 , easing : "easeOutElastic"}
			);
		}
	);

	// section1
	var section1_li = $(".section1_ul li");
	var section1_box = $(".section1 .section1_box");
	var $height = $(".section1_ul li").height();//230
	var $width = $(".section1_ul li").width();//230
	// 鼠标跟随
	$(".section1_ul li").hover(function(e){
		section1_box.css({
			"left" : this.offsetLeft ,
			"top" : this.offsetTop
		});
	});

});

