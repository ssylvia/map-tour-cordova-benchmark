define([],
function(){

	var internals = {
		el: $('.list')
	};

	return function(options){

		var settings = internals.settings = options;
		var self = internals.self = this;

		console.log(settings);

		this.init = function(){
			createList();
		};

	};

	function createList(){

		var tourPoints = internals.settings.data.getFeatures();

		$.each(tourPoints,function(){
			createListItem(this);
		});

		$(internals.settings.data).on('new-feature',function(e){
			createListItem(e.feature);
		});

	};

	function createListItem(ftr){
		internals.el.append('<p>' + ftr.attr.name + '</p>');
	}

});