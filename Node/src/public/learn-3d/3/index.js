// definition of global variables

var scene,
    renderer,
    camera,
    canvasWidth,
    canvasHeight;

// calling main functions

initializeScene();
renderScene();

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

    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);
    camera.position.set(0,0, 10);
    camera.lookAt(scene.position);

    // planegeometry

    var geometry = new THREE.PlaneGeometry(5,20);
    // applying a matrix to its vertices to rotate it
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2.03));
    var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);



    // add the camera to the scene.

    scene.add(camera);

    var triangle = createTriangle();
    triangle.position.set(-1.5, 0.0, 4.0);

    var square = createSquare();
    square.position.set(1.5, 0.0, 4.0);

    scene.add(triangle);
    scene.add(square);
}

function renderScene () {
    renderer.render(scene, camera);
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
