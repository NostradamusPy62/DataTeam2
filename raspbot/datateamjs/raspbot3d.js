import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('container3d');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaddff);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Iluminación equilibrada
// Luz ambiental suave para iluminación base
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

// Luz principal desde arriba/frente
const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
mainLight.position.set(1, 1, 1);
scene.add(mainLight);

// Luz de relleno para las sombras
const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
fillLight.position.set(-1, 0.5, -0.5);
scene.add(fillLight);

// Luz suave desde abajo para resaltar detalles
const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
rimLight.position.set(0, -1, 0.5);
scene.add(rimLight);


// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añadido para movimiento más suave
controls.dampingFactor = 0.05;
// Cargar el GLB
const loader = new GLTFLoader();
loader.load(
    '3D/RaspBot.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Centramos el modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center); // mover al origen

        // Opcional: hacer que se ajuste el zoom automático
        const size = box.getSize(new THREE.Vector3()).length();
        const distance = size * 1.5;

        camera.position.set(0, size * 0.5, distance);
        controls.target.set(0, 0, 0); // mirar al centro
        controls.update();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    function (error) {
        console.error('Error al cargar el modelo', error);
    }
);

// Animar
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajustar a la ventana
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});