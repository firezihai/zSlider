/*
* jQuery zSlider幻灯片插件
*
*使本插件，请保留版权信息,如果你修复了本插件的bug信息，请发信一份demo样本给本人.
*www.zihaidetiandi.com/zSlider
*
*Copyright (c) 2014 子海(zihaidetiandi@sina.com)
* 
*Version 1.0
*Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*Date 2014-9-26
*/
(function($,window,document,undefined){
	
	var zSlider = function (element,options){
		this.$element = element;
		this.options = $.extend(true,{
			animate: 'animate',
			direction : 'horizontal',//滚动方向,vertical重直滚动,horizontal水平滚动
			event:"mouseover",
			fadeInTime:2000,
			fadeOutTime:2000,
			showDefNav: true,		//是否使用默认导航
			navClass: 'nav',
			navHoverColor:'orange',	//导航激活之后的颜色
			navColor:'#ffffff',				//导航默认颜色
			showDefControl : false,			//是否显示上一张下一张的控制按钮
			controlClass:'control',
			duration: 3000,		//播放频率
			speed : 500,		//滚动速度
			auto : true						//是否自动播放
		},options);
		this.index = 0;
	}
	
	zSlider.prototype ={
		init : function(){
			var that = this;//储存slider对象
			this.itemWrap = this.$element.find('.'+this.options.itemWrap);
			this.item = this.$element.find('.'+this.options.item);
			this.number = this.item.length;
			this.width = this.item.first().outerWidth();
			this.height =  this.item.first().outerHeight();
			console.log(this.height);
			this.$element.css({'position':'relative'});
			this.itemWrap.css({'position':'absolute',top:'0px',left:'0px'});
			if(this.options.direction == 'horizontal' && this.options.animate == 'animate'){
				this.itemWrap.css({'width':this.width*this.number+'px'});
				this.item.css({'float':'left'});
			}
			/*设置默认的导航*/
			if(this.options.showDefNav){
				this.createNav();
			}
			if(this.options.showDefControl){
				this.$element.append('<div class="'+this.options.controlClass+'"><a href="javascript:;" class="prevBtn"></a><a href="javascript:;"  class="nextBtn"></a></div>');
				var $control = this.$element.find('.'+this.options.controlClass);
				$control.find('a').css({'position':'absolute','width':'40px','height':'40px','cursor':'pointer','background':'orange','opacity':'0.4'});
				var top = this.height*0.4;
				$control.find('.prevBtn').css({'left':'10px','z-index':'4','top':top+'px'});
				$control.find('.nextBtn').css({'right':'10px','z-index':'4','top':top+'px'});
			}
			if(this.options.animate == 'fade'){//如果图片是淡入淡出动画，强制设置第一个图片为显示
				this.item.css({'display':'none'});
				this.item.eq(0).css({'display':'block'});
			}
			/*获取导航元素*/
			if(this.options.showDefNav){
				 this.$nav = this.$element.find('.nav span');
			}else{
				this.$nav =this.$element.find('.'+this.options.navClass).children();
			}
			this.item.mouseover(function(){
					clearInterval(that.$element.timer);
				}).mouseout(function(){
					if(that.options) that.play();
				});
			
			/*上一张下一张*/
			this.prev_and_next('prev');
			this.prev_and_next('next');

			/*绑定事件*/
			this.bind(this.options.event);
			/*是否自动播放*/
			if(this.options.auto)	this.play();
		},
		createNav:function(){
				this.$element.append('<div class="'+this.options.navClass+'"></div>');
				var $nav = this.$element.find('.'+this.options.navClass);
				for(var i =1;i<=this.number;i++){
					$nav.append('<span>●</span>')
				}
				$nav.css({'position':'absolute','z-index':3,'left':'50%','bottom':'20px','text-align':'center','font-size':'0','border-radius':'10px','background-color':' rgba(255,255,255,0.3)','filter': 'alpha(opacity:30)'});
				$nav.find('span').css({'display':'inline-block','font-size':'14px','color':this.options.navColor,'text-decoration':'none','cursor':'pointer','margin':'2px'});
				$nav.find('span:first').addClass('on');
				$nav.find('.on').css({'color':this.options.navHoverColor});
				var nav_margin_left = $nav.width()*(-0.5);//获取导航margin-left的偏移量，必需先设置好span的大小之后在获取,否则获取的将是父素的宽度
				$nav.css({'margin-left':nav_margin_left+'px'});
		},
		/*上一张下一张*/
		prev_and_next: function(type){
			var that = this;//slider对象的this储存起来,以便在jquery的函数中使用
			this.$element.find('.'+this.options.controlClass+' .'+type+'Btn').click(function(event){
					if(type =='prev'){
						that.index--;
					}else if(type == 'next'){
						that.index++;
					}
					clearInterval(that.$element.timer);
					that.sliderNext();
			});
		},
		bind:function(type){
			var that = this;
			this.$nav.bind(type,function(){
						that.index = that.$nav.index(this);//当前this指向的导航元素对象,例如span对象
						if(that.options.showDefNav){
							that.$nav.removeClass('on').css({'color':that.options.navColor});
							that.$nav.eq(that.index).addClass('on').css({'color':that.options.navHoverColor});
						}else{
							that.$nav.removeClass('on');
							that.$nav.eq(that.index).addClass('on')
						}
						$(that.itemWrap).stop();//停止当前所有动面，如果没有这一句，在快速切换导航时，图片将一直切换,直到所有动画执行完并，造成效果不佳。
						
						that[that.options.animate]();//图片动画
						clearInterval(that.$element.timer);
			}).mouseout(function(){
						if(that.options.auto){
							that.play();
						}
			})
		},
		sliderNext:function(){
			if(this.index >= this.number){
				this.index =0;
			}
			if(this.index <0){
				this.index= this.number-1;
			}
			if(this.options.showDefNav){//是否使用默认导航
				this.$nav.removeClass('on').css({'color':this.options.navColor});
				this.$nav.eq(this.index).addClass('on').css({'color':this.options.navHoverColor});
			}else{
				this.$nav.removeClass('on');
				this.$nav.eq(this.index).addClass('on')
			}
			this[this.options.animate]();//图片动画
		},
		play : function(){
				var that = this;//setInterval中的this是指向window对象，所以也要储存起来，以便在setInterval中使用
				if(this.$element.timer)clearInterval(this.$element
				.timer);
				this.$element.timer = setInterval(function(){
					that.index++
					that.sliderNext();
				},this.options.duration);
		},

		animate:function(){
			var that= this;
			if(that.options.direction == 'vertical'){
				$(that.itemWrap).animate({
						top: -that.height*that.index+'px'
				},that.options.speed);
			}else{
				$(that.itemWrap).animate({
						left: -that.width*that.index+'px' 
				},that.options.speed);
			}
		},
		fade:function(){
			
			this.itemWrap.children(':visible').stop().fadeOut(this.options.fadeOutTime);
			this.item.eq(this.index).stop().fadeIn(this.options.fadeInTime);
		}
	}
	$.fn.zSlider = function(options){
		var obj = new zSlider(this,options);
		return obj.init();
	}
})(jQuery,window,document)