// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// Using express: http://expressjs.com/
var express = require('express');
const tf = require('@tensorflow/tfjs-node');
const labels = require('./tfjs/model.json');
// Create the app
var app = express();
const model;
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 5500, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
//load model
async function loadModel() {
    // Warm up the model
    model = await tf.loadLayersModel('./tfjs/model.json');
    console.log("loaded model");
  }
  

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);
loadModel();
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
        async function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        // const buf = data.files.file[0].buffer;
        let buf;
        const uint8array = new Uint8Array(buf);

        
        // const imageTensor = await tf.node.decodeImage(uint8array);
        // const input = imageTensor.expandDims(0);
        // const startTime = tf.util.now();
        // let outputTensor = objectDetectionModel.predict({'x': input});
        // const scores = await outputTensor['detection_scores'].arraySync();
        // const boxes = await outputTensor['detection_boxes'].arraySync();
        // const names = await outputTensor['detection_classes'].arraySync();
        // const endTime = tf.util.now();
        // outputTensor['detection_scores'].dispose();
        // outputTensor['detection_boxes'].dispose();
        // outputTensor['detection_classes'].dispose();
        // outputTensor['num_detections'].dispose();
        // const detectedBoxes = [];
        // const detectedNames = [];
        // for (let i = 0; i < scores[0].length; i++) {
        //   if (scores[0][i] > 0.3) {
        //     detectedBoxes.push(boxes[0][i]);
        //     detectedNames.push(labels[names[0][i]]);
        //   }
        // }
        // res.send({
        //   boxes: detectedBoxes,
        //   names: detectedNames,
        // //   inferenceTime: endTime - startTime
        // });    
        // Send it to all other clients
        socket.broadcast.emit('mouse', names);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);

