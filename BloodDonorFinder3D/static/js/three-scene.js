/**
 * Blood Donor Finder - Three.js 3D Hero Scene
 * Renders an interactive 3D blood drop with floating red blood cell particles.
 * Includes graceful fallback for environments where WebGL is unsupported.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-3d-canvas');
  const fallback = document.querySelector('.canvas-fallback');

  if (!container) return;

  // WebGL Support Detection
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!window.THREE || !isWebGLAvailable()) {
    if (fallback) fallback.style.display = 'flex';
    container.style.display = 'none';
    return;
  }

  let scene, camera, renderer, bloodDrop, particlesGroup;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;

  const width = container.clientWidth || 480;
  const height = container.clientHeight || 480;

  try {
    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const redRimLight = new THREE.DirectionalLight(0xef4444, 1.8);
    redRimLight.position.set(-5, -4, -4);
    scene.add(redRimLight);

    const specularLight = new THREE.PointLight(0xffffff, 0.9, 10);
    specularLight.position.set(2, 3, 3);
    scene.add(specularLight);

    // 5. Construct 3D Blood Drop using LatheGeometry
    const points = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      // Parametric curve defining droplet shape
      const y = -1.2 + t * 2.4;
      const radius = Math.sin(t * Math.PI) * Math.pow(1 - t * 0.7, 0.5) * 1.05;
      points.push(new THREE.Vector2(Math.max(0.001, radius), y));
    }
    const dropGeometry = new THREE.LatheGeometry(points, 48);

    const dropMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xcc0000,
      emissive: 0x4a0000,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.35,
      ior: 1.34,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    bloodDrop = new THREE.Mesh(dropGeometry, dropMaterial);
    bloodDrop.position.y = -0.15;
    scene.add(bloodDrop);

    // 6. Floating Red Blood Cell (RBC) Particles
    particlesGroup = new THREE.Group();
    const rbcGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16);
    const rbcMaterial = new THREE.MeshStandardMaterial({
      color: 0xd32f2f,
      roughness: 0.3,
      metalness: 0.1
    });

    const particleCount = 18;
    for (let i = 0; i < particleCount; i++) {
      const rbc = new THREE.Mesh(rbcGeometry, rbcMaterial);
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.4;
      rbc.position.x = Math.cos(angle) * radius;
      rbc.position.y = (Math.random() - 0.5) * 2.8;
      rbc.position.z = Math.sin(angle) * radius;
      
      rbc.rotation.x = Math.random() * Math.PI;
      rbc.rotation.y = Math.random() * Math.PI;
      rbc.scale.setScalar(0.7 + Math.random() * 0.6);

      rbc.userData = {
        speed: 0.008 + Math.random() * 0.012,
        angle: angle,
        radius: radius,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04
      };

      particlesGroup.add(rbc);
    }
    scene.add(particlesGroup);

    // 7. Mouse Parallax Interaction
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = mouseX * 0.6;
      targetRotationX = -mouseY * 0.4;
    });

    container.addEventListener('mouseleave', () => {
      targetRotationX = 0;
      targetRotationY = 0;
    });

    // 8. Handle Window Resize
    window.addEventListener('resize', () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // 9. Render Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous rotation + smooth mouse tilt
      bloodDrop.rotation.y += 0.008;
      bloodDrop.rotation.y += (targetRotationY - bloodDrop.rotation.y) * 0.05;
      bloodDrop.rotation.x += (targetRotationX - bloodDrop.rotation.x) * 0.05;

      // Subtle breathing float animation
      bloodDrop.position.y = -0.15 + Math.sin(elapsedTime * 1.8) * 0.08;

      // Animate orbiting particles
      particlesGroup.children.forEach(p => {
        p.userData.angle += p.userData.speed;
        p.position.x = Math.cos(p.userData.angle) * p.userData.radius;
        p.position.z = Math.sin(p.userData.angle) * p.userData.radius;
        p.position.y += Math.sin(elapsedTime + p.position.x) * 0.003;
        p.rotation.x += p.userData.rotSpeedX;
        p.rotation.y += p.userData.rotSpeedY;
      });

      renderer.render(scene, camera);
    }

    animate();

  } catch (err) {
    console.error("Three.js initialization failed, falling back to CSS animation:", err);
    if (fallback) fallback.style.display = 'flex';
    container.style.display = 'none';
  }
});
