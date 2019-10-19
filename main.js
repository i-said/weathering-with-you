// Add a placemark
var placemarkLayer = new WorldWind.RenderableLayer();
wwd.addLayer(placemarkLayer);

var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

var position = new WorldWind.Position(35.681236, 139.767125, 100.0);
var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

placemark.label = "Placemark\n" +
    "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon " + placemark.position.longitude.toPrecision(5).toString();
placemark.alwaysOnTop = true;

placemarkLayer.addRenderable(placemark);

wwd.redraw();
wwd.goTo(new WorldWind.Position(35.681236, 139.767125, 10000.0));
