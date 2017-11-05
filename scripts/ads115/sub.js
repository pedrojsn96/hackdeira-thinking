var mqtt = require('mqtt');
var broker  = mqtt.connect('mqtt://localhost:1883');
var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyCrwg3vqVXTsddJ0t-r7f785gRQ_qhikvo",
    authDomain: "hackadeira.firebaseapp.com",
    databaseURL: "https://hackadeira.firebaseio.com",
    projectId: "hackadeira",
    storageBucket: "hackadeira.appspot.com",
    messagingSenderId: "103797089849"
});

app.auth().signInWithEmailAndPassword('hackadeira@cin.ufpe.br','123456');

broker.on('connect', function () {
    broker.subscribe('/ads115');
});

broker.on('message', function (topic, message){
    if(message.toString() != 'undefined'){
        console.log(message, message.toString());
        let payload = JSON.parse(message.toString());
        let db = firebase.database();
        db.ref('/ads115').push({
            umidade: payload
        });
    }
});