define(['dojo/text!template/TourPointText.html',
	'dojox/dtl'],
	function(TourPointTextHtml,
		DTL){

		var internals = {
			pictureEl: $('.tour-point .photo-pane'),
			textEl: $('.tour-point .text-pane')
		};

		internals.updateTourPoint = function(ftr){

			internals.pictureEl.css({
				'background-image': 'url(' + ftr.attr.pic_url + ')'
			});

			var template = new DTL.Template(TourPointTextHtml);
			var context = new DTL._Context(ftr);
			var templated = $(template.render(context));

			internals.textEl.html(templated);

		};

		return function(options){

			var defaults = {};

			var settings = internals.settings = $.extend(true,defaults,options);
			var self = internals.self = this;

			this.init = function(){
				var selected = settings.data.getSelected();
				if (selected){
					internals.updateTourPoint(selected);
				}

				$(self).trigger('load');
			};

			$(settings.data).on('select',function(e){
				internals.updateTourPoint(e.feature);
			});

		};

});