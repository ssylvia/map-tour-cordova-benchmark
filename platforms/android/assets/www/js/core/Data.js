define([],function(){

	var internals = {
		features: [],
		publicMethods: {}
	};

	return function(){
		var self = internals.self = this;

		this.addFeatures = function(features){
			updateFeatures(features);
		};

		this.getFeatures = function(){
			return internals.features;
		}
	};

	function updateFeatures(add){
		$.each(add,function(){
			internals.features.push(this);
			
			$(internals.self).trigger({
				type: 'new-feature',
				feature: this
			});
		});
	}

});