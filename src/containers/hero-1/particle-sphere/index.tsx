'use client';

import { useRef, useEffect } from 'react';

interface ParticleSphereProps {
  /** Palette of RGB triplets. Each particle picks one at random on spawn. */
  colors?: [number, number, number][];
  /** Ref to the element the sphere should center behind. Falls back to canvas center. */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Sphere radius in pixels. When omitted, auto-sizes to 40% of the target element's smaller dimension, or 28% of the canvas. */
  sphereRadius?: number;
  /** Max random acceleration of particles after they leave the sphere. Default 0.1. Lower = slower drift. */
  driftSpeed?: number;
  /** Initial outward velocity multiplier when particles leave the sphere. Default 0.001. Lower = slower push. */
  exitSpeed?: number;
  /** Number of frames for one full rotation. Higher = slower spin. Default 6000. */
  rotationFrames?: number;
  /** Multiplier applied to each particle's drawn radius. Default 1. Lower = smaller particles. */
  particleSize?: number;
  /** Number of new particles emitted per frame. Higher = denser sphere. Default 8. */
  particlesPerFrame?: number;
  /** Probability (0–1) that a spawned particle drifts out of the sphere. Others stay on the surface. Default 1. */
  exitChance?: number;
}

interface ParticleNode {
  fX: number;
  fY: number;
  fZ: number;
  fVX: number;
  fVY: number;
  fVZ: number;
  fAX: number;
  fAY: number;
  fAZ: number;
  fProjX: number;
  fProjY: number;
  fRotX: number;
  fRotZ: number;
  pPrev: ParticleNode | null;
  pNext: ParticleNode | null;
  fAngle: number;
  fForce: number;
  fGrowDuration: number;
  fWaitDuration: number;
  fShrinkDuration: number;
  fRadiusCurrent: number;
  iFramesAlive: number;
  bIsDead: boolean;
  fAlpha: number;
  iColorIdx: number;
  bExits: boolean;
}

const PI = Math.PI;
const { cos, sin, acos, random, max, min } = Math;
const rnd2 = () => 2.0 * random() - 1.0;

function createParticle(): ParticleNode {
  return {
    fX: 0,
    fY: 0,
    fZ: 0,
    fVX: 0,
    fVY: 0,
    fVZ: 0,
    fAX: 0,
    fAY: 0,
    fAZ: 0,
    fProjX: 0,
    fProjY: 0,
    fRotX: 0,
    fRotZ: 0,
    pPrev: null,
    pNext: null,
    fAngle: 0,
    fForce: 0,
    fGrowDuration: 0,
    fWaitDuration: 0,
    fShrinkDuration: 0,
    fRadiusCurrent: 0,
    iFramesAlive: 0,
    bIsDead: false,
    fAlpha: 0,
    iColorIdx: 0,
    bExits: true,
  };
}

