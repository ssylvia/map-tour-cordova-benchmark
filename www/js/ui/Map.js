define(['esri/Map',
	'esri/views/MapView',
	'esri/layers/FeatureLayer',
	'esri/renderers/UniqueValueRenderer',
	'esri/symbols/PictureMarkerSymbol',
	'dojo/domReady!'],
function(Map,
	MapView,
	FeatureLayer,
	UniqueValueRenderer,
	PictureMarkerSymbol){

	var internals = {};

	internals.createMap = function(){
		var map = internals.map = new Map({
			basemap: internals.settings.map.basemap
		});

		var mapView = internals.mapView = new MapView({
			container: document.getElementsByClassName('map')[0],
			map: internals.map
		});

		var tourLayer = internals.tourLayer = new FeatureLayer({
			url: internals.settings.map.tourLayer.url,
      outFields: ['*'],
      renderer: new UniqueValueRenderer(null, 'objectid')
		});

		map.add(tourLayer);
		
		tourLayer.on('graphics-controller-create',function(e){
			internals.layerLoaded(e.graphicsController.graphicsCollection);
		});
	}

	internals.layerLoaded = function(data){
		data.on('change',function(e){
			e.added.forEach(function(graphic){
				internals.graphicAdd(graphic, data.indexOf(graphic));
			});
		});
	}

	internals.graphicAdd = function(graphic,index){
		var iconUrl = 'http://www.arcgis.com/apps/MapTour/resources/markers/red/NumberIcon' + (index+1) + '.png';
		
		internals.tourLayer.renderer.addValue({
			value: graphic.attributes.objectid,
			symbol: new PictureMarkerSymbol(iconUrl,22,28)
		});

		var ftr = {
			iconUrl: iconUrl,
			graphic: graphic,
			attr: graphic.attributes
		};

		internals.settings.data.addFeatures([ftr]);
	}

	return function(options){

		var settings = internals.settings = options;
		var self = internals.self = this;

		this.init = function(){
			internals.createMap()
		};

	};

});