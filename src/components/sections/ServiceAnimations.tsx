"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ─── Shared icon data ─────────────────────────────────────────────────────────
// The 12 isologo paths in their natural coordinate space (icon viewBox ≈ 9.71 × 13.14)
// Rendered inside a 100×51 SVG; group is centered via a translate+scale wrapper.

const ICON_PATHS = [
  "M0.836281 6.4209L0 8.39021L2.94047 10.3325L0.836281 6.4209Z",
  "M2.1582 8.17373L4.85589 4.50488L6.44752 6.63605L5.7731 7.93094L4.85589 6.63605L2.83262 9.52257L2.1582 8.17373Z",
  "M4.85594 9.68426L4.10059 8.20053L4.85594 7.14844L5.61129 8.20053L4.85594 9.68426Z",
  "M4.37013 13.1108L0.890117 10.8718L0.134766 8.76758L3.2371 10.8718L4.37013 13.1108Z",
  "M3.91135 8.52441L2.99414 9.8193L4.72066 13.1105V9.98116L3.91135 8.52441Z",
  "M5.07227 9.981V13.0294L7.63506 8.25448L6.60994 6.93262L5.07227 9.981Z",
  "M5.36816 12.9224V13.1382L8.90213 10.7373L9.60352 8.79492L6.44724 10.9261L5.36816 12.9224Z",
  "M6.79785 10.3325L9.00995 6.20508L9.71135 8.36322L6.79785 10.3325Z",
  "M6.77148 6.58255L8.03939 3.10254L8.87568 5.74627L7.74265 7.87744L6.77148 6.58255Z",
  "M6.52865 6.25862L5.04492 4.23536V0L7.25702 4.37024L6.52865 6.25862Z",
  "M4.69391 4.20838V0L2.50879 4.34327L3.21019 6.25862L4.69391 4.20838Z",
  "M1.9426 3.93848L1.02539 6.06965L2.02353 7.87709L2.9947 6.5822L1.9426 3.93848Z",
];

// BROKEN_START — SVG root coordinate offsets applied to the outer <g data-piece> wrappers.
// Values are in SVG user units (not amplified by any scale).
// Icon at FALL_ICON_SCALE=1.8 occupies x(41,59) y(14,37) in the 100×51 box,
// leaving ~14 units of margin on all sides for pieces to float safely.
const BROKEN_START = [
  { x: -10, y: -3.0, r: -18 },
  { x:  -7, y:  1.5, r:   8 },
  { x:   3, y: -2.0, r:  -6 },
  { x: -13, y:  3.5, r:  22 },
  { x:  -4, y:  4.0, r: -14 },
  { x:   8, y:  3.5, r:  16 },
  { x:  12, y:  2.0, r:  -9 },
  { x:   9, y:  4.0, r:  20 },
  { x:   5, y: -1.5, r: -11 },
  { x:   0, y: -3.0, r:   6 },
  { x:  14, y: -3.0, r: -22 },
  { x: -10, y: -4.0, r:  14 },
];

// SCATTER_FALL — Box 2 (Proyectamos): pieces fall to the floor.
// All y values large & positive (down). x spread across the bottom of the 100×51 box.
const SCATTER_FALL = [
  { x: -28, y: 28, r: -145 },
  { x: -14, y: 24, r:  -25 },
  { x:   2, y: 30, r:   75 },
  { x: -36, y: 22, r:  115 },
  { x:  -8, y: 26, r:  -55 },
  { x:  14, y: 28, r:   40 },
  { x:  26, y: 24, r:  -30 },
  { x:  20, y: 30, r:  100 },
  { x:   8, y: 20, r:  -85 },
  { x:  -2, y: 26, r:   50 },
  { x:  32, y: 18, r: -110 },
  { x: -20, y: 20, r:   65 },
];

// SCATTER_ASSEMBLE — Box 3 (Materializamos): same ground positions, pieces rise to assemble.
const SCATTER_ASSEMBLE = [
  { x: -28, y: 28, r: -120 },
  { x: -14, y: 24, r:  -30 },
  { x:   2, y: 30, r:   60 },
  { x: -36, y: 22, r:  100 },
  { x:  -8, y: 26, r:  -50 },
  { x:  14, y: 28, r:   35 },
  { x:  26, y: 24, r:  -40 },
  { x:  20, y: 30, r:   90 },
  { x:   8, y: 20, r:  -75 },
  { x:  -2, y: 26, r:   45 },
  { x:  32, y: 18, r: -100 },
  { x: -20, y: 20, r:   55 },
];

// ─── BOX 1: CRACK ─────────────────────────────────────────────────────────────

// Square: 22×22 centered in 100×51 → from (39,14.5) to (61,36.5), center (50,25.5)
const SQ = { x: 39, y: 14.5, w: 22, h: 22, cx: 50, cy: 25.5 };

