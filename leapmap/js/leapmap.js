var map;
var leftHandPrev;
var separationStart;
var MAX_ZOOM = 22;
var SEPARATION_SCALING = 1.25;
var constLeftHand = 0;
var constRightHand = 1;
var marker;
var infowindow;
var X = 0,
    Y = 1,
    Z = 2;

// Callback
function move(frame) {
    //Checks if the leap has finished connecting to the websocket and if any gesture has been made
    if (frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(function (gesture) {

            if ( gesture.type == "keyTap" ) {
                zoom(frame, gesture);
            }
            
        }); // end loop

    } // end if
    
    drawHands(frame);

    // if hand is grabbing
    if (frame.hands.length > 0 && isGripped(frame.hands[constLeftHand])) {
        var leftHand = frame.hands[constLeftHand];

        if (leftHandPrev == null)
        {
            leftHandPrev = leftHand;
            return;
        }

        var dX = leftHandPrev.stabilizedPalmPosition[X] - leftHand.stabilizedPalmPosition[X];
        var dY = leftHandPrev.stabilizedPalmPosition[Y] - leftHand.stabilizedPalmPosition[Y];

        var center = map.getCenter();
        var scaling = 4.0 / Math.pow(2, map.getZoom() - 1);
        var newLat = center.lat() + dY * scaling;
        var newLng = center.lng() + dX * scaling;
        var newCenter = new google.maps.LatLng(newLat, newLng);
        map.setCenter(newCenter);

        leftHandPrev = leftHand;
    }
    else {
        if (frame.hands.length > constLeftHand && !isGripped(frame.hands[constLeftHand]) && leftHandPrev != null) {
            leftHandPrev = null;
        }

    } // end if-else
    
} // end function


var prevHandMarker;
var HEIGHT_OFFSET = 150;

function drawHands(frame) {
    var bounds = map.getBounds();

    if (!bounds) {
        return;
    }

    var hand = frame.hands[0];
    if (hand) {
        var scaling = (4.0 / Math.pow(2, map.getZoom() - 1));
        var origin = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getCenter().lng());
        var newCenter = new google.maps.LatLng(origin.lat() + ((hand.stabilizedPalmPosition[1] - HEIGHT_OFFSET) *
                scaling), origin.lng() + (hand.stabilizedPalmPosition[0] * scaling));

        var handIcon = getHandIcon(hand);
        var handMarker = prevHandMarker;
        var handMarker;

        if (!handMarker) { // Create a new 'handMarker' if there was none
            handMarker = new google.maps.Marker();
            handMarker.setOptions({
                position: newCenter,
                icon: handIcon,
                map: map

            }); // end object

        } // end if
        
        handMarker.setOptions({
            position: newCenter,
            icon: handIcon
        });

        prevHandMarker = handMarker;

    } // end if

} // end function


var INDEX_FINGER = 1;
var MIDDLE_FINGER = 2;

function zoom(frame, keyTapGesture) {
    var currentZoom = map.getZoom();
    var newZoom;

    if ( keyTapGesture.pointableIds.length == 1 && keyTapGesture.state == "stop" ) {
        switch(frame.pointable(keyTapGesture.pointableIds[0]).type) {
            case INDEX_FINGER:
                // Zoom in
                newZoom = currentZoom + 1;
            break;
            case MIDDLE_FINGER:
                // Zoom out
                newZoom = currentZoom - 1;
            break;

        } // end switch

        if (newZoom >= 0 && newZoom <= 22) {
            map.setZoom(newZoom);
        }

    } // end if

} // end function


function isGripped(hand) {
    return hand.grabStrength == 1.0;

} // end function


function getHandIcon(hand) {
    if (isGripped(hand)) {
        return "./images/closedHand.png";
    } else {
        return "./images/openHand.png";
    }

} // end function


function closeMarker() {
    try {
        infowindow.close();
    } catch (Exception) {}

} // end function


lat = 53.277024;
longe = -9.061486;
zoomMap = 8;

function initMap() {
    var fenway = new google.maps.LatLng(lat, longe);
    var mapOptions = {
        zoom: zoomMap,
        center: fenway,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        }

    }; // end object

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

} // end function


function initialize() {
    initMap();

    //Leap setup using animation frame
    Leap.loop({enableGestures: true}, move);
        
} // end function

google.maps.event.addDomListener(window, 'load', initialize);
