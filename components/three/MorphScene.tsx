"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * MorphScene renders the site's recurring visual motif: a translucent
 * "molecule" (science / blue) that slowly dissolves into a flowing
 * "ribbon" (fashion / pink) as `progress` moves from 0 -> 1.
 *
 * progress is driven externally (scroll, or a fixed value per section)
 * so the same component can be reused in the Hero, Fashion, and Contact
 * sections at different sizes and blend states.
 */

function lerpColor(a: string, b: string, t: number) {
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  return ca.lerp(cb, t);
}

// deterministic pseudo-random so the drift field is stable across renders
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Biconcave-disc profile approximating a real red blood cell cross-section
// (Evans & Fung parameterization), revolved into a lathe geometry.
function useRBCGeometry(radius: number) {
  return useMemo(() => {
    const R = radius;
    const a0 = 0.2,
      a1 = 2.0,
      a2 = -1.123;
    const segments = 20;
    const points: THREE.Vector2[] = [];
    // trace from center-top, out to the rim, to center-bottom
    for (let i = segments; i >= 0; i--) {
      const x = (i / segments) * R;
      const ratio = x / R;
      const halfThickness =
        0.5 * R * Math.sqrt(Math.max(0, 1 - ratio * ratio)) * (a0 + a1 * ratio * ratio + a2 * ratio ** 4);
      points.push(new THREE.Vector2(x, halfThickness * 0.55));
    }
    for (let i = 1; i <= segments; i++) {
      const x = (i / segments) * R;
      const ratio = x / R;
      const halfThickness =
        0.5 * R * Math.sqrt(Math.max(0, 1 - ratio * ratio)) * (a0 + a1 * ratio * ratio + a2 * ratio ** 4);
      points.push(new THREE.Vector2(R - x, -halfThickness * 0.55));
    }
    return new THREE.LatheGeometry(points, 32);
  }, [radius]);
}

// irregular "blob" geometry (icosahedron with noise-displaced vertices),
// used for platelets and the macrophage's amoeba-like body
function useBlobGeometry(radius: number, seed: number, roughnessAmt = 0.3) {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
      const n = v.clone().normalize();
      const noise = seededRandom(seed + i * 0.37) * roughnessAmt - roughnessAmt / 2;
      v.addScaledVector(n, noise * radius);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [radius, seed, roughnessAmt]);
}

function driftMotion(
  mesh: THREE.Object3D | null,
  position: [number, number, number],
  seed: number,
  state: { clock: { elapsedTime: number } },
  ampY = 0.08,
  ampX = 0.05,
  speed = 0.5,
) {
  if (!mesh) return;
  mesh.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + seed) * ampY;
  mesh.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.7 + seed) * ampX;
}

// red blood cell — biconcave disc, the majority cell type in the field
function Erythrocyte({
  position,
  rotationSeed,
  opacity,
  scale,
  color,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
  color: THREE.Color;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useRBCGeometry(0.16);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * (0.18 + (rotationSeed % 1) * 0.15);
    mesh.current.rotation.y += delta * (0.12 + (rotationSeed % 1) * 0.1);
    driftMotion(mesh.current, position, rotationSeed, state);
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={position} scale={scale}>
      {/* wet, translucent "cell membrane" material — light passes through
          the thin center more than the thick rim, like real microscopy */}
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity * 0.8}
        roughness={0.1}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.06}
        transmission={0.55}
        thickness={0.35}
        ior={1.35}
        attenuationColor={color}
        attenuationDistance={0.7}
      />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.075, 24]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={opacity * 0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.13, 0.16, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </mesh>
  );
}

// platelet — tiny irregular fragment, no nucleus
function Platelet({
  position,
  rotationSeed,
  opacity,
  scale,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useBlobGeometry(0.06, rotationSeed * 53, 0.5);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.4;
    mesh.current.rotation.z += delta * 0.3;
    driftMotion(mesh.current, position, rotationSeed, state, 0.1, 0.07, 0.8);
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={position}
      scale={[scale, scale * 0.55, scale]}
    >
      <meshPhysicalMaterial
        color="#D6546B"
        transparent
        opacity={opacity * 0.85}
        roughness={0.2}
        clearcoat={0.8}
        clearcoatRoughness={0.15}
      />
    </mesh>
  );
}

type NucleusShape = "round" | "kidney" | "bilobed" | "multilobed" | "granular";

