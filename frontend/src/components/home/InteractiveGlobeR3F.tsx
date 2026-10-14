import React, { Suspense, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import {
  INDIA_INDUSTRIAL_CLUSTERS,
  GLOBAL_PARTNER_COUNTRIES,
  SKILL_MOBILITY_ARCS,
  generateWorldMapCanvasTexture,
  IndiaClusterData,
  GlobalCountry
} from '../../data/globeWorldData';
import { Sparkles, Globe, MapPin, Compass, Shield, Activity, RefreshCw } from 'lucide-react';

export interface InteractiveGlobeR3FProps {
  onSelectCluster: (cluster: IndiaClusterData) => void;
  onSelectCountry: (country: GlobalCountry) => void;
  onHoverCluster: (id: string | null) => void;
  onHoverCountry: (id: string | null) => void;
  selectedClusterId?: string | null;
  selectedCountryId?: string | null;
  hoveredClusterId?: string | null;
  hoveredCountryId?: string | null;
  className?: string;
}

/**
 * High-tech LMIS Geospatial Suspense Fallback
 * Displayed while Three.js assets and procedural textures are generating/loading.
 */
export const GlobeSuspenseFallback: React.FC<{ progress?: number }> = ({ progress = 78 }) => {
  return (
    <div className="w-full h-full min-h-[270px] sm:min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#031525]/90 via-[#071f36]/90 to-[#020b14]/95 border border-sky-500/20 shadow-2xl p-6 text-center select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Outer concentric pulsing radar rings */}
      <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-4 rounded-full border border-sky-500/30 animate-spin" style={{ animationDuration: '18s' }} />
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-[#F28C28]/40 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
        
        {/* Central holographic globe icon with glowing orbit */}
        <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-900/90 border border-sky-400/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.35)]">
          <Globe className="w-9 h-9 sm:w-11 sm:h-11 text-[#38BDF8] animate-pulse" />
          <div className="absolute -bottom-1 text-[9px] font-mono font-bold text-[#F28C28] uppercase tracking-wider bg-black/70 px-1.5 py-0.5 rounded border border-[#F28C28]/40">
            INDIA 3D
          </div>
        </div>

        {/* Radar beam sweep */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/0 via-sky-400/10 to-sky-400/25 animate-spin pointer-events-none" style={{ animationDuration: '4s' }} />
      </div>

      {/* Telemetry Status Text */}
      <div className="mt-5 space-y-1.5 z-10 max-w-sm">
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F28C28] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F28C28]" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-[#38BDF8] uppercase">
            Initialising Geospatial Grid
          </span>
        </div>

        <p className="text-[11px] text-slate-300">
          Synthesising 22 Industrial Clusters & 14 Global Skilling Corridors...
        </p>

        {/* Shimmer progress indicator */}
        <div className="w-48 sm:w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden mx-auto mt-2 border border-sky-500/20">
          <div className="h-full bg-gradient-to-r from-sky-400 via-[#F28C28] to-sky-300 w-3/4 rounded-full animate-pulse" />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
          <span>LAT: 20.5937° N</span>
          <span className="text-emerald-400 font-semibold">MESH READY</span>
          <span>LNG: 78.9629° E</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Helper: Mathematical Lat/Lng to Vector3 Sphere coordinates
 */
const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(theta) * Math.sin(phi);
  return new THREE.Vector3(x, y, z);
};

/**
 * Core Three.js Canvas Implementation
 * Provides:
 * - Dynamic geometry simplification based on device viewport and DPR
 * - High-performance mobile touch momentum rotation & inertia damping
 * - Tap vs swipe classification to prevent false selections on mobile
 * - Clean WebGL resource management and disposal
 */
