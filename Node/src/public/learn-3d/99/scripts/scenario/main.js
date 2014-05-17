define(['threejs', 'scripts/controls/game-controls'], function (THREE, GameControls) {
  return buildCanvas;
});

function buildCanvas (THREE, GameControls) {
  'use strict';

  var camera, scene, renderer;
  var geometry, material, mesh;
  var ray;
  var controls;
  var objects = [];

  var COLORS = {
    white: 0xffffff
  };

  var MEASURES = {
    width: window.innerWidth,
    height: window.innerHeight
  };


  // CREATING THE CAMERA

  camera = new THREE.PerspectiveCamera(75,
                                       MEASURES.width / MEASURES.height,
                                       1,
                                       1000);

  // CREATING THE SCENE AND ADDDING FOG TO IT

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COLORS.white, 0, 750);

  // DEFINING 2 LIGHTS

  var light = new THREE.DirectionalLight(COLORS.white, 1.5);
  light.position.set(1,1,1);

  var light2 = new THREE.DirectionalLight(COLORS.white, 1.5);
  light2.position.set(-1,-0.5,-1);

  scene.add(light);
  scene.add(light2);

  // SETTING CONTROLS

  controls = new GameControls(camera);
  controls.setGameControls();
  scene.add(controls.getObject());

  // SETTING RAYCASTER

  ray = new THREE.Raycaster();
  ray.ray.direction.set(0, -1, 0);

  ///////////////////////////////////
  // SETTING THE PLANE (OUR FLOOR) //
  ///////////////////////////////////

  // create the geometry and then apply a transformation matrix to it.
  // After that, apply a lot of stuff to colorize it.

  geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2.04));

  var i = 0,
      l = geometry.faces.length;

  // define the faces for each of the triangles that are formed

  for (; i < l; i++) {
    var face = geometry.faces[i];
    face.vertexColors[0]
        = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5,
                                   0.75,
                                   Math.random() * 0.25 + 0.75);
    face.vertexColors[1]
        = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5,
                                   0.75,
                                   Math.random() * 0.25 + 0.75);
    face.vertexColors[2]
        = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5,
                                   0.75,
                                   Math.random() * 0.25 + 0.75);
  }

  material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //////////////////////////
  // CREATING THE OBJECTS //
  //////////////////////////

  geometry = new THREE.BoxGeometry(20, 20, 20);

  for (var i = 0, l = geometry.faces.length; i < l; i ++) {
    var face = geometry.faces[i];

    face.vertexColors[0]
        = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5,
                                   0.75,
                                   Math.random() * 0.25 + 0.75);
    face.vertexColors[1]
        = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5,
                                   0.75,
                                   Math.random() * 0.25 + 0.75);
    face.vertexColors[2]
        = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5,
                                   0.75,
                                   Math.random() * 0.25 + 0.75);
  }

  for (var i = 0; i < 500; i ++) {
    material = new THREE.MeshPhongMaterial({
      specular: 0xffffff,
      shading: THREE.FlatShading,
      vertexColors: THREE.VertexColors
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
    mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
    mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;

    scene.add(mesh);

    material.color.setHSL(Math.random() * 0.2 + 0.5,
                          0.75,
                          Math.random() * 0.25 + 0.75);

    objects.push(mesh);
  }


  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(COLORS.white);
  renderer.setSize(MEASURES.width, MEASURES.height);

  document.body.appendChild(renderer.domElement);

  // animation function (which makes this loops!)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight);
  }

  function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
  }

  animate();
};


