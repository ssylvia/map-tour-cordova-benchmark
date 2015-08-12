define(['esri/geometry/Extent'],
	function(Extent){
	
	var internals = {
		config: {}
	};

	internals.config.map = {
		mapConfig: {
			basemap: 'topo',
			extent: new Extent({
				'xmin':-140065.352225403686,
				'ymin':7140686.283501236,
				'xmax':-112548.0220427773,
				'ymax':7181656.530662036,
				'spatialReference':{'wkid':102100,'latestWkid':3857}
			})
		},
		tourLayer: {
			url: 'http://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/greg7281/FeatureServer/0',
			OID: 'F__OBJECTID',
			zoomLevelOnSelect: 15
		},
		zoomExtents: {
			world: {
				buttonText: 'World',
				extent: new Extent({
					'xmin':-14058636.706726082,
					'ymin':-22347190.488346342,
					'xmax':14119109.400313895,
					'ymax':19606342.604357626,
					'spatialReference':{'wkid':102100,'latestWkid':3857}
				}),
				duration: 3000
			},
			home: {
				buttonText: 'Home',
				extent: new Extent({
					'xmin':-140065.352225403686,
					'ymin':7140686.283501236,
					'xmax':-112548.0220427773,
					'ymax':7181656.530662036,
					'spatialReference':{'wkid':102100,'latestWkid':3857}
				}),
				duration: 1000
			},
			pointFast: {
				buttonText: 'In Fast',
				extent: new Extent({
					'xmin':-125634.87731517725,
					'ymin':7163709.952450688,
					'xmax':-125419.8981730957,
					'ymax':7164030.032506675,
					'spatialReference':{'wkid':102100,'latestWkid':3857}
				}),
				duration: 100
			},
			pointSlow: {
				buttonText: 'In Slow',
				extent: new Extent({
					'xmin':-120896.97589004705,
					'ymin':7160326.419620512,
					'xmax':-120681.9967479655,
					'ymax':7160646.4996764995,
					'spatialReference':{'wkid':102100,'latestWkid':3857}
				}),
				duration: 10000
			}
		}
	};

	return internals.config;

});