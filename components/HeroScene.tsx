"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { LOGO_SHAPES } from "@/lib/logo-shape";

const CORAL = "#EF5245";
const PINK = "#EC2563";

/** Pointer position in the range -1..1, tracked on the window so the canvas can sit behind the page content. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function useLogoGeometry() {
  return useMemo(() => {
    const shapes = LOGO_SHAPES.map((pts) => {
      const shape = new THREE.Shape();
      pts.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
      shape.closePath();
      return shape;
    });
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.045,
      bevelSegments: 5,
      curveSegments: 6,
    });
    geo.center();

    // Paint the logo's diagonal coral-to-pink gradient into vertex colours.
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const from = new THREE.Color(CORAL);
    const to = new THREE.Color(PINK);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.clamp(((pos.getX(i) - pos.getY(i)) / 3.2 + 1) / 2, 0, 1);
      c.copy(from).lerp(to, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);
}

type RingProps = { radius: number; tilt: [number, number, number]; speed: number; color: string; opacity: number; satellites: number };

function Ring({ radius, tilt, speed, color, opacity, satellites }: RingProps) {
  const spin = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.z += dt * speed;
  });
  const dots = useMemo(
    () =>
      Array.from({ length: satellites }, (_, i) => {
        const a = (i / satellites) * Math.PI * 2 + radius;
        return [Math.cos(a) * radius, Math.sin(a) * radius, 0] as [number, number, number];
      }),
    [radius, satellites],
  );
  return (
    <group rotation={tilt}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, 0.008, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
        {dots.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[i % 2 ? 0.05 : 0.085, 20, 20]} />
            <meshStandardMaterial color={i % 2 ? "#ffffff" : PINK} emissive={i % 2 ? "#ffffff" : PINK} emissiveIntensity={1.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Dust({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color("#ffffff"), new THREE.Color(CORAL), new THREE.Color(PINK)];
    // Deterministic pseudo-random so the field looks the same on every visit.
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rnd() - 0.5) * 22;
      positions[i * 3 + 1] = (rnd() - 0.5) * 10;
      positions[i * 3 + 2] = -rnd() * 9 + 2;
      const c = palette[i % 5 === 0 ? 1 : i % 3 === 0 ? 2 : 0];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Mark({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const rig = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const float = useRef<THREE.Group>(null);
  const geometry = useLogoGeometry();
  const { viewport, size } = useThree();

  // Lay the mark out in screen terms: right of the copy on wide screens, above it on phones.
  const unitsPerPx = viewport.height / size.height;
  const wide = size.width >= 1024;
  const targetPx = wide ? Math.min(430, size.height * 0.5) : Math.min(230, size.width * 0.5);
  const scale = (targetPx * unitsPerPx) / 3;
  const x = wide ? viewport.width * 0.245 : 0;
  const y = wide ? 0.05 : viewport.height / 2 - 225 * unitsPerPx;

  const intro = useRef(0);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    intro.current = Math.min(1, intro.current + dt / 1.4);
    const e = 1 - Math.pow(1 - intro.current, 4);
    if (rig.current) {
      rig.current.scale.setScalar(scale * (0.55 + 0.45 * e));
      rig.current.position.set(x, y - window.scrollY * unitsPerPx * 0.25, 0);
    }
    if (tilt.current) {
      const ty = pointer.current.x * 0.45 + (1 - e) * -2.4 + Math.sin(t * 0.35) * 0.12 - 0.22;
      const tx = pointer.current.y * 0.25 + 0.06;
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, ty, 3.2, dt);
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, tx, 3.2, dt);
    }
    if (float.current) {
      float.current.position.y = Math.sin(t * 0.9) * 0.09;
      float.current.rotation.z = Math.sin(t * 0.55) * 0.025;
    }
  });

  return (
    <group ref={rig}>
      <group ref={tilt}>
        <group ref={float}>
          <mesh geometry={geometry}>
            <meshPhysicalMaterial vertexColors roughness={0.3} metalness={0.12} clearcoat={0.85} clearcoatRoughness={0.22} />
          </mesh>
        </group>
        <Ring radius={2.35} tilt={[1.25, 0.2, 0]} speed={0.22} color="#ffffff" opacity={0.28} satellites={3} />
        <Ring radius={2.9} tilt={[1.05, -0.55, 0.3]} speed={-0.15} color={PINK} opacity={0.55} satellites={2} />
        <Ring radius={3.5} tilt={[1.45, 0.5, -0.2]} speed={0.09} color={CORAL} opacity={0.3} satellites={4} />
      </group>
    </group>
  );
}

function Scene() {
  const pointer = usePointer();
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[-4, 6, 7]} intensity={2.4} />
      <directionalLight position={[5, -2, 4]} intensity={0.9} color="#ffd9e2" />
      <pointLight position={[4, 1, -3]} intensity={60} color={PINK} />
      <pointLight position={[-5, -3, 2]} intensity={30} color={CORAL} />
      <Dust />
      <Mark pointer={pointer} />
    </>
  );
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** The 3D hero: the A1 Rank mark extruded from the real logo outline, with orbiting rings. */
export default function HeroScene({ fallback }: { fallback: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setSupported(hasWebGL());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Stop rendering when the hero is scrolled away, to save battery.
  useEffect(() => {
    if (!host.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.02 });
    io.observe(host.current);
    return () => io.disconnect();
  }, []);

  if (supported === false) return <>{fallback}</>;

  return (
    <div ref={host} className="absolute inset-0" aria-hidden>
      {supported ? (
        <Boundary fallback={fallback}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 9], fov: 35 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            frameloop={visible && !reduced ? "always" : "demand"}
            style={{ pointerEvents: "none" }}
          >
            <Scene />
          </Canvas>
        </Boundary>
      ) : null}
    </div>
  );
}
