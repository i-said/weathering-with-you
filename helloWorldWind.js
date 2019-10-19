var wwd = new WorldWind.WorldWindow("canvasOne");
wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
// wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);

var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
var position = new WorldWind.Position(35.0, 135.0, 100.0);
var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);
placemark.label = "Placemark\n" +
    "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon " + placemark.position.longitude.toPrecision(5).toString();
placemark.alwaysOnTop = true;
placemarkLayer.addRenderable(placemark);

var position2 = new WorldWind.Position(34.1, 135.1, 100.0);
var placemark2 = new WorldWind.Placemark(position2, false, placemarkAttributes);
placemark2.label = "Placemark\n" +
    "Lat " + placemark2.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon " + placemark2.position.longitude.toPrecision(5).toString();
placemark2.alwaysOnTop = true;
placemarkLayer.addRenderable(placemark2);

wwd.addLayer(placemarkLayer);


var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
// var layerName = "MOD_LSTD_CLIM_M";
var layerName = "MOP_CO_M";

var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
};


$.get(serviceAddress).done(createLayer);

console.log("layers!!")
console.log(wwd.layers)

var layers = wwd.layers;
for(var i in layers){
    var removeBtn = "<button onClick='clickRemoveLayer()' value='" + layers[i].displayName + "' class='ui button'>" + layers[i].displayName +" remove</button>"
    var itemList = "<div class='item'>"+ removeBtn +"</div>"
    $("#layers-option").append(itemList)
}



var clickRemoveLayer = (ev) => {
    console.log("clicked!! clickremovelayer");
    displayName = "Carbon Monoxide (1 month - Terra/MOPITT)";
    selectedLayer = getMatchLayerFromLayers(displayName);
    console.log("selectedLayers", selectedLayer);

    if(selectedLayer) {
        console.log("selected layer is exist")
        wwd.removeLayer(selectedLayer);
    }
}


var getMatchLayerFromLayers = (displayName) => {
    console.log("get match layers from layers func")
    var allLayers = wwd.layers;
    for(var i in allLayers) {
        console.log(allLayers[i].displayName)
        matches = allLayers[i].displayName === displayName
        console.log(matches)
        if (allLayers[i].displayName === displayName) {
            return allLayers[i]
        }
    }
    return null;
}