export const ParticleSphere: React.FC<ParticleSphereProps> = ({
  colors = [[139, 85, 255]],
  targetRef,
  sphereRadius,
  driftSpeed = 0.1,
  exitSpeed = 0.001,
  rotationFrames = 2000,
  particleSize = 1,
  particlesPerFrame = 8,
  exitChance = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    const fMaxA = driftSpeed;
    const fStartV = exitSpeed;
    const GROW = 200.0;
    const WAIT = 50.0;
    const SHRINK = 250.0;
    const FRAMES_TO_ROTATE = rotationFrames;
    const PERSPECTIVE = 250;
    const NEW_PER_FRAME = particlesPerFrame;
    const fVX = (2.0 * PI) / FRAMES_TO_ROTATE;

    let iRadius = 150;
    let projX = 0;
    let projY = 0;
    let fAngle = 0.0;
    let fSinAngle = 0.0;
    let fCosAngle = 0.0;
    let w = 0;
    let h = 0;

    const oRender: { pFirst: ParticleNode | null } = { pFirst: null };
    const oBuffer: { pFirst: ParticleNode | null } = { pFirst: null };

    function initParticle(p: ParticleNode) {
      p.fAngle = random() * PI * 2;
      p.fForce = acos(rnd2());
      p.fAlpha = 0;
      p.bIsDead = false;
      p.iFramesAlive = 0;
      p.fX = iRadius * sin(p.fForce) * cos(p.fAngle);
      p.fY = iRadius * sin(p.fForce) * sin(p.fAngle);
      p.fZ = iRadius * cos(p.fForce);
      p.fVX = fStartV * p.fX;
      p.fVY = fStartV * p.fY;
      p.fVZ = fStartV * p.fZ;
      p.fGrowDuration = GROW + rnd2() * (GROW / 4.0);
      p.fWaitDuration = WAIT + rnd2() * (WAIT / 4.0);
      p.fShrinkDuration = SHRINK + rnd2() * (SHRINK / 4.0);
      p.fAX = 0;
      p.fAY = 0;
      p.fAZ = 0;
      p.iColorIdx = (random() * colors.length) | 0;
      p.bExits = random() < exitChance;
    }

    function updateParticle(p: ParticleNode) {
      if (p.bExits && p.iFramesAlive > p.fGrowDuration + p.fWaitDuration) {
        p.fVX += p.fAX + fMaxA * rnd2();
        p.fVY += p.fAY + fMaxA * rnd2();
        p.fVZ += p.fAZ + fMaxA * rnd2();
        p.fX += p.fVX;
        p.fY += p.fVY;
        p.fZ += p.fVZ;
      }

      p.fRotX = fCosAngle * p.fX + fSinAngle * p.fZ;
      p.fRotZ = -fSinAngle * p.fX + fCosAngle * p.fZ;
      p.fRadiusCurrent = max(0.01, PERSPECTIVE / (PERSPECTIVE - p.fRotZ));
      p.fProjX = p.fRotX * p.fRadiusCurrent + projX;
      p.fProjY = p.fY * p.fRadiusCurrent + projY;
      p.iFramesAlive += 1;

      if (p.iFramesAlive < p.fGrowDuration) {
        p.fAlpha = (p.iFramesAlive * 1.0) / p.fGrowDuration;
      } else if (p.iFramesAlive < p.fGrowDuration + p.fWaitDuration) {
        p.fAlpha = 1.0;
      } else if (p.iFramesAlive < p.fGrowDuration + p.fWaitDuration + p.fShrinkDuration) {
        p.fAlpha = ((p.fGrowDuration + p.fWaitDuration + p.fShrinkDuration - p.iFramesAlive) * 1.0) / p.fShrinkDuration;
      } else {
        p.bIsDead = true;
      }

      if (p.bIsDead) {
        swapList(p, oRender, oBuffer);
      }

      p.fAlpha *= min(1.0, max(0.5, p.fRotZ / iRadius));
      p.fAlpha = min(1.0, max(0.0, p.fAlpha));
    }

    function swapList(p: ParticleNode | null, src: { pFirst: ParticleNode | null }, dst: { pFirst: ParticleNode | null }): ParticleNode {
      if (p != null) {
        if (src.pFirst === p) {
          src.pFirst = p.pNext;
          if (p.pNext) p.pNext.pPrev = null;
        } else {
          if (p.pPrev) p.pPrev.pNext = p.pNext;
          if (p.pNext) p.pNext.pPrev = p.pPrev;
        }
      } else {
        p = createParticle();
      }
      p.pNext = dst.pFirst;
      if (dst.pFirst) dst.pFirst.pPrev = p;
      dst.pFirst = p;
      p.pPrev = null;
      return p;
    }

    function setSize() {
      const canvasRect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = canvasRect.width;
      h = canvasRect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = targetRef?.current;
      if (target) {
        const targetRect = target.getBoundingClientRect();
        projX = targetRect.left - canvasRect.left + targetRect.width / 2;
        projY = targetRect.top - canvasRect.top + targetRect.height / 2;
        iRadius = sphereRadius ?? min(targetRect.width, targetRect.height) * 0.4;
      } else {
        projX = w / 2;
        projY = h / 2;
        iRadius = sphereRadius ?? min(w, h) * 0.28;
      }
    }

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas.parentElement || canvas);
    if (targetRef?.current) ro.observe(targetRef.current);

    const colorPrefixes = colors.map(([r, g, b]) => `rgba(${r},${g},${b},`);

    function render() {
      ctx.clearRect(0, 0, w, h);
      let p = oRender.pFirst;
      while (p != null) {
        ctx.fillStyle = `${colorPrefixes[p.iColorIdx]}${p.fAlpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(p.fProjX, p.fProjY, p.fRadiusCurrent * particleSize, 0, 2 * PI, false);
        ctx.closePath();
        ctx.fill();
        p = p.pNext;
      }
    }

    function nextFrame() {
      fAngle = (fAngle + fVX) % (2.0 * PI);
      fSinAngle = sin(fAngle);
      fCosAngle = cos(fAngle);

      let added = 0;
      while (added++ < NEW_PER_FRAME) {
        const p = swapList(oBuffer.pFirst, oBuffer, oRender);
        initParticle(p);
      }

      let p = oRender.pFirst;
      while (p != null) {
        const next = p.pNext;
        updateParticle(p);
        p = next;
      }

      render();
      animRef.current = requestAnimationFrame(nextFrame);
    }

    animRef.current = requestAnimationFrame(nextFrame);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [colors, targetRef, sphereRadius, driftSpeed, exitSpeed, rotationFrames, particleSize, particlesPerFrame, exitChance]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};
