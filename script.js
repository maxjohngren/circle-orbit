// The three.js scene: the 3D world where you put objects
const scene = new THREE.Scene();

// The camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

// The renderer: something that draws 3D objects onto the canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaccc, 1);
// Append the renderer canvas into <body>
document.body.appendChild(renderer.domElement);


// A cube we are going to animate
const cube = {
  // The geometry: the shape & size of the object
  geometry: new THREE.BoxGeometry(1, 1, 1),
  // The material: the appearance (color, texture) of the object
  material: new THREE.MeshBasicMaterial({ color: 0x00ff00 })
};

// The mesh: the geometry and material combined, and something we can directly add into the scene (I had to put this line outside of the object literal, so that I could use the geometry and material properties)
cube.mesh = new THREE.Mesh(cube.geometry, cube.material);

// Add the cube into the scene
scene.add(cube.mesh);

// Make the camera further from the cube so we can see it better
camera.position.z = 5;

function createSphere(scene){
  // now, create a sphere
  const sphere = {
    // The geometry: the shape & size of the object
    geometry: new THREE.SphereGeometry( .12, 30, 30 ),
    // The material: the appearance (color, texture) of the object
    material: new THREE.MeshBasicMaterial( {color: 0x1100ff} ),

    // give each sphere a property called fade
    fade: 0
      
  };
  
  
  
  // The mesh: the geometry and material combined, and something we can directly add into the scene (
  sphere.mesh = new THREE.Mesh(sphere.geometry, sphere.material);
  // Add the sphere into the scene
  scene.add(sphere.mesh);
  return sphere
}

var spheres = []

for (var i = 0; i < 30; i++){
  var sphere = createSphere(scene)
  spheres.push(sphere)
  //sphere.mesh.position.x = (Math.random() * 5 - 2.5)
  //sphere.mesh.position.y = (Math.random() * 5 - 2.5)
  //sphere.mesh.position.z = (Math.random() * 5 - 2.5)
}

function createCirclePath(centerX, centerY, radius, numPoints) {
  var path = [];

  var angleIncrement = (2 * Math.PI) / numPoints;

  for (var i = 0; i < numPoints; i++) {
    var angle = i * angleIncrement;
    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);
    path.push(new THREE.Vector3(x, y, 0));
  }

  return path;
}

newPath = createCirclePath(0, 0, 2, spheres.length)
console.log(newPath);
console.log(newPath[0])

travelPath = createCirclePath(0, 0, 2, spheres.length*5)

// sphere 0 assoc. with newPath point 0
for (var i = 0; i < spheres.length; i++) {
  spheres[i].mesh.position.x = newPath[i].x
  spheres[i].mesh.position.y = newPath[i].y
  spheres[i].mesh.position.z = newPath[i].z
}

//var totalTime = 0;
//var currentPointIndex = 0;
var angle = 0
var angleIncrement = (2 * Math.PI) / spheres.length
var currAngle = 0

var angleIncrementZ = (2 * Math.PI) / (spheres.length * 0.01)
var currAngleZ =  0

function render() {
  // Render the scene and the camera
  renderer.render(scene, camera);

  // Rotate the cube every frame
  cube.mesh.rotation.x += 0.01;
  cube.mesh.rotation.y -= 0.01;
  
  for (var i = 0; i < spheres.length; i++) {
    var sphere = spheres[i];
    var angle = currAngle + i * angleIncrement;
    var angleZ = currAngleZ + i * angleIncrementZ;

    var x = 0 + 2 * Math.cos(angle);
    var y = 0 + 2 * Math.sin(angle);
    var z = 0 + 2 * Math.sin(angleZ);
    

    sphere.mesh.position.x = x;
    sphere.mesh.position.y = y; 
    sphere.mesh.position.z = z;
    
  }
    currAngle += 0.01
    currAngleZ += 0.01;



  // Make it call the render() function about every 1/60 second
  requestAnimationFrame(render);
}

render();