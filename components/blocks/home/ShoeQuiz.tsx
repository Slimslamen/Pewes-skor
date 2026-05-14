"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Baby,
  Check,
  Coffee,
  Footprints,
  Heart,
  Infinity as InfinityIcon,
  Leaf,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Tag,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";

type WhoValue = "herr" | "dam" | "barn" | "family";

interface Option {
  value:  string;
  label:  string;
  sub:    string;
  icon:   LucideIcon;
}

interface Question {
  id:       "who" | "style" | "season" | "priority";
  eyebrow:  string;
  label:    string;
  options:  Option[];
}

const QUESTIONS: Question[] = [
  {
    id:      "who",
    eyebrow: "Steg 1 av 4",
    label:   "Vem letar du skor till?",
    options: [
      { value: "herr",   label: "Herr",            sub: "Stil och bekvämlighet",  icon: User  },
      { value: "dam",    label: "Dam",             sub: "Eleganta vardagsval",    icon: User  },
      { value: "barn",   label: "Barn",            sub: "Hållbara följeslagare",  icon: Baby  },
      { value: "family", label: "Hela familjen",   sub: "Något åt alla",          icon: Users },
    ],
  },
  {
    id:      "style",
    eyebrow: "Steg 2 av 4",
    label:   "Vilken stil söker du?",
    options: [
      { value: "klassiskt",  label: "Klassiskt",        sub: "Tidlös elegans",       icon: Award      },
      { value: "vardagligt", label: "Vardagligt",       sub: "Bekvämt i vardagen",   icon: Coffee     },
      { value: "sport",      label: "Sport & promenad", sub: "Aktiv komfort",        icon: Footprints },
      { value: "festligt",   label: "Festligt",         sub: "För det extra",        icon: Sparkles   },
    ],
  },
  {
    id:      "season",
    eyebrow: "Steg 3 av 4",
    label:   "När ska du använda dem?",
    options: [
      { value: "sommar",   label: "Sommar",       sub: "Lätta och luftiga",     icon: Sun           },
      { value: "host-var", label: "Höst & vår",   sub: "Mellanlandning",        icon: Leaf          },
      { value: "vinter",   label: "Vinter",       sub: "Varma och trygga",      icon: Snowflake     },
      { value: "aret",     label: "Året runt",    sub: "Pålitliga alldagar",    icon: InfinityIcon  },
    ],
  },
  {
    id:      "priority",
    eyebrow: "Steg 4 av 4",
    label:   "Vad är viktigast för dig?",
    options: [
      { value: "komfort",     label: "Komfort",      sub: "Skor du glömmer att du har på",  icon: Heart       },
      { value: "stil",        label: "Stil",         sub: "Ett uttryck du står för",        icon: Star        },
      { value: "hallbarhet",  label: "Hållbarhet",   sub: "Skor som håller länge",          icon: ShieldCheck },
      { value: "pris",        label: "Pris",         sub: "Bra värde för pengarna",         icon: Tag         },
    ],
  },
];

const CATEGORY_MAP: Record<WhoValue, { label: string; noun: string; href: string }> = {
  herr:   { label: "Herrkollektionen", noun: "herrskor",              href: "/skor/herr" },
  dam:    { label: "Damkollektionen",  noun: "damskor",               href: "/skor/dam"  },
  barn:   { label: "Barnkollektionen", noun: "barnskor",              href: "/skor/barn" },
  family: { label: "Vår kollektion",   noun: "skor för hela familjen", href: "/skor"      },
};

