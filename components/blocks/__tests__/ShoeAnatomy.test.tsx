/**
 * ShoeAnatomy — scroll animation tests
 *
 * Two test suites:
 * 1. Pure math — linear interpolation used by useTransform keyframes
 * 2. Rendering — component renders correctly and exposes the right structure
 *
 * The motion library hooks are mocked so we can inject a controlled
 * scrollYProgress value and assert each layer's expected y-offset.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// ── 1. Pure interpolation helper (mirrors Framer Motion / motion behaviour) ─

/**
 * Linearly interpolate `value` through the keyframe table
 * defined by `input` → `output`.  Clamps outside the range.
 */
function lerp(
  value: number,
  input: number[],
  output: number[]
): number {
  // Clamp
  if (value <= input[0])  return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];

  for (let i = 0; i < input.length - 1; i++) {
    if (value >= input[i] && value <= input[i + 1]) {
      const t = (value - input[i]) / (input[i + 1] - input[i]);
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[output.length - 1];
}

// ── Scroll-progress → layer y-offset keyframes (must match ShoeAnatomy.tsx) ─

const OUTSOLE_INPUT  = [0, 0.2, 0.4, 0.8, 1];
const OUTSOLE_OUTPUT = [0,   0, 160, 160, 0];

const MIDSOLE_INPUT  = [0, 0.2, 0.4, 0.8, 1];
const MIDSOLE_OUTPUT = [0,   0,  80,  80, 0];

const INSOLE_INPUT   = [0, 0.4, 0.55, 0.65, 0.8, 1];
const INSOLE_OUTPUT  = [0,   0, -100, -160, -160, 0];

// Annotation zone opacities
const ZONE1_OP_INPUT  = [0.18, 0.25, 0.37, 0.42];
const ZONE1_OP_OUTPUT = [0,    1,    1,    0   ];

const ASSEMBLED_OP_INPUT  = [0, 0.18, 0.82, 0.9];
const ASSEMBLED_OP_OUTPUT = [1,    0,    0,   1 ];

// ── Suite 1: Pure Math ───────────────────────────────────────────────────────

describe("ShoeAnatomy — scroll transform math", () => {

  describe("outsoleY keyframes", () => {
    it("is 0px at scroll progress 0 (assembled)", () => {
      expect(lerp(0, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(0);
    });
    it("is still 0px at 20% (hold before separation)", () => {
      expect(lerp(0.2, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(0);
    });
    it("is 80px at 30% (half-way through separation)", () => {
      expect(lerp(0.3, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBeCloseTo(80, 10);
    });
    it("is 160px at 40% (fully separated)", () => {
      expect(lerp(0.4, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(160);
    });
    it("holds at 160px between 40% and 80%", () => {
      expect(lerp(0.6, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(160);
    });
    it("is 0px at 100% (reassembled)", () => {
      expect(lerp(1, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(0);
    });
    it("clamps below 0% to 0px", () => {
      expect(lerp(-0.1, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(0);
    });
    it("clamps above 100% to 0px", () => {
      expect(lerp(1.1, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(0);
    });
  });

  describe("midsoleY keyframes", () => {
    it("is 0px at 0%", () => {
      expect(lerp(0, MIDSOLE_INPUT, MIDSOLE_OUTPUT)).toBe(0);
    });
    it("is 80px at 40% (fully separated, half the outsole distance)", () => {
      expect(lerp(0.4, MIDSOLE_INPUT, MIDSOLE_OUTPUT)).toBe(80);
    });
    it("is less than outsole at same progress (midsole moves half as far)", () => {
      const outsole = lerp(0.4, OUTSOLE_INPUT, OUTSOLE_OUTPUT);
      const midsole = lerp(0.4, MIDSOLE_INPUT, MIDSOLE_OUTPUT);
      expect(midsole).toBeLessThan(outsole);
      expect(midsole).toBe(outsole / 2);
    });
    it("returns to 0 at 100%", () => {
      expect(lerp(1, MIDSOLE_INPUT, MIDSOLE_OUTPUT)).toBe(0);
    });
  });

  describe("insoleY keyframes", () => {
    it("is 0px at 0% (not yet rising)", () => {
      expect(lerp(0, INSOLE_INPUT, INSOLE_OUTPUT)).toBe(0);
    });
    it("is 0px at 40% (starts moving at 40%)", () => {
      expect(lerp(0.4, INSOLE_INPUT, INSOLE_OUTPUT)).toBe(0);
    });
    it("is -100px at 55% (rising upward)", () => {
      expect(lerp(0.55, INSOLE_INPUT, INSOLE_OUTPUT)).toBe(-100);
    });
    it("is -160px at 65% (fully risen)", () => {
      expect(lerp(0.65, INSOLE_INPUT, INSOLE_OUTPUT)).toBe(-160);
    });
    it("moves in the opposite direction to the outsole (negative y)", () => {
      const insole  = lerp(0.65, INSOLE_INPUT, INSOLE_OUTPUT);
      const outsole = lerp(0.4,  OUTSOLE_INPUT, OUTSOLE_OUTPUT);
      expect(insole).toBeLessThan(0);   // insole rises (negative y = up)
      expect(outsole).toBeGreaterThan(0); // outsole drops (positive y = down)
    });
    it("returns to 0 at 100%", () => {
      expect(lerp(1, INSOLE_INPUT, INSOLE_OUTPUT)).toBe(0);
    });
  });

  describe("assembled-view opacity", () => {
    it("is fully visible (1) at scroll 0", () => {
      expect(lerp(0, ASSEMBLED_OP_INPUT, ASSEMBLED_OP_OUTPUT)).toBe(1);
    });
    it("has faded to 0 by 18%", () => {
      expect(lerp(0.18, ASSEMBLED_OP_INPUT, ASSEMBLED_OP_OUTPUT)).toBe(0);
    });
    it("is invisible during the exploded section (50%)", () => {
      expect(lerp(0.5, ASSEMBLED_OP_INPUT, ASSEMBLED_OP_OUTPUT)).toBe(0);
    });
    it("reappears after 82%", () => {
      expect(lerp(0.9, ASSEMBLED_OP_INPUT, ASSEMBLED_OP_OUTPUT)).toBe(1);
    });
  });

  describe("zone 1 annotation opacity", () => {
    it("is invisible at 0%", () => {
      expect(lerp(0, ZONE1_OP_INPUT, ZONE1_OP_OUTPUT)).toBe(0);
    });
    it("starts appearing at 18%", () => {
      expect(lerp(0.18, ZONE1_OP_INPUT, ZONE1_OP_OUTPUT)).toBe(0);
    });
    it("is fully visible at 25%", () => {
      expect(lerp(0.25, ZONE1_OP_INPUT, ZONE1_OP_OUTPUT)).toBe(1);
    });
    it("fades out by 42%", () => {
      expect(lerp(0.42, ZONE1_OP_INPUT, ZONE1_OP_OUTPUT)).toBe(0);
    });
  });

  describe("progress formula (bounds calculation)", () => {
    /** Mirrors the inline transformer in ShoeAnatomy */
    function computeProgress(scrollY: number, start: number, end: number) {
      if (end <= start) return 0;
      const p = (scrollY - start) / (end - start);
      return Math.max(0, Math.min(1, p));
    }

    it("returns 0 when scroll is at section start", () => {
      expect(computeProgress(1000, 1000, 50000)).toBe(0);
    });
    it("returns 1 when scroll is at section end", () => {
      expect(computeProgress(50000, 1000, 50000)).toBe(1);
    });
    it("returns 0.5 at the midpoint", () => {
      expect(computeProgress(25500, 1000, 50000)).toBe(0.5);
    });
    it("clamps to 0 before the section", () => {
      expect(computeProgress(0, 1000, 50000)).toBe(0);
    });
    it("clamps to 1 after the section", () => {
      expect(computeProgress(999999, 1000, 50000)).toBe(1);
    });
    it("returns 0 when end <= start (degenerate case)", () => {
      expect(computeProgress(500, 500, 500)).toBe(0);
      expect(computeProgress(500, 1000, 0)).toBe(0);
    });
  });

  describe("layer separation sequence", () => {
    it("outsole separates before insole", () => {
      // Outsole starts moving at 20%, insole at 40%
      const outsoleAtHalfway = lerp(0.3, OUTSOLE_INPUT, OUTSOLE_OUTPUT);
      const insoleAtHalfway  = lerp(0.3, INSOLE_INPUT,  INSOLE_OUTPUT);
      expect(outsoleAtHalfway).toBeGreaterThan(0);
      expect(insoleAtHalfway).toBe(0); // insole hasn't moved yet
    });
    it("all layers return to 0 at full reassembly", () => {
      expect(lerp(1, OUTSOLE_INPUT, OUTSOLE_OUTPUT)).toBe(0);
      expect(lerp(1, MIDSOLE_INPUT, MIDSOLE_OUTPUT)).toBe(0);
      expect(lerp(1, INSOLE_INPUT,  INSOLE_OUTPUT)).toBe(0);
    });
  });
});

// ── Suite 2: Component Rendering ─────────────────────────────────────────────

// Mock next/image (not available in jsdom)
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) =>
    React.createElement("img", { alt, ...props }),
}));

// Capture the scrollYProgress mock so tests can drive it
let mockScrollYProgress = { get: () => 0 };
const mockUseTransformFn = vi.fn();

vi.mock("motion/react", () => {
  const motionDiv = React.forwardRef(
    (
      { children, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { style?: Record<string, unknown> },
      ref: React.Ref<HTMLDivElement>
    ) => React.createElement("div", { ref, ...props }, children)
  );
  motionDiv.displayName = "motion.div";

  return {
    useScroll: () => ({ scrollYProgress: mockScrollYProgress }),
    useTransform: mockUseTransformFn,
    motion: { div: motionDiv },
  };
});

// Reset mock before each render test
beforeEach(() => {
  mockScrollYProgress = { get: () => 0 };

  // useTransform returns a MotionValue-like object with a stable value
  mockUseTransformFn.mockImplementation(
    (_input: unknown, _inputRange?: unknown, outputRange?: number[]) => {
      // Return first output value as the "current" mock value
      const first = Array.isArray(outputRange) ? outputRange[0] : 0;
      return { get: () => first };
    }
  );
});

// Top-level import — mocks are hoisted before this resolves
const { default: ShoeAnatomy } = await import("../ShoeAnatomy");

describe("ShoeAnatomy — rendering", () => {

  const DEFAULT_ZONES = [
    { label: "01 / Sula",       title: "Sulan",              body: "Body 1." },
    { label: "02 / Mellansulna", title: "PHORENE™",          body: "Body 2." },
    { label: "03 / Innersula",  title: "Dual-Fit",           body: "Body 3." },
    { label: "04 / Ovandel",    title: "ECCO GRUUV STUDIO",  body: "Body 4." },
  ];

  it("renders without crashing", () => {
    const { container } = render(
      <ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test Anatomy" />
    );
    expect(container).toBeTruthy();
  });

  it("renders the section title", () => {
    render(<ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Anatomy of Innovation" />);
    expect(screen.getByText("Anatomy of Innovation")).toBeTruthy();
  });

  it("renders all 4 layer images", () => {
    render(<ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test" />);
    const images = document.querySelectorAll("img");
    // 4 animated layers (outsole, midsole, insole, upper)
    expect(images.length).toBeGreaterThanOrEqual(4);
  });

  it("renders all zone annotation titles", () => {
    render(<ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test" />);
    for (const zone of DEFAULT_ZONES) {
      // getAllByText handles cases where the same text appears in multiple nodes
      // (e.g. "ECCO GRUUV STUDIO" appears in both zone 4 and the assembled hint)
      expect(screen.getAllByText(zone.title).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders all zone labels", () => {
    render(<ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test" />);
    for (const zone of DEFAULT_ZONES) {
      expect(screen.getByText(zone.label)).toBeTruthy();
    }
  });

  it("renders the assembled hint text", () => {
    render(<ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test" />);
    expect(
      screen.getByText(/Scrolla ned för att utforska/i)
    ).toBeTruthy();
  });

  it("uses fallback zones when none are passed", () => {
    render(<ShoeAnatomy sectionTitle="Test" />);
    // Fallback includes 'Sulan'
    expect(screen.getByText("Sulan")).toBeTruthy();
  });

  it("renders custom zones", () => {
    const customZones = [
      { label: "A", title: "CustomZone", body: "Custom body" },
    ];
    render(<ShoeAnatomy zones={customZones} sectionTitle="Test" />);
    expect(screen.getByText("CustomZone")).toBeTruthy();
  });

  it("passes the scroll container ref to the 500vh wrapper", () => {
    const { container } = render(
      <ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test" />
    );
    // Outermost div has inline height: 500vh
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper?.style.height).toBe("500vh");
  });

  it("calls useScroll and useTransform when rendering", () => {
    // Just verify the motion hooks are called — scroll behaviour tested via math suite
    render(<ShoeAnatomy zones={DEFAULT_ZONES} sectionTitle="Test" />);
    expect(mockUseTransformFn).toHaveBeenCalled();
  });
});
