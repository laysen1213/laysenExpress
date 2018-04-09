;(function(){
	$.fn.banner = function(){
		var $this = $(this);
		var $li = $this.find("ul li");
		var $length = $li.length;
		var $index = 0;
		var $timer = null;
		var $nowTime = new Date();

		// 遍历active
		var str = '';
		for(var i = 0 ; i < $length ; i++){
			str += "<span></span>";
		}
		var $active = $this.find(".banner_active");
		$active.append(str);
		$active.css({"margin-left" : - parseInt($active.width()) / 2 });

		var $activeSpan = $this.find(".banner_active span");
		$activeSpan.eq(0).addClass("on");
		$activeSpan.on('click' , function(){
			$index = $(this).index();
			play();
		});

		// 下一个
		$(".banner_flex_next").on('click' , function(){
			if(new Date() - $nowTime > 500){
				$index++;
				play();
			}
		});

		//上一个
		$(".banner_flex_prev").on('click' , function(){
			if(new Date() - $nowTime > 500){
				$index--;
				play();
			}
		});

		// 定时器
		function interval(){
			$timer = setInterval(function(){
				$index++;
				play();
			} , 3000);
		}
		interval();

		// 播放开始
		function play(){
			clearInterval($timer);//清除定时器
			interval();//定时器开始
			$nowTime = new Date();
			if($index > $length - 1){
				$index = 0;
			}
			if($index < 0){
				$index = $length - 1;
			}
			$activeSpan.eq($index).addClass("on").siblings().removeClass("on");
			$li.eq($index).fadeIn(800).siblings().fadeOut(800);
		}

	}
})();