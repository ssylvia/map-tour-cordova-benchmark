define(['app/core/Data',
	'app/core/Config',
	'app/ui/helpers/Loader',
	'app/ui/List',
	'app/ui/Map',
	'app/ui/TourPoint'],
	function(Data,
		Config,
		Loader,
		List,
		Map,
		TourPoint){

	var internals = {
		data: new Data(),
		loadedComponents: {
			list: false,
			map: false,
			tourPoint: false
		}
	};

	internals.loadLoader = function(){
		var loader = internals.loader = new Loader({
			container: $('.loading-pane').get(0)
		});
		loader.init();
	};

	internals.loadList = function(){
		var list = internals.list = new List({
			data: internals.data
		});
		$(list).on('load',function(){
			internals.loadedComponents.list = true;
			internals.appReady();
		});
		list.init();
	};

	internals.loadMap = function(){
		var map = internals.map = new Map({
			data: internals.data,
			map: Config.map
		});
		$(map).on('load',function(){
			internals.loadedComponents.map = true;
			internals.appReady();
		});
		map.init();
	};

	internals.loadTourPoint = function(){
		var tourPoint = internals.tourPoint = new TourPoint({
			data: internals.data
		});
		$(tourPoint).on('load',function(){
			internals.loadedComponents.tourPoint = true;
			internals.appReady();
		});
		tourPoint.init();
	};

	internals.appReady = function(){
		var ready = internals.checkReadyState();

		if (ready){
			$('.loading-pane').fadeOut({
				complete: function(){
					internals.loader.dismiss();
				}
			});
		}
	};

	internals.checkReadyState = function(){
		var ready = true;
		var components = internals.loadedComponents;

		for (var i in components){
			if(!components[i]){
				ready = false;
			}
		}

		return ready;
	};

	(function(){
		internals.loadLoader();
		internals.loadList();
		internals.loadMap();
		internals.loadTourPoint();
	})();

});