const InternalGlobeView: React.FC<InteractiveGlobeR3FProps> = ({
  onSelectCluster,
  onSelectCountry,
  onHoverCluster,
  onHoverCountry,
  selectedClusterId,
  selectedCountryId,
  hoveredClusterId,
  hoveredCountryId,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // References for touch/mouse interaction and inertia physics
  const stateRef = useRef({
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastX: 0,
    lastY: 0,
    touchStartTime: 0,
    hasMovedSignificantly: false,
    velocityX: 0,
    velocityY: 0,
    lastFrameTime: performance.now(),
    lastInteractionTime: performance.now(),
    globeGroup: null as THREE.Group | null,
    clustersGroup: null as THREE.Group | null,
    countriesGroup: null as THREE.Group | null,
    clusterMeshes: [] as THREE.Mesh[],
    countryMeshes: [] as THREE.Mesh[],
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    animationId: 0,
  });

  // Keep callback references fresh without triggering full scene re-init
  const callbacksRef = useRef({
    onSelectCluster,
    onSelectCountry,
    onHoverCluster,
    onHoverCountry,
    selectedClusterId,
    selectedCountryId,
    hoveredClusterId,
    hoveredCountryId,
  });

  useEffect(() => {
    callbacksRef.current = {
      onSelectCluster,
      onSelectCountry,
      onHoverCluster,
      onHoverCountry,
      selectedClusterId,
      selectedCountryId,
      hoveredClusterId,
      hoveredCountryId,
    };
  }, [
    onSelectCluster,
    onSelectCountry,
    onHoverCluster,
    onHoverCountry,
    selectedClusterId,
    selectedCountryId,
    hoveredClusterId,
    hoveredCountryId,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile device / small screen
    const width = container.clientWidth || window.innerWidth;
    const isMobile = width < 768 || ('ontouchstart' in window && width < 1024);
    setIsMobileDevice(isMobile);

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.2;
    stateRef.current.camera = camera;

    // 2. Optimized WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable MSAA on mobile for massive 60fps GPU boost
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Cap pixel ratio: 1.5 on mobile saves 50%+ fill rate; 2.0 on desktop
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2.0));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    stateRef.current.renderer = renderer;

    // Append canvas to container
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'none'; // Critical for mobile touch rotation

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    directionalLight1.position.set(6, 4, 6);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xf28c28, 1.2);
    directionalLight2.position.set(-6, -3, -4);
    scene.add(directionalLight2);

    // 4. Main Globe Hierarchy Group
    const globeRadius = 2.05;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    stateRef.current.globeGroup = globeGroup;

    // Default angle: India centered and tilted towards viewer
    globeGroup.rotation.y = -1.82;
    globeGroup.rotation.x = 0.32;

    // 5. GEOMETRY SIMPLIFICATION:
    // Scale segments and texture sizes according to device profile
    const sphereSegments = isMobile ? 32 : 56;
    const atmosSegments = isMobile ? 22 : 36;
    const textureRes = isMobile ? { w: 1024, h: 512 } : { w: 2048, h: 1024 };

    // Procedural World Map Texture
    const mapCanvas = generateWorldMapCanvasTexture(textureRes.w, textureRes.h);
    const worldTexture = new THREE.CanvasTexture(mapCanvas);
    worldTexture.colorSpace = THREE.SRGBColorSpace;
    worldTexture.wrapS = THREE.ClampToEdgeWrapping;
    worldTexture.wrapT = THREE.ClampToEdgeWrapping;

    const globeGeo = new THREE.SphereGeometry(globeRadius, sphereSegments, sphereSegments);
    const globeMat = new THREE.MeshPhongMaterial({
      map: worldTexture,
      shininess: 20,
      specular: new THREE.Color(0x38bdf8),
      transparent: true,
      opacity: 0.98,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Atmospheric Glow Layer (simplified geometry)
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.035, atmosSegments, atmosSegments);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 6. India Telemetry Constellation (Reduced count on mobile for smooth performance)
    const indiaMicroNodesGroup = new THREE.Group();
    globeGroup.add(indiaMicroNodesGroup);

    const indiaSubRegions = [
      { minLat: 27.5, maxLat: 34.0, minLng: 74.0, maxLng: 79.5, count: isMobile ? 12 : 26 },
      { minLat: 21.0, maxLat: 27.5, minLng: 69.5, maxLng: 75.5, count: isMobile ? 10 : 24 },
      { minLat: 18.0, maxLat: 24.5, minLng: 74.5, maxLng: 82.5, count: isMobile ? 14 : 30 },
      { minLat: 8.5, maxLat: 18.0, minLng: 75.0, maxLng: 82.0, count: isMobile ? 16 : 34 },
      { minLat: 20.0, maxLat: 26.5, minLng: 83.0, maxLng: 88.5, count: isMobile ? 10 : 22 },
      { minLat: 24.5, maxLat: 27.5, minLng: 90.5, maxLng: 94.5, count: isMobile ? 8 : 14 }
    ];

    const sensorPositions: number[] = [];
    indiaSubRegions.forEach(reg => {
      for (let i = 0; i < reg.count; i++) {
        const lat = reg.minLat + Math.random() * (reg.maxLat - reg.minLat);
        const lng = reg.minLng + Math.random() * (reg.maxLng - reg.minLng);
        const pos = latLngToVector3(lat, lng, globeRadius * 1.008);
        sensorPositions.push(pos.x, pos.y, pos.z);
      }
    });

    const sensorGeo = new THREE.BufferGeometry();
    sensorGeo.setAttribute('position', new THREE.Float32BufferAttribute(sensorPositions, 3));
    const sensorMat = new THREE.PointsMaterial({
      color: 0xf28c28,
      size: isMobile ? 0.042 : 0.038,
      transparent: true,
      opacity: 0.75,
    });
    const sensorPoints = new THREE.Points(sensorGeo, sensorMat);
    indiaMicroNodesGroup.add(sensorPoints);

    // 7. Interactive Indian Industrial Cluster Pins (22 Major Hubs)
    const clustersGroup = new THREE.Group();
    globeGroup.add(clustersGroup);
    stateRef.current.clustersGroup = clustersGroup;

    const clusterMeshes: THREE.Mesh[] = [];
    const pinSegments = isMobile ? 10 : 16;
    const ringSegments = isMobile ? 12 : 16;

    INDIA_INDUSTRIAL_CLUSTERS.forEach((cluster) => {
      const pos = latLngToVector3(cluster.lat, cluster.lng, globeRadius * 1.015);

      // Pin core sphere
      const pinGeo = new THREE.SphereGeometry(0.06, pinSegments, pinSegments);
      const pinMat = new THREE.MeshBasicMaterial({
        color: parseInt(cluster.color.replace('#', '0x')),
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { type: 'cluster', id: cluster.id, data: cluster };
      clustersGroup.add(pinMesh);
      clusterMeshes.push(pinMesh);

      // Pulsing outer beacon ring
      const ringGeo = new THREE.RingGeometry(0.075, 0.115, ringSegments);
      const ringMat = new THREE.MeshBasicMaterial({
        color: parseInt(cluster.color.replace('#', '0x')),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(0, 0, 0);
      clustersGroup.add(ringMesh);
    });
    stateRef.current.clusterMeshes = clusterMeshes;

    // 8. Global Partner Countries Pins (14 Nations)
    const countriesGroup = new THREE.Group();
    globeGroup.add(countriesGroup);
    stateRef.current.countriesGroup = countriesGroup;

    const countryMeshes: THREE.Mesh[] = [];

    GLOBAL_PARTNER_COUNTRIES.forEach((country) => {
      if (country.id === 'india') return;
      const pos = latLngToVector3(country.lat, country.lng, globeRadius * 1.015);

      // Hexagonal marker
      const markerGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 6);
      const markerMat = new THREE.MeshBasicMaterial({
        color: parseInt(country.color.replace('#', '0x')),
      });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(pos);
      markerMesh.lookAt(0, 0, 0);
      markerMesh.rotateX(Math.PI / 2);
      markerMesh.userData = { type: 'country', id: country.id, data: country };
      countriesGroup.add(markerMesh);
      countryMeshes.push(markerMesh);

      // Outer partner ring
      const partnerRingGeo = new THREE.RingGeometry(0.07, 0.10, ringSegments);
      const partnerRingMat = new THREE.MeshBasicMaterial({
        color: parseInt(country.color.replace('#', '0x')),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const partnerRing = new THREE.Mesh(partnerRingGeo, partnerRingMat);
      partnerRing.position.copy(pos);
      partnerRing.lookAt(0, 0, 0);
      countriesGroup.add(partnerRing);
    });
    stateRef.current.countryMeshes = countryMeshes;

    // 9. Great Circle Flight & Skill Mobility Arcs
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    const arcSteps = isMobile ? 18 : 36;
    SKILL_MOBILITY_ARCS.forEach((arc) => {
      const p1 = latLngToVector3(arc.from.lat, arc.from.lng, globeRadius * 1.015);
      const p2 = latLngToVector3(arc.to.lat, arc.to.lng, globeRadius * 1.015);

      const distance = p1.distanceTo(p2);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const altitude = globeRadius + Math.min(distance * 0.32, 1.1);
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(arcSteps);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: parseInt(arc.color.replace('#', '0x')),
        transparent: true,
        opacity: 0.65,
      });
      const lineMesh = new THREE.Line(curveGeo, curveMat);
      arcsGroup.add(lineMesh);
    });

    // 10. Starfield Background
    const starCount = isMobile ? 160 : 420;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 16;
      starPos[i + 1] = (Math.random() - 0.5) * 16;
      starPos[i + 2] = (Math.random() - 0.5) * 16;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 11. Raycaster Setup for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Raycast helper to find tapped or hovered interactive mesh
    const raycastInteractives = (clientX: number, clientY: number) => {
      if (!container || !camera) return null;
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const interactives = [...stateRef.current.clusterMeshes, ...stateRef.current.countryMeshes];
      const hits = raycaster.intersectObjects(interactives);
      return hits.length > 0 ? (hits[0].object as THREE.Mesh) : null;
    };

    // 12. HIGH-PERFORMANCE TOUCH & MOUSE CONTROLS WITH MOMENTUM
    const handlePointerDown = (clientX: number, clientY: number) => {
      const state = stateRef.current;
      state.isDragging = true;
      state.dragStartX = clientX;
      state.dragStartY = clientY;
      state.lastX = clientX;
      state.lastY = clientY;
      state.touchStartTime = performance.now();
      state.hasMovedSignificantly = false;
      state.velocityX = 0;
      state.velocityY = 0;
      state.lastInteractionTime = performance.now();
      container.style.cursor = 'grabbing';
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const state = stateRef.current;
      if (!state.globeGroup) return;

      const deltaX = clientX - state.lastX;
      const deltaY = clientY - state.lastY;

      if (state.isDragging) {
        const totalDist = Math.hypot(clientX - state.dragStartX, clientY - state.dragStartY);
        if (totalDist > 7) {
          state.hasMovedSignificantly = true;
        }

        // Adjust rotation sensitivity
        const sensitivity = isMobile ? 0.0065 : 0.007;
        state.globeGroup.rotation.y += deltaX * sensitivity;
        state.globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, state.globeGroup.rotation.x + deltaY * sensitivity));

        // Track velocity with smoothing for momentum fling
        state.velocityX = deltaX * 0.005;
        state.velocityY = deltaY * 0.005;

        state.lastX = clientX;
        state.lastY = clientY;
        state.lastInteractionTime = performance.now();
      } else {
        // Hover raycasting (desktop only)
        if (!isMobile) {
          const hit = raycastInteractives(clientX, clientY);
          if (hit?.userData?.type === 'cluster') {
            callbacksRef.current.onHoverCluster(hit.userData.id);
            callbacksRef.current.onHoverCountry(null);
            container.style.cursor = 'pointer';
            return;
          } else if (hit?.userData?.type === 'country') {
            callbacksRef.current.onHoverCountry(hit.userData.id);
            callbacksRef.current.onHoverCluster(null);
            container.style.cursor = 'pointer';
            return;
          }
          callbacksRef.current.onHoverCluster(null);
          callbacksRef.current.onHoverCountry(null);
          container.style.cursor = 'grab';
        }
      }
    };

    const handlePointerUp = (clientX: number, clientY: number) => {
      const state = stateRef.current;
      const wasDragging = state.isDragging;
      state.isDragging = false;
      container.style.cursor = 'grab';
      state.lastInteractionTime = performance.now();

      const touchDuration = performance.now() - state.touchStartTime;
      const totalDist = Math.hypot(clientX - state.dragStartX, clientY - state.dragStartY);

      // If it was a quick tap (< 300ms and < 9px movement), treat as click/selection
      if (wasDragging && (!state.hasMovedSignificantly || (touchDuration < 320 && totalDist < 9))) {
        const hit = raycastInteractives(clientX, clientY);
        if (hit?.userData?.type === 'cluster') {
          callbacksRef.current.onSelectCluster(hit.userData.data);
          callbacksRef.current.onHoverCluster(null);
        } else if (hit?.userData?.type === 'country') {
          callbacksRef.current.onSelectCountry(hit.userData.data);
          callbacksRef.current.onHoverCountry(null);
        }
      }
    };

    // Mouse Listeners
    const onMouseDown = (e: MouseEvent) => {
      handlePointerDown(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };
    const onMouseUp = (e: MouseEvent) => {
      handlePointerUp(e.clientX, e.clientY);
    };

    // Mobile Touch Listeners (optimized for 60fps & single finger drag)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (touch) {
        handlePointerUp(touch.clientX, touch.clientY);
      } else {
        stateRef.current.isDragging = false;
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 13. Smooth Animation Loop with Inertia Momentum Damping
    const clock = new THREE.Clock();

    const animate = () => {
      stateRef.current.animationId = requestAnimationFrame(animate);
      const state = stateRef.current;
      const elapsedTime = clock.getElapsedTime();

      if (state.globeGroup) {
        // Apply inertia velocity decay when user releases touch
        if (!state.isDragging) {
          if (Math.abs(state.velocityX) > 0.0001 || Math.abs(state.velocityY) > 0.0001) {
            state.globeGroup.rotation.y += state.velocityX;
            state.globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, state.globeGroup.rotation.x + state.velocityY));

            // Friction damping factor (0.94 creates a natural, tactile glide)
            state.velocityX *= 0.94;
            state.velocityY *= 0.94;
          } else {
            // Gentle auto-rotation when user has been idle for > 1.8 seconds
            const idleTime = performance.now() - state.lastInteractionTime;
            if (
              idleTime > 1800 &&
              !callbacksRef.current.hoveredClusterId &&
              !callbacksRef.current.hoveredCountryId &&
              !callbacksRef.current.selectedClusterId &&
              !callbacksRef.current.selectedCountryId
            ) {
              state.globeGroup.rotation.y += 0.0014;
            }
          }
        }

        // Pulse cluster rings
        if (state.clustersGroup) {
          state.clustersGroup.children.forEach((child, idx) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
              const scale = 1 + Math.sin(elapsedTime * 3.4 + idx * 0.7) * 0.22;
              child.scale.set(scale, scale, scale);
            }
          });
        }

        // Pulse country rings
        if (state.countriesGroup) {
          state.countriesGroup.children.forEach((child, idx) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
              const scale = 1 + Math.sin(elapsedTime * 2.8 + idx * 0.6) * 0.18;
              child.scale.set(scale, scale, scale);
            }
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsReady(true);

    // 14. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 15. Cleanup & Resource Disposal
    return () => {
      cancelAnimationFrame(stateRef.current.animationId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Memory cleanup for WebGL
      globeGeo.dispose();
      globeMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      worldTexture.dispose();
      sensorGeo.dispose();
      sensorMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full rounded-2xl cursor-grab active:cursor-grabbing relative select-none touch-none"
        title="Interactive 3D World & India Globe - Swipe to rotate with momentum, tap any node"
      />

      {/* Touch Interaction Hint for Mobile Viewports */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[10px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80 shadow-md max-w-[95%] truncate pointer-events-none z-20 flex items-center gap-1.5">
        <Activity className="h-3 w-3 text-[#38BDF8] animate-pulse shrink-0" />
        <span>Swipe to rotate 360° • Tap cluster node to inspect</span>
      </div>
    </div>
  );
};

/**
 * Main Exported Component:
 * Wraps the 3D globe in React Suspense with the high-tech LMIS Telemetry Fallback
 */
export const InteractiveGlobeR3F: React.FC<InteractiveGlobeR3FProps> = (props) => {
  return (
    <Suspense fallback={<GlobeSuspenseFallback />}>
      <InternalGlobeView {...props} />
    </Suspense>
  );
};
