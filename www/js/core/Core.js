define(['app/core/Data','app/core/Config','app/ui/List','app/ui/Map'],function(Data,Config,List,Map){

	var internals = {
		data: new Data()
	};

	internals.loadList = function(){
		var list = internals.list = new List({
			data: internals.data
		});
		list.init();
	};

	internals.loadMap = function(){
		var map = internals.map = new Map({
			data: internals.data,
			map: Config.map
		});
		map.init();
	};

	internals.loadList();
	internals.loadMap();

});