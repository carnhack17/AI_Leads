import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./ScoreVisualization.css";

function ScoreVisualization({ score, decision }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create a rotating sphere with color based on decision
    const geometry = new THREE.IcosahedronGeometry(2, 5);

    let color;
    if (decision === "hot") {
      color = new THREE.Color(0xff4444); // Red for hot
    } else if (decision === "warm") {
      color = new THREE.Color(0xffaa00); // Orange for warm
    } else {
      color = new THREE.Color(0x4488ff); // Blue for cold
    }

    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      shininess: 100,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const light1 = new THREE.PointLight(0xffffff, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.AmbientLight(0x404040);
    scene.add(light2);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate the sphere
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.008;

      // Scale pulse based on score
      const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.1 * (score / 100);
      sphere.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [score, decision]);

  return <div ref={containerRef} className="visualization-container"></div>;
}

export default ScoreVisualization;
