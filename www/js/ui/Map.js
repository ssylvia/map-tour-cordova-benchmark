define(['esri/Map',
	'esri/views/MapView',
	'esri/geometry/Point',
	'esri/layers/FeatureLayer',
	'esri/renderers/UniqueValueRenderer',
	'esri/symbols/PictureMarkerSymbol',
	'dojo/domReady!'],
function(Map,
	MapView,
	Point,
	FeatureLayer,
	UniqueValueRenderer,
	PictureMarkerSymbol){

	var internals = {};

	internals.createMap = function(){
		var map = internals.map = new Map(internals.settings.map.mapConfig);

		var mapView = internals.mapView = new MapView({
			container: document.getElementsByClassName('map')[0],
			map: internals.map
		});

		var tourPointMapView = internals.mapView = new MapView({
			container: document.getElementsByClassName('map-pane')[0],
			map: internals.map
		});

		

		window.mv = tourPointMapView;

		var tourLayer = internals.tourLayer = new FeatureLayer({
			url: internals.settings.map.tourLayer.url,
      outFields: ['*'],
      renderer: new UniqueValueRenderer(null, internals.settings.map.tourLayer.OID)
		});

		map.add(tourLayer);

		map.on('load',function(){
			$(internals.self).trigger('load');
		});
		
		tourLayer.on('graphics-controller-create',function(e){
			internals.layerLoaded(e.graphicsController.graphicsCollection);
		});


		// Zoom Buttons
		$.each(internals.settings.map.zoomExtents,function(){
			var self = this;
			var button = $('<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"">'+ this.buttonText +'</button>');
			$('.zoom-buttons').append(button);
			componentHandler.upgradeElement(button[0]);
			button.on('click',function(){
				mapView.animateTo(self.extent,{duration:self.duration});
			});
		});

	};

	internals.layerLoaded = function(data){
		data.on('change',function(e){
			e.added.forEach(function(graphic){
				internals.graphicAdd(graphic, data.indexOf(graphic));
			});
		});
	};

	internals.graphicAdd = function(graphic,index){
		var iconUrl = 'http://www.arcgis.com/apps/MapTour/resources/markers/red/NumberIcon' + (index+1) + '.png';
		
		internals.tourLayer.renderer.addValue({
			value: graphic.attributes[internals.settings.map.tourLayer.OID],
			symbol: new PictureMarkerSymbol(iconUrl,22,28)
		});



		var ftr = {
			iconUrl: iconUrl,
			graphic: graphic,
			attr: graphic.attributes
		};

		internals.settings.data.addFeatures([ftr]);
	};

	internals.zoomToSelected = function(ftr){
		// internals.mapView.animateTo({
		// 	center: [ftr.graphic.geometry.longitude,ftr.graphic.geometry.latitude],
		// 	zoom:14
		// },{
		// 	duration:4000
		// });
	};

	return function(options){

		var defaults = {};

		var settings = internals.settings = $.extend(true,defaults,options);
		var self = internals.self = this;

		this.init = function(){
			internals.createMap()
		};

		$(settings.data).on('select',function(e){
			internals.zoomToSelected(e.feature);
		});

	};

});