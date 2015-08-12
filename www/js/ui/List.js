define(['dojo/text!template/ListItem.html',
	'dojox/dtl'],
function(ListItemHtml,
	DTL){

	var internals = {
		el: $('.list')
	};

	internals.createList = function(){

		var tourPoints = internals.settings.data.getFeatures();

		$.each(tourPoints,function(){
			internals.createListItem(this);
		});

		$(internals.settings.data).on('new-feature',function(e){
			internals.createListItem(e.feature);
		});

		$(internals.self).trigger('load');

	};

	internals.createListItem = function(ftr){
		var template = new DTL.Template(ListItemHtml);
		var context = new DTL._Context(ftr);
		var templated = $(template.render(context));

		internals.el.append(templated);

		templated.click(function(){
			internals.settings.data.selectFeature(ftr.graphic.id);
		});

		if (internals.selectOnCreation && ftr.graphic.id === internals.selectOnCreation.graphic.id){
			internals.selectListItem(internals.selectOnCreation);
		}
	};

	internals.selectListItem = function(ftr){
		internals.selectOnCreation = false;
		var items = internals.el.find('.list-item');
		var selected = internals.el.find('.list-item[data-id=' + ftr.graphic.id + ']');

		items.removeClass('active');
		
		if (selected.length > 0){
			selected.addClass('active');

			var scrollPos = internals.el.scrollTop();
			var paneHeight = internals.el.height();
			var selectedTop = selected.position().top;
			var selectedHeight = selected.height();

			if (selectedTop < 0){
				internals.el.scrollTop(scrollPos + selectedTop);
			}
			else if (selectedTop + selectedHeight > paneHeight){
				internals.el.scrollTop(scrollPos + selectedTop - paneHeight + selectedHeight);
			}
		}
		else{
			internals.selectOnCreation = ftr;
		}
	};

	return function(options){

		var defaults = {};

		var settings = internals.settings = $.extend(true,defaults,options);
		var self = internals.self = this;

		this.init = function(){
			internals.createList();
		};

		$(settings.data).on('select',function(e){
			internals.selectListItem(e.feature);
		});

	};

});