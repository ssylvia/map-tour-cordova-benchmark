define([],function(){
	
	var internals = {
		config: {}
	};

	internals.config.map = {
		basemap: 'satellite',
		tourLayer: {
			url: 'http://services.arcgis.com/5ezSArT0CtxPBUtW/arcgis/rest/services/DCWTS/FeatureServer/0'
		}
	};

	return internals.config;

});