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

// Square: 22×22 centered in 100×51 → from (39,14.5) to (61,36.5)
const SQ = { x: 39, y: 14.5, w: 22, h: 22 };

// Crack origin slightly off-centre for a more natural feel
const CX = 50, CY = 24;

// 8 cracks radiating outward — each a two-segment jagged path (no filler sub-cracks)
// Crack endpoints on the square boundary (clockwise from top-left):
//   A(39,14.5)  B(46,14.5)  C(55,14.5)  D(61,20)
//   E(61,32)    F(56,36.5)  G(44,36.5)  H(39,28)
const CRACKS = [
  `M${CX},${CY} L42,17 L${SQ.x},${SQ.y}`,                  // → A top-left corner
  `M${CX},${CY} L47,16 L46,${SQ.y}`,                        // → B top edge
  `M${CX},${CY} L53,16 L55,${SQ.y}`,                        // → C top edge
  `M${CX},${CY} L58,20 L${SQ.x + SQ.w},20`,                 // → D right edge
  `M${CX},${CY} L59,29 L${SQ.x + SQ.w},32`,                 // → E right edge
  `M${CX},${CY} L55,33 L56,${SQ.y + SQ.h}`,                 // → F bottom edge
  `M${CX},${CY} L46,33 L44,${SQ.y + SQ.h}`,                 // → G bottom edge
  `M${CX},${CY} L41,28 L${SQ.x},28`,                        // → H left edge
];

// 8 fragment polygons that tile the square exactly,
// each bounded by two adjacent cracks and the square edge between them.
const FRAGMENTS = [
  { points: `${CX},${CY} ${SQ.x},${SQ.y} 46,${SQ.y}`,                                            dx: -1.8, dy: -2.2 },
  { points: `${CX},${CY} 46,${SQ.y} 55,${SQ.y}`,                                                  dx:  0.0, dy: -2.8 },
  { points: `${CX},${CY} 55,${SQ.y} ${SQ.x+SQ.w},${SQ.y} ${SQ.x+SQ.w},20`,                      dx:  2.2, dy: -1.8 },
  { points: `${CX},${CY} ${SQ.x+SQ.w},20 ${SQ.x+SQ.w},32`,                                        dx:  2.8, dy:  0.0 },
  { points: `${CX},${CY} ${SQ.x+SQ.w},32 ${SQ.x+SQ.w},${SQ.y+SQ.h} 56,${SQ.y+SQ.h}`,           dx:  2.2, dy:  2.2 },
  { points: `${CX},${CY} 56,${SQ.y+SQ.h} 44,${SQ.y+SQ.h}`,                                        dx:  0.0, dy:  2.8 },
  { points: `${CX},${CY} 44,${SQ.y+SQ.h} ${SQ.x},${SQ.y+SQ.h} ${SQ.x},28`,                      dx: -2.2, dy:  2.2 },
  { points: `${CX},${CY} ${SQ.x},28 ${SQ.x},${SQ.y}`,                                             dx: -2.8, dy:  0.0 },
];

export function CrackBox({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const trigger = triggerRef.current;
    if (!svg || !trigger) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const crackEls = svg.querySelectorAll<SVGPathElement>("[data-crack]");
    const fragEls = svg.querySelectorAll<SVGPolygonElement>("[data-frag]");

    crackEls.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.set(fragEls, { x: 0, y: 0 });

    const tl = gsap.timeline({ paused: true });

    // Phase 1 (0–55%): draw all cracks progressively
    tl.to(crackEls, {
      strokeDashoffset: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "none",
    }, 0);

    // Phase 2 (55–100%): fragments drift apart
    fragEls.forEach((el, i) => {
      const frag = FRAGMENTS[i];
      tl.to(el, {
        x: (frag.dx ?? 0) * 3,
        y: (frag.dy ?? 0) * 3,
        duration: 0.2,
        ease: "power2.out",
      }, 0.45);
    });

    ScrollTrigger.create({
      trigger,
      start: "top 75%",
      end: "bottom 30%",
      scrub: 0.6,
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
      {FRAGMENTS.map((f, i) => (
        <polygon
          key={i}
          data-frag={i}
          points={f.points}
          fill="var(--color-foreground)"
        />
      ))}

      {CRACKS.map((d, i) => (
        <path
          key={i}
          data-crack
          d={d}
          stroke="var(--color-background)"
          strokeWidth="0.4"
          fill="none"
          strokeLinecap="round"
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
    const trigger = triggerRef.current;
    if (!svg || !trigger) return;

    // Target the outer <g data-piece> wrappers — they live at SVG root level,
    // so GSAP x/y values are in SVG user units (no scale amplification).
    const pieces = svg.querySelectorAll<SVGGElement>("[data-piece]");
    const paths = svg.querySelectorAll<SVGPathElement>("path");

    pieces.forEach((el, i) => {
      const b = BROKEN_START[i] ?? { x: 0, y: 0, r: 0 };
      gsap.set(el, { x: b.x, y: b.y, rotation: b.r, svgOrigin: "50 25.5" });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scroll-driven color: foreground → brand-accent
    const colorTl = gsap.timeline({ paused: true });
    colorTl.fromTo(paths,
      { fill: "#36383a" },
      { fill: "#c8553d", duration: 1, ease: "none" },
      0
    );
    const colorSt = ScrollTrigger.create({
      trigger,
      start: "top 70%",
      end: "top 20%",
      scrub: 0.4,
      animation: colorTl,
    });

    const tweens: gsap.core.Tween[] = [];
    pieces.forEach((el, i) => {
      const b = BROKEN_START[i] ?? { x: 0, y: 0, r: 0 };
      const dy  = 1.0 + (i % 5) * 0.3;
      const dr  = 0.6 + (i % 4) * 0.5;
      const dur = 1.8 + (i % 6) * 0.2;
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

    return () => {
      tweens.forEach((tw) => tw.kill());
      colorTl.kill();
      colorSt.kill();
    };
  }, [triggerRef]);

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
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.6,
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
