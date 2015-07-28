define([],function(){

	var internals = {
		features: [],
		publicMethods: {}
	};

	internals.updateFeatures = function(add){
		$.each(add,function(){
			internals.features.push(this);
			
			$(internals.self).trigger({
				type: 'new-feature',
				feature: this
			});
		});
	};

	return function(){
		var self = internals.self = this;

		this.addFeatures = function(features){
			internals.updateFeatures(features);
		};

		this.getFeatures = function(){
			return internals.features;
		}
	};

});