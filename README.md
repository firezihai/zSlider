zSlider
=========

jquery图片轮播插件

介绍&introduce
=========

此插件实现了淡入淡出和左右上下滚动的动画，并且可以自己对动画进行扩展，为了实现高扩展性，请插件减少了程序中对css的设置。

参数& param
=========

变量(Var)         默认(Default)	    说明(Explain)
itmeWrap          undefined	        包装图片的元素的class(必需)
animate   	      animate	          图片画片(animate,fade)
fadeInTime	      2000	            淡入时间(ms)
fadeOutTime   	  2000	            淡出时间(ms)
direction	        horizontal	      图片滚动方向,vertical重直滚动,horizontal水平滚动,淡入淡出动画无效
showDefNav  	    true	            是否显示程序默认生成的导航
navClass	        nav	              导航class,当要使用自定义导航样式时，可以设置值
navColor    	    #ffffff	          默认导航颜色
navHoerColor	    orange	          导航激活之后的颜色
event          	  mouseover	        导航要绑定的事件类型
showDefControl	  false	            是否显示默认的上下张控制器
controlClass	    control	          包装上下张控制器的元素的class，用于自定义样式，按钮元素必需prevBtn和nextBtn
duration	        3000	            播放频率(ms)
speed	            500	              滚动动画速度(ms)
auto	            true	            自动播放开关
