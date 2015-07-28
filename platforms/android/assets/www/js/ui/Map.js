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

	return function(options){

		var settings = internals.settings = options;
		var self = internals.self = this;

		this.init = function(){
			createMap()
		};

	};

	function createMap(){
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
			layerLoaded(e.graphicsController.graphicsCollection);
		});
	}

	function layerLoaded(data){
		data.on('change',function(e){
			e.added.forEach(function(graphic){
				graphicAdd(graphic, data.indexOf(graphic));
			});
		});
	}

	function graphicAdd(graphic,index){
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

});