// generic white blood cell: round cytoplasm + a nucleus whose shape/color
// varies by type (lymphocyte, monocyte, neutrophil, eosinophil, basophil)
function WhiteCell({
  position,
  rotationSeed,
  opacity,
  scale,
  cytoplasmColor,
  nucleusColor,
  nucleusShape,
  lobeCount = 3,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
  cytoplasmColor: string;
  nucleusColor: string;
  nucleusShape: NucleusShape;
  lobeCount?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (0.15 + (rotationSeed % 1) * 0.1);
    group.current.rotation.x += delta * 0.07;
    driftMotion(group.current, position, rotationSeed, state, 0.09, 0.06, 0.45);
  });

  const lobes = useMemo(() => {
    const n =
      nucleusShape === "bilobed" ? 2 : nucleusShape === "multilobed" ? lobeCount : 1;
    const offsets: { pos: [number, number, number]; squash: boolean }[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rotationSeed;
      const r = n === 1 ? 0 : 0.08;
      offsets.push({
        pos: [Math.cos(a) * r, Math.sin(a) * r * 0.6, (seededRandom(rotationSeed * 7 + i) - 0.5) * 0.06],
        squash: nucleusShape === "kidney",
      });
    }
    return offsets;
  }, [nucleusShape, lobeCount, rotationSeed]);

  const granules = useMemo(() => {
    if (nucleusShape !== "granular") return [];
    return Array.from({ length: 12 }, (_, i) => {
      const a = seededRandom(rotationSeed * 3 + i) * Math.PI * 2;
      const r = 0.05 + seededRandom(rotationSeed * 5 + i) * 0.09;
      const y = (seededRandom(rotationSeed * 9 + i) - 0.5) * 0.13;
      return [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number];
    });
  }, [nucleusShape, rotationSeed]);

  return (
    <group ref={group} position={position} scale={scale}>
      {/* cytoplasm */}
      <mesh>
        <sphereGeometry args={[0.19, 20, 20]} />
        <meshPhysicalMaterial
          color={cytoplasmColor}
          transparent
          opacity={opacity * 0.5}
          roughness={0.25}
          transmission={0.35}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
      </mesh>
      {/* nucleus lobe(s) */}
      {lobes.map((l, i) => (
        <mesh
          key={i}
          position={l.pos}
          scale={l.squash ? [1, 0.65, 0.55] : 1}
        >
          <sphereGeometry args={[nucleusShape === "round" ? 0.13 : 0.1, 16, 16]} />
          <meshStandardMaterial
            color={nucleusColor}
            roughness={0.4}
            transparent
            opacity={opacity * 0.95}
          />
        </mesh>
      ))}
      {/* granules scattered through the cytoplasm (basophil) */}
      {granules.map((p, i) => (
        <mesh key={`g-${i}`} position={p}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={nucleusColor} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
}

// dendritic cell — irregular body with long spiky protrusions
function DendriticCell({
  position,
  rotationSeed,
  opacity,
  scale,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.2;
    driftMotion(group.current, position, rotationSeed, state, 0.07, 0.05, 0.35);
  });

  const spikes = useMemo(() => {
    const n = 8;
    return Array.from({ length: n }, (_, i) => {
      const theta = seededRandom(rotationSeed * 11 + i) * Math.PI * 2;
      const phi = seededRandom(rotationSeed * 13 + i) * Math.PI;
      const len = 0.13 + seededRandom(rotationSeed * 17 + i) * 0.12;
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir,
      );
      return { pos: dir.clone().multiplyScalar(0.13 + len / 2).toArray() as [number, number, number], quaternion, len };
    });
  }, [rotationSeed]);

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshPhysicalMaterial
          color="#8A6BAE"
          transparent
          opacity={opacity * 0.8}
          roughness={0.3}
          clearcoat={0.6}
        />
      </mesh>
      {spikes.map((s, i) => (
        <mesh key={i} position={s.pos} quaternion={s.quaternion}>
          <coneGeometry args={[0.022, s.len, 6]} />
          <meshPhysicalMaterial
            color="#8A6BAE"
            transparent
            opacity={opacity * 0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// macrophage — the largest cell, an irregular amoeba-like blob
function Macrophage({
  position,
  rotationSeed,
  opacity,
  scale,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useBlobGeometry(0.26, rotationSeed * 97, 0.35);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.rotation.x += delta * 0.06;
    driftMotion(mesh.current, position, rotationSeed, state, 0.06, 0.04, 0.3);
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={position} scale={scale}>
      <meshPhysicalMaterial
        color="#6E7FA6"
        transparent
        opacity={opacity * 0.55}
        roughness={0.35}
        transmission={0.25}
        clearcoat={0.5}
      />
    </mesh>
  );
}

// chromosome — glowing X-shaped structure, four coiled arms around a
// central centromere (not literally free-floating in blood, but included
// as a genetic/science motif alongside the cells)
function Chromosome({
  position,
  rotationSeed,
  opacity,
  scale,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
}) {
  const group = useRef<THREE.Group>(null);
  const color = "#8ECFEE";

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.z += delta * 0.05;
    driftMotion(group.current, position, rotationSeed, state, 0.05, 0.04, 0.25);
  });

  const arms = useMemo(() => {
    const angles = [55, 125, 235, 305];
    const armLength = 0.5;
    return angles.map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const dir = new THREE.Vector3(
        Math.cos(rad),
        Math.sin(rad),
        (seededRandom(rotationSeed * 19 + i) - 0.5) * 0.3,
      ).normalize();
      const capsuleQuat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir,
      );
      const ringQuat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        dir,
      );
      const midPos = dir.clone().multiplyScalar(armLength * 0.5).toArray() as [
        number,
        number,
        number,
      ];
      const bumps = Array.from({ length: 5 }, (_, b) => {
        const t = (b + 1) / 6;
        return dir.clone().multiplyScalar(t * armLength).toArray() as [
          number,
          number,
          number,
        ];
      });
      return { capsuleQuat, ringQuat, midPos, bumps, armLength };
    });
  }, [rotationSeed]);

  return (
    <group ref={group} position={position} scale={scale}>
      {/* centromere */}
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity * 0.9}
          roughness={0.3}
          clearcoat={0.7}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      {arms.map((arm, i) => (
        <group key={i}>
          <mesh position={arm.midPos} quaternion={arm.capsuleQuat}>
            <capsuleGeometry args={[0.032, arm.armLength * 0.7, 4, 8]} />
            <meshPhysicalMaterial
              color={color}
              transparent
              opacity={opacity * 0.7}
              roughness={0.4}
              clearcoat={0.6}
              emissive={color}
              emissiveIntensity={0.12}
            />
          </mesh>
          {/* coiled-chromatin texture bumps along the arm */}
          {arm.bumps.map((b, bi) => (
            <mesh key={bi} position={b} quaternion={arm.ringQuat}>
              <torusGeometry args={[0.046, 0.015, 8, 12]} />
              <meshPhysicalMaterial
                color={color}
                transparent
                opacity={opacity * 0.45}
                roughness={0.45}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// antibody (immunoglobulin) — small Y-shaped protein that actually does
// circulate freely in blood plasma
function Antibody({
  position,
  rotationSeed,
  opacity,
  scale,
}: {
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
}) {
  const group = useRef<THREE.Group>(null);
  const color = "#EAF6FB";

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.3;
    group.current.rotation.x += delta * 0.1;
    driftMotion(group.current, position, rotationSeed, state, 0.1, 0.08, 0.6);
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, -0.06, 0]}>
        <capsuleGeometry args={[0.014, 0.09, 4, 6]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity * 0.85}
          roughness={0.3}
          clearcoat={0.7}
        />
      </mesh>
      <mesh position={[-0.045, 0.06, 0]} rotation={[0, 0, Math.PI / 5]}>
        <capsuleGeometry args={[0.014, 0.09, 4, 6]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity * 0.85}
          roughness={0.3}
          clearcoat={0.7}
        />
      </mesh>
      <mesh position={[0.045, 0.06, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <capsuleGeometry args={[0.014, 0.09, 4, 6]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity * 0.85}
          roughness={0.3}
          clearcoat={0.7}
        />
      </mesh>
    </group>
  );
}

type CellKind =
  | "erythrocyte"
  | "platelet"
  | "lymphocyte"
  | "monocyte"
  | "neutrophil"
  | "eosinophil"
  | "basophil"
  | "dendritic"
  | "macrophage"
  | "antibody"
  | "chromosome";

// roughly matches real blood proportions: mostly erythrocytes + platelets,
// with occasional white cells, antibodies, and a rarer chromosome accent
function pickKind(seed: number): CellKind {
  const r = seededRandom(seed);
  if (r < 0.4) return "erythrocyte";
  if (r < 0.55) return "platelet";
  if (r < 0.63) return "lymphocyte";
  if (r < 0.7) return "neutrophil";
  if (r < 0.76) return "monocyte";
  if (r < 0.8) return "eosinophil";
  if (r < 0.83) return "basophil";
  if (r < 0.86) return "dendritic";
  if (r < 0.88) return "macrophage";
  if (r < 0.94) return "antibody";
  return "chromosome";
}

function Cell({
  kind,
  position,
  rotationSeed,
  opacity,
  scale,
  rbcColor,
}: {
  kind: CellKind;
  position: [number, number, number];
  rotationSeed: number;
  opacity: number;
  scale: number;
  rbcColor: THREE.Color;
}) {
  switch (kind) {
    case "erythrocyte":
      return (
        <Erythrocyte
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale}
          color={rbcColor}
        />
      );
    case "platelet":
      return (
        <Platelet
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale * 0.5}
        />
      );
    case "lymphocyte":
      return (
        <WhiteCell
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale * 0.9}
          cytoplasmColor="#BFD9EC"
          nucleusColor="#5B3E91"
          nucleusShape="round"
        />
      );
    case "monocyte":
      return (
        <WhiteCell
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale * 1.15}
          cytoplasmColor="#AEC7D6"
          nucleusColor="#4A3A7A"
          nucleusShape="kidney"
        />
      );
    case "neutrophil":
      return (
        <WhiteCell
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale}
          cytoplasmColor="#F3DCE8"
          nucleusColor="#8B6BB0"
          nucleusShape="multilobed"
          lobeCount={4}
        />
      );
    case "eosinophil":
      return (
        <WhiteCell
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale}
          cytoplasmColor="#F5C7B8"
          nucleusColor="#E0654D"
          nucleusShape="bilobed"
        />
      );
    case "basophil":
      return (
        <WhiteCell
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale}
          cytoplasmColor="#C9B8DE"
          nucleusColor="#4A3B6B"
          nucleusShape="granular"
        />
      );
    case "dendritic":
      return (
        <DendriticCell
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale}
        />
      );
    case "macrophage":
      return (
        <Macrophage
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale * 1.3}
        />
      );
    case "antibody":
      return (
        <Antibody
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale * 0.9}
        />
      );
    case "chromosome":
      return (
        <Chromosome
          position={position}
          rotationSeed={rotationSeed}
          opacity={opacity}
          scale={scale * 0.85}
        />
      );
  }
}

