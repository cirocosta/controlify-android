// definition of global variables

var scene,
    renderer,
    camera,
    canvasWidth,
    canvasHeight,
    square,
    triangle,
    cube,
    pyramid;

var xRotation = 0.0,
    yRotation = 0.0,
    zRotation = 0.0;

var xSpeed = 0.0,
    ySpeed = 0.0;

var zTranslation = 0.0;

// calling main functions

initializeScene();
animateScene();

// function declaration

function initializeScene () {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000, 1);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    // instantiating the camera and then moving it 10 units toward Z to
    // allow it to look to the center of the scene.

    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
    camera.position.set(0,0, 13);
    camera.lookAt(scene.position);

    // add the camera to the scene.

    scene.add(camera);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position = camera.position;
    scene.add(directionalLight);

    triangle = createTriangle();
    triangle.position.set(-1.5, 0.0, 4.0);

    square = createSquare();
    square.position.set(1.5, 0.0, 4.0);

    pyramid = createPyramid();
    pyramid.position.set(-4.5, 0.0, 4.0);

    cube = createCube();
    cube.position.set(4.5, 0.0, 4.0);

    scene.add(cube);
    scene.add(triangle);
    scene.add(square);
    scene.add(pyramid);

    document.addEventListener("keydown", onDocumentKeyDown, false);
}

function onDocumentKeyDown (event) {
    var keyCode = event.which;

    if (keyCode == 38) {
        xSpeed -= 0.01;
    } else if (keyCode == 40) {
        xSpeed += 0.01;
    } else if (keyCode == 37) {
        ySpeed -= 0.01;
    } else if (keyCode == 39) {
        ySpeed += 0.01;
    }
}

function renderScene () {
    renderer.render(scene, camera);
}

function animateScene () {
    triangle.rotation.y += 0.1;
    square.rotation.x -= 0.075;

    pyramid.rotation.y += 0.075;
    pyramid.rotation.x += 0.005;

    // cube.rotateOnAxis(new THREE.Vector3(1,1,1).normalize(), 0.075);

    xRotation += xSpeed;
    yRotation += ySpeed;
    zRotation += 0.04;

    cube.rotation.set(xRotation, yRotation, zRotation);


    requestAnimationFrame(animateScene);
    renderScene();
}

function createPyramid () {
    var pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);

    // here we don't need to set the faces/vertices of the object with
    // our own hands. Although, as we want to colorize all the stuff, we
    // need to set the color of each of its faces.
    for (var i = 0; i < pyramidGeometry.faces.length; i++) {
        pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
        pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
        pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
    }

    var pyramidMaterial = new THREE.MeshLambertMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });

    return new THREE.Mesh(pyramidGeometry, pyramidMaterial);
}


function createCube () {
    var cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    var cubeMaterials = [
        new THREE.MeshLambertMaterial({color: 0xFF0000}),
        new THREE.MeshLambertMaterial({color: 0x00FF00}),
        new THREE.MeshLambertMaterial({color: 0xFF00FF}),
        new THREE.MeshLambertMaterial({color: 0xFFFF00}),
        new THREE.MeshLambertMaterial({color: 0x00FFFF}),
        new THREE.MeshLambertMaterial({color: 0xFFFFFF})
    ];

    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}

function createTriangle () {
    var triangleGeometry = new THREE.Geometry();
    // adding the vertices to our geometry
    triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
    // defining the face by setting the vertices indices
    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

    triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
    triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
    triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);

    var triangleMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });

    // create a mesh and then insert both the geometry and the material.
    return new THREE.Mesh(triangleGeometry, triangleMaterial);
}

function createSquare () {
    var squareGeometry = new THREE.Geometry();
    squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
    squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
    squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
    squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));

    squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
    squareGeometry.faces.push(new THREE.Face3(0, 3, 2));

    var squareMaterial = new THREE.MeshBasicMaterial({
        color: 0x8080FF,
        side: THREE.DoubleSide
    });

    return new THREE.Mesh(squareGeometry, squareMaterial);
}
