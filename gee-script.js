var polygons = ee.FeatureCollection("projects/epflipeo/assets/LEM_ROI"); 

var startDate = '2020-01-01'; 
var endDate = '2020-03-30';   


var images = ee.ImageCollection("COPERNICUS/S2")
                .filterBounds(polygons) 
                .filterDate(startDate, endDate) 
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)); 

var dateList = images.aggregate_array('system:time_start')
                      .map(function(time) {
                        return ee.Date(time).format('YYYY-MM-dd');
                      });

print("Available Dates:", dateList);

dateList.evaluate(function(dates) { 
  dates.forEach(function(date) {
    var image = images.filterDate(date, ee.Date(date).advance(1, 'day'))
    .median();

    var clippedImage = image.clip(polygons);

    Map.addLayer(clippedImage, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Clipped Image ' + date);

    Export.image.toDrive({
      image: clippedImage,
      description: 'Sentinel2_Clipped_' + date,
      folder: 'EarthEngineExports', 
      scale: 20, 
      region: polygons.geometry().bounds(),
      maxPixels: 1e13 
    });
  });
});

Map.centerObject(polygons, 10); 