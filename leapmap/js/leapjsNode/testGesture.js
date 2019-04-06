#!/usr/bin/env node

var leapjs = require('leapjs');



/*
var controller  = new leapjs.Controller();

controller.on('connect', function() {
  console.log("Successfully connected.");
});

controller.on('deviceConnected', function() {
  console.log("A Leap device has been connected.");
});

controller.on('deviceDisconnected', function() {
  console.log("A Leap device has been disconnected.");
});

controller.connect();

controller.on('deviceFrame', function(frame) {
  var numberOfFingers = frame.fingers.length;
  console.log(numberOfFingers);
});
*/



var controller  = new leapjs.Controller({enableGestures: true});

controller.on('deviceFrame', function(frame) {
  // loop through available gestures
  for(var i = 0; i < frame.gestures.length; i++){
    var gesture = frame.gestures[i];
    var type    = gesture.type;          

    switch( type ){

      case "circle":
        if (gesture.state == "stop") {
          console.log('circle');
        }
        break;

      case "swipe":
        if (gesture.state == "stop") {
          console.log('swipe');
        }
        break;

      case "screenTap":
        if (gesture.state == "stop") {
          console.log('screenTap');
        }
        break;

      case "keyTap":
        if (gesture.state == "stop") {
          console.log('keyTap');
          console.log("zoom function called")
        }
        break;

      }
    }
});

/*
var INDEX_FINGER = 1;
var MIDDLE_FINGER = 2;

function zoom(frame, keyTapGesture) {  
  frame.gestures.forEach(function(gesture){
      var pointableIds = gesture.pointableIds;
      console.log("pointableIds::\n", pointableIds);
      
      pointableIds.forEach(function(pointableId){
        var pointable = frame.pointable(pointableId);
        console.log(pointable);
      });
    
  });

  if (keyTapGesture.pointableIds.length == 1 &&
      frame.pointable(keyTapGesture.pointableIds[0]).type == INDEX_FINGER) {
      switch (keyTapGesture.state) {
              
          case "stop":
            console.log("zoom in performed");
 
              var currentZoom = map.getZoom();
              var newZoom = currentZoom + 1;
              if (newZoom >= 0 && newZoom <= 22) {
                  map.setZoom(newZoom);
              }
 
              break;
      }
  }

  if (keyTapGesture.pointableIds.length == 1 &&
      frame.pointable(keyTapGesture.pointableIds[0]).type == MIDDLE_FINGER) {
      switch (keyTapGesture.state) {
              
          case "stop":
            console.log("zoom out performed");
 
              var currentZoom = map.getZoom();
              var newZoom = currentZoom - 1;
                  if (newZoom >= 0 && newZoom <= 22) {
                      map.setZoom(newZoom);
                  }
                  
              break;
      }
  }

}
 */

controller.connect();



/*
var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              break;
        }
    });
  }
});

// Count fingers ... useful for zooming
controller.on('deviceFrame', function(frame) {
  var numberOfFingers = frame.fingers.length;
  console.log(numberOfFingers);
});

// Set a new center
var center = ....where the pointer is at
var newLat = center.lat();
var newLng = center.lng();
var newCenter = new google.maps.LatLng(newLat, newLng);
map.setCenter(newCenter);

*/