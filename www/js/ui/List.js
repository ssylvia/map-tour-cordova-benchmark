define([],
function(){

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

	};

	internals.createListItem = function(ftr){
		internals.el.append('<p>' + ftr.attr.name + '</p>');
	};

	return function(options){

		var settings = internals.settings = options;
		var self = internals.self = this;

		this.init = function(){
			internals.createList();
		};

	};

});