function Molecule({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  // core helix cluster
  const primaryNodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      pts.push([Math.sin(t) * 1.1, (i / count) * 2.4 - 1.2, Math.cos(t) * 1.1]);
    }
    return pts;
  }, []);

  // looser field of drifting cells around the cluster, like a microscope
  // field of view with cells scattered at different depths and sizes
  const driftNodes = useMemo(() => {
    const count = 18;
    return Array.from({ length: count }, (_, i) => {
      const radius = 1.3 + seededRandom(i * 4.1 + 1) * 1.1;
      const angle = seededRandom(i * 4.1 + 2) * Math.PI * 2;
      const y = (seededRandom(i * 4.1 + 3) - 0.5) * 2.8;
      return {
        pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        scale: 0.4 + seededRandom(i * 4.1 + 4) * 0.55,
        seed: seededRandom(i * 4.1 + 5) * 10,
      };
    });
  }, []);

  // assign a cell type per node once, deterministically
  const primaryKinds = useMemo(
    () => primaryNodes.map((_, i) => pickKind(i * 2.3 + 100)),
    [primaryNodes],
  );
  const driftKinds = useMemo(
    () => driftNodes.map((_, i) => pickKind(i * 2.3 + 500)),
    [driftNodes],
  );

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  const opacity = Math.max(0, 1 - progress * 1.4);
  if (opacity <= 0.01) return null;

  // the site's blue -> pink brand tint, applied to the red blood cells only
  // (the white cells keep their true-to-life colors so the types stay legible)
  const rbcColor = lerpColor("#E85D6B", "#EE84BE", progress * 0.6);

  return (
    <group ref={group} scale={1 - progress * 0.3}>
      {primaryNodes.map((p, i) => (
        <Cell
          key={`p-${i}`}
          kind={primaryKinds[i]}
          position={p}
          rotationSeed={i * 1.7}
          opacity={opacity}
          scale={1}
          rbcColor={rbcColor}
        />
      ))}
      {driftNodes.map((n, i) => (
        <Cell
          key={`d-${i}`}
          kind={driftKinds[i]}
          position={n.pos}
          rotationSeed={n.seed}
          opacity={opacity * 0.85}
          scale={n.scale}
          rbcColor={rbcColor}
        />
      ))}
    </group>
  );
}

function Ribbon({ progress }: { progress: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(2.6, 1.1, 64, 16), []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += delta * 0.05;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const wave =
        Math.sin(x * 2.2 + state.clock.elapsedTime * 1.1) * 0.18 * progress;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  const opacity = Math.max(0, (progress - 0.15) * 1.3);
  if (opacity <= 0.01) return null;

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial
        color={lerpColor("#A8D4F5", "#E35FA6", progress)}
        transparent
        opacity={opacity * 0.75}
        side={THREE.DoubleSide}
        roughness={0.25}
        metalness={0.15}
      />
    </mesh>
  );
}

function Rig({ progress }: { progress: number }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.25 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#A8D4F5" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#F5A8D4" />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <Molecule progress={progress} />
        <Ribbon progress={progress} />
      </Float>
      <Sparkles
        count={40}
        scale={4}
        size={2}
        speed={0.3}
        color={lerpColor("#A8D4F5", "#F5A8D4", progress)}
        opacity={0.5}
      />
    </>
  );
}

export default function MorphScene({
  progress = 0,
  className = "",
}: {
  progress?: number;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden="true" data-cursor-zone="neutral">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Rig progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}