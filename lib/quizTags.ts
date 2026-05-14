/**
 * Controlled vocabulary for the Skoguide quiz.
 *
 * Single source of truth for:
 *  - the option values rendered in `components/blocks/home/ShoeQuiz.tsx`
 *  - the Sanity schema enums on `brandPage` + `eccoBrandPage` product objects
 *  - the GROQ-side ranking logic
 *
 * Drift between these is silently broken matching, so import — don't retype.
 */

export const QUIZ_STYLE_VALUES   = ["klassiskt", "vardagligt", "sport", "festligt"] as const;
export const QUIZ_SEASON_VALUES  = ["sommar", "host-var", "vinter", "aret"]         as const;
export const QUIZ_PRIORITY_VALUES = ["komfort", "stil", "hallbarhet", "pris"]       as const;

export type QuizStyle    = typeof QUIZ_STYLE_VALUES[number];
export type QuizSeason   = typeof QUIZ_SEASON_VALUES[number];
export type QuizPriority = typeof QUIZ_PRIORITY_VALUES[number];

/** Sanity option lists ({ title, value } shape) for the schema definitions. */
export const QUIZ_STYLE_OPTIONS = [
  { title: "Klassiskt",        value: "klassiskt"  },
  { title: "Vardagligt",       value: "vardagligt" },
  { title: "Sport & promenad", value: "sport"      },
  { title: "Festligt",         value: "festligt"   },
];

export const QUIZ_SEASON_OPTIONS = [
  { title: "Sommar",     value: "sommar"   },
  { title: "Höst & vår", value: "host-var" },
  { title: "Vinter",     value: "vinter"   },
  { title: "Året runt",  value: "aret"     },
];

export const QUIZ_PRIORITY_OPTIONS = [
  { title: "Komfort",    value: "komfort"    },
  { title: "Stil",       value: "stil"       },
  { title: "Hållbarhet", value: "hallbarhet" },
  { title: "Pris",       value: "pris"       },
];
