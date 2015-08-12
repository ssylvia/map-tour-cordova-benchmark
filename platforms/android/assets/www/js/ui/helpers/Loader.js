define(['dojo/text!template/helpers/Loader.html',
	'dojox/dtl'],
	function(LoaderHtml,
		DTL){

	var internals = {};

	internals.createLoader = function(){
		var settings = internals.settings
		
		if (settings.container){
			var template = new DTL.Template(LoaderHtml);
			var context = new DTL._Context(settings);
			var templated = $(template.render(context));

			$(settings.container).html(templated);

			internals.el = templated;
		}
	};

	internals.dismissLoader = function(duration){
		internals.el.fadeOut({
			duration: duration,
			complete: function(){
				$(internals.self).trigger('dismissed');
			}
		});
	};

	return function(options){

		var defaults = {
			text: ''
		};

		var settings = internals.settings = $.extend(true,defaults,options);
		var self = internals.self = this;

		this.init = function(){
			internals.createLoader();
		};

		this.dismiss = function(duration){
			internals.dismissLoader(duration);
		}

	};

});