// Crack lines radiating from center, each as jagged multi-segment paths
const MAIN_CRACKS = [
  `M${SQ.cx},${SQ.cy} L${SQ.x + 2},${SQ.y + 3} L${SQ.x},${SQ.y + 1}`,
  `M${SQ.cx},${SQ.cy} L${SQ.x + 14},${SQ.y} L${SQ.x + 16},${SQ.y - 1}`,
  `M${SQ.cx},${SQ.cy} L${SQ.x + SQ.w},${SQ.y + 6} L${SQ.x + SQ.w + 1},${SQ.y + 8}`,
  `M${SQ.cx},${SQ.cy} L${SQ.x + SQ.w - 1},${SQ.y + SQ.h} L${SQ.x + SQ.w},${SQ.y + SQ.h + 2}`,
  `M${SQ.cx},${SQ.cy} L${SQ.x + 4},${SQ.y + SQ.h} L${SQ.x + 2},${SQ.y + SQ.h + 1}`,
  `M${SQ.cx},${SQ.cy} L${SQ.x},${SQ.y + SQ.h - 6} L${SQ.x - 1},${SQ.y + SQ.h - 5}`,
];

const SUB_CRACKS = [
  `M${SQ.x + 6},${SQ.y + 6} L${SQ.x + 3},${SQ.y + 3}`,
  `M${SQ.x + 16},${SQ.y + 4} L${SQ.x + 19},${SQ.y + 2}`,
  `M${SQ.x + SQ.w - 3},${SQ.y + SQ.h - 5} L${SQ.x + SQ.w},${SQ.y + SQ.h - 3}`,
  `M${SQ.x + 5},${SQ.y + SQ.h - 4} L${SQ.x + 3},${SQ.y + SQ.h}`,
];

// Fragment polygons — the square split into 6 irregular pieces
// Each piece is a polygon and its drift vector (how far it moves on phase 2)
const FRAGMENTS = [
  { points: `${SQ.x},${SQ.y} ${SQ.x + 11},${SQ.y} ${SQ.cx},${SQ.cy} ${SQ.x + 3},${SQ.y + 9} ${SQ.x},${SQ.y + 7}`, dx: -1.8, dy: -1.5 },
  { points: `${SQ.x + 11},${SQ.y} ${SQ.x + SQ.w},${SQ.y} ${SQ.x + SQ.w},${SQ.y + 8} ${SQ.cx},${SQ.cy}`, dx: 1.5, dy: -1.5 },
  { points: `${SQ.x + SQ.w},${SQ.y + 8} ${SQ.x + SQ.w},${SQ.y + SQ.h} ${SQ.x + SQ.w - 3},${SQ.y + SQ.h} ${SQ.cx},${SQ.cy}`, dx: 2, dy: 0.5 },
  { points: `${SQ.x + SQ.w - 3},${SQ.y + SQ.h} ${SQ.x + 10},${SQ.y + SQ.h} ${SQ.cx},${SQ.cy}`, dx: 0.5, dy: 2 },
  { points: `${SQ.x + 10},${SQ.y + SQ.h} ${SQ.x},${SQ.y + SQ.h} ${SQ.x},${SQ.y + SQ.h - 8} ${SQ.cx},${SQ.cy}`, dx: -2, dy: 1.5 },
  { points: `${SQ.x},${SQ.y + SQ.h - 8} ${SQ.x},${SQ.y + 7} ${SQ.cx},${SQ.cy}`, dx: -1.5, dy: 0 },
];

