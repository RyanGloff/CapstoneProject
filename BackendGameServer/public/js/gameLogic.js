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

var sprites = {};

var sprite;
var user;

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
    this.setPlayerLocation = function (username, x, y, direction) {
        if(username in sprites) {
            sprites[username].position.x = x;
            sprites[username].position.y = y;
        }
        else {
            sprites[username] = new THREE.Line(geometry, material);
            sprites[username].position.x = x;
            sprites[username].position.y = y;
            scene.add(sprites[username]);
        }
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
    //(name, location, color, direction)
    this.addPlayer = function (name) {
        sprites[name] = new THREE.Line(geometry, material);
        scene.add(sprites[name]);
    };
    this.removePlayer = function (name) {
        console.log('remove-player', name, location, color, direction);
    };
}

var game = new Game();
//game.addPlayer("test", 0,0,0);
game.run();