const STYLE_ADJ:  Record<string, string> = { klassiskt: "Klassiska", vardagligt: "Vardagliga", sport: "Sportiga",  festligt: "Festliga" };
const SEASON_PHRASE: Record<string, string> = { sommar: "för sommaren", "host-var": "för höst och vår", vinter: "för vintern", aret: "året runt" };
const PRIORITY_PHRASE: Record<string, string> = { komfort: "med komfort i fokus", stil: "med stil i fokus", hallbarhet: "valda för att hålla länge", pris: "till ett bra pris" };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ShoeQuiz() {
  const reduce = useReducedMotion();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<Question["id"], string>>>({});
  const timeoutRef            = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((value: string) => {
    if (timeoutRef.current) return;
    const q = QUESTIONS[step];
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    timeoutRef.current = setTimeout(() => {
      setStep((s) => Math.min(s + 1, QUESTIONS.length));
      timeoutRef.current = null;
    }, 320);
  }, [step]);

  const goBack = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAnswers({});
    setStep(0);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (step >= QUESTIONS.length) return;
    function onKey(e: KeyboardEvent) {
      const n = parseInt(e.key, 10);
      if (!Number.isFinite(n) || n < 1 || n > 4) return;
      const opt = QUESTIONS[step].options[n - 1];
      if (opt) advance(opt.value);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, advance]);

  const isResult     = step >= QUESTIONS.length;
  const totalSteps   = QUESTIONS.length;
  const filledRatio  = isResult ? 1 : step / totalSteps;
  const slideX       = reduce ? 0 : 24;

  return (
    <section id="skoguide" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <Reveal from="up" delay={0.05}>
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-3">
              Skoguide
            </span>
            <h2
              className="font-(family-name:--font-manrope) font-extrabold tracking-[-0.03em] text-on-surface"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Hitta din perfekta sko
            </h2>
            <p className="font-(family-name:--font-inter) font-light text-base md:text-lg text-on-surface-variant leading-[1.65] mt-4">
              Svara på fyra korta frågor så pekar vi ut rätt avdelning för dig.
            </p>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          <div className="bg-surface-container-low rounded-sm border border-outline-variant/60 p-7 md:p-12">
            {/* Progress */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.22em] text-outline font-bold">
                  {isResult ? "Klart" : QUESTIONS[step].eyebrow}
                </span>
                {!isResult && step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 font-(family-name:--font-inter) text-[11px] uppercase tracking-[0.18em] text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
                    Tillbaka
                  </button>
                )}
              </div>
              <div
                className="grid grid-cols-4 gap-2"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={totalSteps}
                aria-valuenow={isResult ? totalSteps : step}
              >
                {Array.from({ length: totalSteps }).map((_, i) => {
                  const filled = isResult || i < step;
                  const active = !isResult && i === step;
                  return (
                    <div key={i} className="h-1 bg-outline-variant/60 overflow-hidden rounded-sm">
                      <motion.div
                        className="h-full bg-primary origin-left"
                        initial={false}
                        animate={{ scaleX: filled ? 1 : active ? 0.15 : 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{ width: "100%" }}
                      />
                    </div>
                  );
                })}
              </div>
              {!isResult && (
                <div className="mt-3 font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.22em] text-outline">
                  {Math.round(filledRatio * 100)}% klart
                </div>
              )}
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              {isResult ? (
                <ResultPanel
                  key="result"
                  answers={answers as Record<Question["id"], string>}
                  onReset={reset}
                  slideX={slideX}
                />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x:  slideX }}
                  animate={{ opacity: 1, x:  0 }}
                  exit   ={{ opacity: 0, x: -slideX }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h3 className="font-(family-name:--font-manrope) font-bold text-on-surface tracking-[-0.02em] text-[22px] md:text-[28px] mb-6 md:mb-8">
                    {QUESTIONS[step].label}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUESTIONS[step].options.map((opt, i) => {
                      const selected = answers[QUESTIONS[step].id] === opt.value;
                      const Icon = opt.icon;
                      return (
                        <motion.button
                          key={opt.value}
                          type="button"
                          onClick={() => advance(opt.value)}
                          aria-pressed={selected}
                          whileTap={reduce ? undefined : { scale: 0.985 }}
                          className={[
                            "group relative text-left p-5 rounded-sm border bg-surface",
                            "transition-colors duration-200",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-outline-variant hover:border-primary/40 hover:bg-surface-container",
                          ].join(" ")}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={[
                                "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-sm transition-transform duration-300",
                                selected ? "bg-primary text-on-primary" : "bg-primary/8 text-primary group-hover:translate-x-0.5",
                              ].join(" ")}
                            >
                              {selected ? <Check className="w-4 h-4" aria-hidden /> : <Icon className="w-4 h-4" aria-hidden />}
                            </span>
                            <div className="min-w-0">
                              <div className="font-(family-name:--font-manrope) font-bold text-[15px] text-on-surface tracking-[-0.01em]">
                                {opt.label}
                              </div>
                              <div className="font-(family-name:--font-inter) font-light text-[13px] text-on-surface-variant leading-[1.5] mt-0.5">
                                {opt.sub}
                              </div>
                            </div>
                            <span
                              className="ml-auto self-center font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.18em] text-outline hidden md:inline"
                              aria-hidden
                            >
                              {i + 1}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <p className="mt-6 font-(family-name:--font-inter) text-[11px] text-outline">
                    Tips: tryck <span className="font-bold">1–4</span> för att välja med tangentbordet.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ResultProps {
  answers: Record<Question["id"], string>;
  onReset: () => void;
  slideX:  number;
}

function ResultPanel({ answers, onReset, slideX }: ResultProps) {
  const who      = (answers.who as WhoValue) ?? "family";
  const target   = CATEGORY_MAP[who];
  const adj      = STYLE_ADJ[answers.style ?? ""]      ?? "Utvalda";
  const season   = SEASON_PHRASE[answers.season ?? ""] ?? "året runt";
  const priority = PRIORITY_PHRASE[answers.priority ?? ""] ?? "med kvalitet i fokus";

  const sentence = `${adj} ${target.noun} ${season}, ${priority}.`;

  return (
    <motion.div
      initial={{ opacity: 0, x:  slideX }}
      animate={{ opacity: 1, x:  0 }}
      exit   ={{ opacity: 0, x: -slideX }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-3">
        Din rekommendation
      </span>
      <h3
        className="font-(family-name:--font-manrope) font-extrabold text-on-surface tracking-[-0.03em]"
        style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
      >
        {target.label} väntar.
      </h3>
      <p className="font-(family-name:--font-inter) font-light text-base md:text-lg text-on-surface-variant leading-[1.65] mt-4 max-w-prose">
        {sentence}
      </p>

      <div className="flex flex-wrap items-center gap-5 mt-8">
        <Link
          href={target.href}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-on-primary font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] rounded-sm hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Utforska kollektionen
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 font-(family-name:--font-inter) text-[11px] uppercase tracking-[0.18em] text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Börja om
        </button>
      </div>
    </motion.div>
  );
}
