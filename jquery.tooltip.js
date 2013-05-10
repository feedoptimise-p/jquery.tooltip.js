/*
 * 	ToolTip 1.0 - jQuery plugin
 *	written by Marcin Rosinski	
 *
 *	Copyright (c) 2012 Marcin Rosinski (http://www.33concept.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

(function($) {

	$.fn.tooltip = function(options){
	  
		var $tip 		= $('<div class="jqTooltip" style="box-shadow: 0 0 5px #aaa;border:1px solid #333;padding:5px;line-height:140%;z-index:1001;background:#333;color:#fff;font-size:11px;max-width:400px;display:none;position:absolute;top:0;left:0"></div>');
		var $tipArr		= $('<div class="jqTooltiparr" style="display:none;border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #333;border-top-color:#333;position:absolute;top:0;left:0;z-index:1001;"></div>');
		
		var defaults = {	
			fadeInTime:100,
			fadeInStartOpacity:0.5
		}; 
		
		var options = $.extend(defaults, options);  
		
		function show(id,$elem)
		{
			var w = $elem.outerWidth(true);
			
			$tip = $('#jqTip'+id), $arr = $('#jqTiparr'+id);
			
			$tip.css({
				top:$elem.offset().top-$tip.outerHeight(true)-5,
				left:$elem.offset().left-((($tip.outerWidth(true)/2)-(w/2))),
				opacity: defaults.fadeInStartOpacity
			}).show().animate({top:$tip.offset().top-5,opacity:1},defaults.fadeInTime);
			
			$arr.css({
				top:$elem.offset().top-$arr.outerHeight(true),
				left:$elem.offset().left-((($arr.outerWidth(true)/2)-(w/2)))
			}).css({ opacity: 0.5 }).show().animate({top:$arr.offset().top-4,opacity:1},defaults.fadeInTime);
		}
		
		function hide(id)
		{
			$('#jqTip'+id).stop().hide();
			$('#jqTiparr'+id).stop().hide();
		}
		
		function injectTip(id,data)
		{
			$tip.attr('id','jqTip'+id).html(data);
			$tipArr.attr('id','jqTiparr'+id);
			
			$('body').append($tip,$tipArr);
		}
		
		function isTip(id)
		{
			return $('#jqTip'+id).length;
		}
		
		this.each(function() {  
			if(!$(this).attr('title')) return;
			
			var id = $(this).attr('title');
			id = id.replace(/[^0-9A-Za-z]/g,'').toLowerCase();
			
			if(!isTip(id)){injectTip(id,$(this).attr('title'));}
			
			$(this).attr('title','');
			
			$(this).bind('mouseenter',function(){
				show(id,$(this));
			}).bind('mouseleave',function(){
				hide(id);
			});
		});
	  
	};

})(jQuery);



