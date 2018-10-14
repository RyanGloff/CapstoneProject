const timeView = document.getElementById('time-view');
const canvasWrapper = document.getElementById('canvas-wrapper');

//three.js setup
var scene, camera, fov, aspectRatio, nearPlane,
 farPlane, height, width, renderer, container;

var gameObjects = [];

var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

function createScene() {
    height = window.innerHeight;
    width = window.innerWidth;

    scene = new THREE.Scene();

    aspectRatio = width/height;
    fov = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fov, aspectRatio, nearPlane, farPlane
    );

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    canvasWrapper.appendChild(renderer.domElement);
}

function handleWindowResize() {
    height = window.innerHeight;
    width = window.innerWidth;
    renderer.setSize(height, width);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
}


Wall = function(x, y, z, width) {
    var geo = new THREE.PlaneGeometry(width, 100, 32);
    var mat = new THREE.MeshBasicMaterial({
        color: Colors.blue,
        wireframe: true             
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;

    this.extend = function() {
        this.mesh.scale.x++;
    }
}

GameMap = function(size, x, y, z) {
    this.size = size
    var geo = new THREE.PlaneGeometry(this.size,this.size,700,30,10);
    var mat = new THREE.MeshBasicMaterial({
        color: 0xF08080,
        wireframe: true                            
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;

    this.mesh.receiveShadow = true;
}

Bike = function() {
    this.mesh = new THREE.Object3D();

    var mat = new THREE.MeshBasicMaterial({color: Colors.blue});
    var mat1 = new THREE.MeshBasicMaterial({color: Colors.blue});

    var bodyGeom = new THREE.BoxGeometry(20, 20, 50);
    var body = new THREE.Mesh(bodyGeom, mat);
    body.castShadow = true;
    body.receieveShadow = true;
    this.mesh.add(body);

    var wheelGeom = new THREE.CylinderGeometry(5, 5, 30, 15);
    var rearWheel = new THREE.Mesh(wheelGeom, mat1);
    var frontWheel = new THREE.Mesh(wheelGeom, mat1);
    rearWheel.rotation.x = Math.PI / 2;
    rearWheel.rotation.z = Math.PI / 2;

    frontWheel.rotation.x = Math.PI / 2;
    frontWheel.rotation.z = Math.PI / 2;

    rearWheel.position.y = -5;
    frontWheel.position.y = -5;
    rearWheel.position.z = 15;
    frontWheel.position.z = -15;
    this.mesh.add(rearWheel);
    this.mesh.add(frontWheel);

    this.update = function() {
        this.mesh.position.y = 220;
        this.mesh.position.z--;
    }

    this.setColor = function(clr) {
        for(var i = 0; i < this.mesh.children.length - 1; i++) {
            this.mesh.children[i].material.color.setHex(clr);
        }
    }
}
//

//function resize () {
//    renderer.setSize(window.innerWidth, window.innerHeight);
//}
//window.addEventListener('resize', resize);
//resize();

var sprites = {};

var sprite;
var user;

function Game () {
    this.run = function () {
        createScene();

        gameMap = new GameMap(5000,0,0,-100);
        var box = new THREE.Box3().setFromObject(gameMap.mesh);
        var farWall = new Wall(gameMap.mesh.position.x, gameMap.mesh.position.y, gameMap.mesh.position.z - gameMap.size / 2, gameMap.size);
        var closeWall = new Wall(gameMap.mesh.position.x, gameMap.mesh.position.y, gameMap.mesh.position.z + gameMap.size / 2, gameMap.size);

        var leftWall = new Wall(gameMap.mesh.position.x - (gameMap.size / 2), gameMap.mesh.position.y, gameMap.mesh.position.z, gameMap.size);
        var rightWall = new Wall(gameMap.mesh.position.x + (gameMap.size / 2), gameMap.mesh.position.y, gameMap.mesh.position.z, gameMap.size);
        leftWall.mesh.rotation.y += Math.PI / 2;
        rightWall.mesh.rotation.y += Math.PI / 2;

        scene.add(gameMap.mesh);
        scene.add(farWall.mesh);
        scene.add(closeWall.mesh);
        scene.add(leftWall.mesh);
        scene.add(rightWall.mesh);

        camera.position.z += 100;
        camera.position.y += 25;
 

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }
    this.playerTurn = function (username, location, direction) {
        sprites[username].mesh.position.x = location.x;
        sprites[username].mesh.position.z = location.y;
        sprites[username].mesh.rotation.y += Math.PI / 2;
        //camera.rotation.y += Math.PI / 2;

        //sprites[username].direction = direction;
    };
    this.playerCrashed = function (username, location) {
        console.log('player-crashed', username, location);
    };
    this.setPlayerLocation = function (username, x, y, direction) {
        if(username in sprites) {
            sprites[username].mesh.position.x = x;
            sprites[username].mesh.position.z = y;
        }
        else {
            this.addPlayer(username);
            scene.add(sprites[username]);
        }
    };
    this.setPlayerColor = function (username, color) {
        console.log('set-player-color', username, color);
        sprites[username].setColor(color);
    };
    this.setTime = function (time) {

    };
    this.start = function (time) {
        console.log('start the game', time);
    };
    this.end = function (time) {
        console.log('end the game', time);
    };
    //(name, location, color, direction)
    this.addPlayer = function (name) {
        var player = new Bike();
        player.mesh.add(camera);
        player.mesh.position.y = 100;
        scene.add(player.mesh);
        sprites[name] = player;
    };
    this.removePlayer = function (name) {
        scene.remove(sprites[name]);
        delete sprites[name];
    };
}

var game = new Game();
game.run();