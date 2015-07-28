define(['app/core/Data','app/core/Config','app/ui/List','app/ui/Map'],function(Data,Config,List,Map){

	var internals = {
		data: new Data()
	};

	function loadList(){
		var list = internals.list = new List({
			data: internals.data
		});
		list.init();
	};

	function loadMap(){
		var map = internals.map = new Map({
			data: internals.data,
			map: Config.map
		});
		map.init();
	};

	loadList();
	loadMap();

});