export function CrackBox({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const trigger = triggerRef.current;
    if (!svg || !trigger) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mainCrackEls = svg.querySelectorAll<SVGPathElement>("[data-crack='main']");
    const subCrackEls = svg.querySelectorAll<SVGPathElement>("[data-crack='sub']");
    const fragEls = svg.querySelectorAll<SVGPolygonElement>("[data-frag]");

    // Measure crack lengths and initialise dashoffset
    mainCrackEls.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    subCrackEls.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.set(fragEls, { x: 0, y: 0 });

    const tl = gsap.timeline({ paused: true });

    // Phase 1 (0–50%): draw main cracks
    tl.to(mainCrackEls, {
      strokeDashoffset: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "none",
    }, 0);

    // Phase 1 late (30–55%): draw sub cracks
    tl.to(subCrackEls, {
      strokeDashoffset: 0,
      duration: 0.2,
      stagger: 0.04,
      ease: "none",
    }, 0.3);

    // Phase 2 (55–100%): fragments drift apart
    fragEls.forEach((el, i) => {
      const frag = FRAGMENTS[i];
      tl.to(el, {
        x: (frag.dx ?? 0) * 3,
        y: (frag.dy ?? 0) * 3,
        duration: 0.4,
        ease: "power2.out",
      }, 0.55);
    });

    ScrollTrigger.create({
      trigger,
      start: "top 75%",
      end: "bottom 30%",
      scrub: 1.5,
      animation: tl,
    });

    return () => { tl.kill(); };
  }, [triggerRef]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 51"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Fragment polygons (filled, drawn beneath cracks) */}
      {FRAGMENTS.map((f, i) => (
        <polygon
          key={i}
          data-frag={i}
          points={f.points}
          fill="var(--color-brand-accent)"
        />
      ))}

      {/* Main crack lines */}
      {MAIN_CRACKS.map((d, i) => (
        <path
          key={i}
          data-crack="main"
          d={d}
          stroke="var(--color-background)"
          strokeWidth="0.35"
          fill="none"
          strokeLinecap="square"
        />
      ))}

      {/* Secondary cracks */}
      {SUB_CRACKS.map((d, i) => (
        <path
          key={i}
          data-crack="sub"
          d={d}
          stroke="var(--color-background)"
          strokeWidth="0.25"
          fill="none"
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}

// ─── BOX 2: FALL ──────────────────────────────────────────────────────────────

// Shared icon constants (used by AssembleBox)
// Icon natural size: 9.71 × 13.14 → scale 2.8 → 27.2 × 36.8
const ICON_TX = 36.4;
const ICON_TY = 7.1;
const ICON_SCALE = 2.8;

// FallBox uses a smaller scale so pieces float with air on all sides.
// scale 1.8 → 17.48 × 23.65, margins ~13.7 SVG units top/bottom, ~41.3 left/right
const FALL_ICON_SCALE = 1.8;
const FALL_ICON_TX = (100 - 9.71 * FALL_ICON_SCALE) / 2;
const FALL_ICON_TY = (51 - 13.14 * FALL_ICON_SCALE) / 2;

export function FallBox({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Target the outer <g data-piece> wrappers — they live at SVG root level,
    // so GSAP x/y values are in SVG user units (no scale amplification).
    const pieces = svg.querySelectorAll<SVGGElement>("[data-piece]");

    pieces.forEach((el, i) => {
      const b = BROKEN_START[i] ?? { x: 0, y: 0, r: 0 };
      gsap.set(el, { x: b.x, y: b.y, rotation: b.r, svgOrigin: "50 25.5" });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tweens: gsap.core.Tween[] = [];
    pieces.forEach((el, i) => {
      const b = BROKEN_START[i] ?? { x: 0, y: 0, r: 0 };
      const dy  = 1.0 + (i % 5) * 0.3;   // 1.0–2.2 SVG units vertical drift
      const dr  = 0.6 + (i % 4) * 0.5;   // 0.6–2.1° rotation wobble
      const dur = 1.8 + (i % 6) * 0.2;   // 1.8–2.8 s period
      const sign = i % 2 === 0 ? 1 : -1;

      tweens.push(gsap.to(el, {
        y: b.y - dy,
        rotation: b.r + sign * dr,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.11,
      }));
    });

    return () => tweens.forEach((tw) => tw.kill());
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 51"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full overflow-hidden"
      overflow="hidden"
      aria-hidden="true"
    >
      {ICON_PATHS.map((d, i) => (
        // Outer <g> is the GSAP target (SVG root coordinates).
        // Inner <g> positions the path via translate+scale.
        <g key={i} data-piece={i}>
          <g transform={`translate(${FALL_ICON_TX}, ${FALL_ICON_TY}) scale(${FALL_ICON_SCALE})`}>
            <path d={d} fill="var(--color-brand-accent)" />
          </g>
        </g>
      ))}
    </svg>
  );
}

// ─── BOX 3: ASSEMBLE ──────────────────────────────────────────────────────────

export function AssembleBox({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const trigger = triggerRef.current;
    if (!svg || !trigger) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pieces = svg.querySelectorAll<SVGPathElement>("[data-piece]");

    // Start in the same ground positions as FallBox ends
    pieces.forEach((el, i) => {
      const s = SCATTER_ASSEMBLE[i] ?? { x: 0, y: 28, r: 0 };
      gsap.set(el, { x: s.x, y: s.y, rotation: s.r, transformOrigin: "center center" });
    });

    const tl = gsap.timeline({ paused: true });

    // Pieces rise and converge; centre pieces land last for a natural build
    pieces.forEach((el, i) => {
      tl.to(el, {
        x: 0,
        y: 0,
        rotation: 0,
        ease: "power3.out",
        duration: 0.6,
      }, (pieces.length - 1 - i) * 0.04);
    });

    ScrollTrigger.create({
      trigger,
      start: "top 75%",
      end: "bottom 30%",
      scrub: 1.5,
      animation: tl,
    });

    return () => { tl.kill(); };
  }, [triggerRef]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 51"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <g transform={`translate(${ICON_TX}, ${ICON_TY}) scale(${ICON_SCALE})`}>
        {ICON_PATHS.map((d, i) => (
          <path key={i} data-piece={i} d={d} fill="var(--color-brand-accent)" />
        ))}
      </g>
    </svg>
  );
}
