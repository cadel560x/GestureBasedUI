# 4 Year  GESTURE BASED UI DEVELOPMENT

## Overview
The Leap Motion system recognizes and tracks hands and fingers. The device operates in an intimate proximity with high precision and tracking frame rate and reports discrete positions and motion.

![images](images/leap.jpg)

The Leap Motion controller uses optical sensors and infrared light. The sensors are directed along the y-axis – upward when the controller is in its standard operating position – and have a field of view of about 150 degrees. The effective range of the Leap Motion Controller extends from approximately 25 to 600 millimeters above the device (1 inch to 2 feet).

Detection and tracking work best when the controller has a clear, high-contrast view of an object’s silhouette. The Leap Motion software combines its sensor data with an internal model of the human hand to help cope with challenging tracking conditions.

## Coordinate system
The Leap Motion system employs a right-handed Cartesian coordinate system. The origin is centered at the top of the Leap Motion Controller. The x- and z-axes lie in the horizontal plane, with the x-axis running parallel to the long edge of the device. The y-axis is vertical, with positive values increasing upwards (in contrast to the downward orientation of most computer graphics coordinate systems). The z-axis has positive values increasing toward the user.

![images](images/Leap_Axes.png)

## The project
![images](images/theproject.png)
The project is made up of the Leap Motion, Google Map & Street View, and HTML + JavaScript code for connecting the two of them. 

The project allows a user to navigate Google Street View with only hand motions inside a web browser.


## How it works
I've integrated the two Javascript APIs of Leap Motion, and of Google Maps, which allowed me to achieve some amazing, downright futuristic hand gestures to manipulate Google Maps.

![images](images/leapHand.png)

Using the hands on the device, the user will be able to control the courses on the map.

Some movements are pre-configured in the system, allowing the user to:

- Move the hand back and forth to close the popups;
- Open hand, move the cursor on the screen;
- Hand closed, mapping the map;
- Circular movements, zoom in and zoom out.

### Video
![images](images/youtube.png)
## https://www.youtube.com/watch?v=em0PR3sLYys


## Technology
![images](images/architecture.png)

### Bootstrap
Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

```html
  <!-- Bootstrap -->
  <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
```

### Leap Motion - JS

LeapJS is a library that aids manipulation of 2d surfaces in a 3D world. This is accomplished with a minimal API, no physics engine dependencies.

LeapJS works by connecting to a websocket server running locally through the Leap Service. As often as every 10ms, the service sends a frame over the websocket and to the open page. This frame is a blob of JSON data including the positions of hands and fingers.

This library expects Leap Motion and your THREE.js scene to be both in the same uniting system: meters. This effects things like collision detection (requiring same units) and some sane defaults (such as how far a button depresses).

See the demos below for how to set this up in a couple of lines.

```html
  <!-- Leap Motion - JS -->
  <script src="https://js.leapmotion.com/leap-0.6.0.min.js"></script>
  <script src="https://js.leapmotion.com/leap-plugins-0.1.6.js"></script>
  <script src="https://js.leapmotion.com/leap.rigged-hand-0.1.4.min.js"></script>
```
#### Drawing Hands
To draw hands on the map, since its a 2D map, I take only XY values of the hand's palm on the current frame, scale accordingly to map's zoom, add to origin's latitude and longitude. Doing so, the position in the map to draw the hand is obtained. I then use a built-in fuction of google map's api that allows drawing custom markers on the map to draw the hand icon on the newly obtained latitude and logitude.
```js
newCenter = new google.maps.LatLng(origin.lat() + (hand.stabilizedPalmPosition[1]  *
                    scaling), origin.lng() + (hand.stabilizedPalmPosition[0] * scaling));

handMarker = new google.maps.Marker();
                    handMarker.setOptions({
                        position: newCenter,
                        icon: handIcon,
                        map: map
                     
                    });
```
#### Moving the map
To move the map accordingly, at every frame I check how many pixels the palm moved in relation to the previous and add that to the current center point's latitute and longitude, needing then to only center the map to the newly obtained coordinates.

```js
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
```

# Author

### Javier Mantilla
- G00329649@gmit.ie  
- https://github.com/cadel560x  

## References
- [Bootstrap](https://getbootstrap.com/)
- [LEAPJS](https://github.com/leapmotion/leapjs)
- [JavaScript SDK Documentation](https://developer.leapmotion.com/documentation/javascript/index.html)  
