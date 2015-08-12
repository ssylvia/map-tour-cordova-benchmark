define([],function(){

	var internals = {
		features: [],
		selected: false,
	};

	internals.updateFeatures = function(add){
		$.each(add,function(){
			internals.features.push(this);

			if (!internals.selected){
				internals.selectFeature(this);
			}
			
			$(internals.self).trigger({
				type: 'new-feature',
				feature: this
			});
		});
	};

	internals.selectFeature = function(feature){
		var previous = internals.previous = internals.selected;
		var selected = internals.selected = feature;

		$(internals.self).trigger({
			type: 'select',
			feature: feature
		});
	};

	return function(){
		var self = internals.self = this;

		this.addFeatures = function(features){
			internals.updateFeatures(features);
		};

		this.getFeatures = function(){
			return internals.features;
		};

		this.getSelected = function(){
			return internals.selected;
		};

		this.selectFeature = function(id){
			$.each(internals.features,function(){
				if (this.graphic.id === id){
					internals.selectFeature(this);
				}
			});
		}
	};

});