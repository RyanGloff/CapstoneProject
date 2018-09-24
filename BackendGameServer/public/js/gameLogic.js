const timeView = document.getElementById('time-view');

//three.js setup
var geometry = new THREE.Geometry();
var material = new THREE.LineBasicMaterial({color: 0x00ff00});
geometry.vertices.push(new THREE.Vector3( -1, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 1, 0) );
geometry.vertices.push(new THREE.Vector3( 1, 0, 0) );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

function Game () {
    this.run = function () {
        var animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }
    this.playerTurnLeft = function (username, location) {
        console.log('player-turn-left', username, location);
    };
    this.playerTurnRight = function (username, location) {
        console.log('player-turn-right', username, location);
    };
    this.playerCrashed = function (username, location) {
        console.log('player-crashed', username, location);
    };
    this.setPlayerLocation = function (username, location) {
        console.log('set-player-location', username, location);
    };
    this.setPlayerColor = function (username, color) {
        console.log('set-player-color', username, color);
    };
    this.setTime = function (time) {
        timeView.innerHTML = 'time: ' + time;
    };
    this.start = function (time) {
        console.log('start the game', time);
    };
    this.end = function (time) {
        console.log('end the game', time);
    };
    this.addPlayer = function (name, location, color, direction) {
        console.log('add-player', name, location, color, direction);
        players.name = new Player();
        players.name.sprite = new THREE.Line(geometry, material);
        scene.add(players.name.sprite);

    };
    this.removePlayer = function (name) {
        console.log('remove-player', name, location, color, direction);
    };
}

var game = new Game();
game.run();