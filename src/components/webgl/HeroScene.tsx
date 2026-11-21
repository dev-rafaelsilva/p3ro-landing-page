"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Plano fotográfico com shader (a foto real como protagonista 3D)    */
/* ------------------------------------------------------------------ */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Curvatura sutil + ondulação viva reagindo ao tempo e ao cursor.
    float d = distance(uv, vec2(0.5));
    float wave = sin(uv.x * 6.0 + uTime * 0.6) * 0.012
               + cos(uv.y * 5.0 - uTime * 0.5) * 0.010;
    pos.z += wave * (0.4 + uProgress);
    pos.z += (uMouse.x * (uv.x - 0.5) + uMouse.y * (uv.y - 0.5)) * 0.18;
    pos.z -= d * d * 0.25; // leve abaulamento nas bordas

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uProgress;
  uniform float uScroll;
  uniform float uVelocity;
  uniform vec2 uMouse;
  uniform float uPlaneAspect;
  uniform float uImageAspect;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    // "background-size: cover"
    vec2 ratio = vec2(
      min(uPlaneAspect / uImageAspect, 1.0),
      min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Zoom de entrada + parallax de scroll (recuo lento) + parallax de mouse.
    float zoom = mix(1.14, 1.0, uProgress) + uScroll * 0.08;
    uv = (uv - 0.5) / zoom + 0.5;
    uv += uMouse * 0.018;

    // Aberração cromática (cresce com a velocidade do cursor).
    vec2 dir = uv - 0.5;
    float ab = 0.0016 + uVelocity * 0.9 + uScroll * 0.004;
    float r = texture2D(uTex, uv + dir * ab).r;
    float g = texture2D(uTex, uv).g;
    float b = texture2D(uTex, uv - dir * ab).b;
    vec3 col = vec3(r, g, b);

    // Color grade quente (ember) + brilho nas altas luzes.
    col *= vec3(1.07, 1.0, 0.9);
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col += vec3(0.91, 0.54, 0.24) * pow(lum, 2.2) * 0.14;

    // Vinheta cinematográfica (intensifica ao sair da hero).
    float vig = smoothstep(0.95, 0.35, distance(vUv, vec2(0.5)));
    col *= mix(1.0, vig, 0.55 + uScroll * 0.25);

    // Grão animado.
    float grain = hash(vUv * vec2(1280.0, 720.0) + uTime) - 0.5;
    col += grain * 0.05;

    // Entrada: do breu para a imagem.
    col *= smoothstep(0.0, 0.6, uProgress);

    // Fade ao rolar para fora.
    float alpha = (1.0 - smoothstep(0.55, 1.0, uScroll));

    gl_FragColor = vec4(col, alpha);
  }
`;

function PhotoPlane({ textureUrl, imageAspect }: { textureUrl: string; imageAspect: number }) {
  const tex = useTexture(textureUrl);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const mouse = useRef(new THREE.Vector2(0, 0));
  const lastPointer = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPlaneAspect: { value: 1 },
      uImageAspect: { value: imageAspect },
    }),
    [tex, imageAspect]
  );

  useFrame((state, delta) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;

    // Entrada suave 0 -> 1.
    u.uProgress.value = Math.min(1, u.uProgress.value + delta / 1.8);

    // Scroll normalizado da primeira dobra.
    const sc = typeof window !== "undefined"
      ? Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
      : 0;
    u.uScroll.value += (sc - u.uScroll.value) * 0.1;

    // Parallax + velocidade do cursor.
    const px = state.pointer.x * 0.5;
    const py = state.pointer.y * 0.5;
    mouse.current.x += (px - mouse.current.x) * 0.06;
    mouse.current.y += (py - mouse.current.y) * 0.06;
    u.uMouse.value.set(mouse.current.x, mouse.current.y);

    const vx = state.pointer.x - lastPointer.current.x;
    const vy = state.pointer.y - lastPointer.current.y;
    lastPointer.current.set(state.pointer.x, state.pointer.y);
    const speed = Math.min(0.02, Math.hypot(vx, vy) * 0.01);
    u.uVelocity.value += (speed - u.uVelocity.value) * 0.1;

    u.uPlaneAspect.value = viewport.width / viewport.height;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 48, 48]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Partículas de brasa (atmosfera)                                    */
/* ------------------------------------------------------------------ */

const emberVert = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSpeed;
  attribute float aOffset;
  attribute float aScale;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float t = uTime * aSpeed + aOffset;
    pos.y += mod(t, 6.0) - 3.0;                  // sobe e reinicia
    pos.x += sin(t * 0.6 + aOffset) * 0.25;      // deriva lateral
    float life = mod(t, 6.0) / 6.0;
    vAlpha = sin(life * 3.14159) * 0.7;          // surge e some
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * aScale * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const emberFrag = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(1.0, 0.62, 0.32, a);
  }
`;

function Embers({ count = 240 }: { count?: number }) {
  const { viewport } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const offset = new Float32Array(count);
    const scale = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      speed[i] = 0.2 + Math.random() * 0.5;
      offset[i] = Math.random() * 6;
      scale[i] = 0.5 + Math.random() * 1.6;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    g.setAttribute("aOffset", new THREE.BufferAttribute(offset, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 26 } }),
    []
  );

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
  });

  return (
    <points geometry={geo} scale={[viewport.width / 10, viewport.height / 6, 1]}>
      <shaderMaterial
        ref={mat}
        vertexShader={emberVert}
        fragmentShader={emberFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */

export default function HeroScene({
  textureUrl,
  imageAspect,
  onReady,
}: {
  textureUrl: string;
  imageAspect: number;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={() => onReady?.()}
    >
      <Suspense fallback={null}>
        <PhotoPlane textureUrl={textureUrl} imageAspect={imageAspect} />
      </Suspense>
      <Embers />
    </Canvas>
  );
}
