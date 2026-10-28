/* =====================================================================
   Training Log — PROGRAMME
   This file is the only thing that changes when the programme changes.
   The app reads it and draws every card from these settings.

   RULES
   - Keys are permanent. Never reuse a key for a different exercise.
     If an exercise genuinely changes, give it a new key and mark the
     old one retired:true (it stays here so history still reads).
   - input:  "reps" | "sec" | "text"
   - load:   "kg" | "kg/hand" | "bw" (no weight box) | "bw+" (optional
             added-weight box) | "none"
   - side:   "" | "leg" | "side"   (reps counted per leg / per side)
   - rir:    true to show the reps-in-reserve box (last set)
   - setLabels: optional per-box labels, e.g. ["R","R","R","L"]
   - Day entries: { key, sets, target, load, rir, cue }
       target = what each box should hold ("5", "45", "1 + slow lower")
       load   = target load as a number, or "" if none
       rir    = target RIR text, e.g. "3+" (optional)
       cue    = optional day-specific cue (overrides the library cue)
   ===================================================================== */
/* ---------------------------------------------------------------------
   CHANGELOG — one line per version: date, what changed. The date links
   back to the chat where it was decided. Newest first.
   v3.1  2026-10-28  Ankle glides move into the warm-up (R 3×12–15,
                     L 1×12–15); the separate ankle card is gone from both
                     days. App 3.1.0 alongside: tab bar sits flush with the
                     bottom of the home-screen app; session date is set by
                     the first Done (or at save), not when the draft was
                     made, and can be edited — same for rucks and Extra;
                     timed exercises export without the duplicate " s";
                     any saved session can be copied again from History.
   v3.0  2026-10-12  Restart after a layoff, with the app rebuild.
                     3 working sets. Day A: deadlift and pressing. Day B:
                     split squat and carries. Pull-up rebuild (strict
                     attempt + slow lower). Dropped: wrist prehab, knee
                     raises, Nordics, Pallof, hollow holds, face pulls.
                     Calf raises split into bent-knee and straight-leg.
   v2.3  2026-08-02  Previous programme, before the layoff.
   --------------------------------------------------------------------- */
window.PROGRAMME = {
  schema: 3,
  version: "foundation-v3.1 (2026-10-28)",

  library: {
    wu:       { name: "Warm-up", input: "text", load: "none",
                cue: "Hops and rotations, banded ankle glides (R 3×12–15, L 1×12–15), sled 3–5 min, two lighter ramp-up sets on the first lift." },
    /* ankle: not on either day since v3.1 (now in the warm-up); kept so old sessions still read */
    ankle:    { name: "Banded ankle glides", input: "reps", load: "none",
                setLabels: ["R", "R", "R", "L"],
                cue: "Band at the ankle joint line, not the shin. Slow lunge to first block, about 5 s hold." },
    tbdl:     { name: "Trap bar deadlift", input: "reps", load: "kg", rir: true,
                cue: "No straps. Push the floor away; lower under control.",
                swaps: ["Conventional deadlift", "DB Romanian deadlift"] },
    calf_bk:  { name: "Calf raise, bent-knee", input: "reps", load: "bw+", side: "leg",
                cue: "Single leg, off a step, knee bent. 3 s down, pause at the bottom.",
                swaps: ["Seated calf raise"] },
    calf_sl:  { name: "Calf raise, straight-leg", input: "reps", load: "bw+", side: "leg",
                cue: "Single leg, off a step, knee straight. 3 s down, pause at the bottom.",
                swaps: ["Leg-press calf raise"] },
    bench:    { name: "DB bench press", input: "reps", load: "kg/hand", rir: true,
                cue: "Full stretch to full lockout. The left arm sets the reps.",
                swaps: ["DB floor press", "Machine chest press", "Weighted push-up"] },
    dbrow:    { name: "DB row, single-arm", input: "reps", load: "kg", side: "side", rir: true,
                cue: "Free hand braced, no torso heave. Weaker side first.",
                swaps: ["Chest-supported row", "Cable row"] },
    pullup:   { name: "Pull-up", input: "reps", load: "bw",
                cue: "Start from a dead hang. Touch the top briefly, no hold, then lower over 3–5 s. Log strict reps per set (0 if lowering only). Stop if it grinds." },
    bext:     { name: "Back extension", input: "reps", load: "bw+",
                cue: "Round down, re-extend segment by segment. Feel the lower back, not the hamstrings.",
                swaps: ["Reverse hyper"] },
    sideext:  { name: "Side extension", input: "reps", load: "bw+", side: "side",
                cue: "Hip on the pad, side-on. Lift through the side of the trunk without twisting.",
                swaps: ["Side plank"] },
    deadhang: { name: "Dead hang", input: "sec", load: "none",
                cue: "Full grip, thumb wrapped. Stop when the thumb slips." },
    ssq:      { name: "Split squat", input: "reps", load: "kg/hand", side: "leg", rir: true,
                cue: "Front foot on a small riser if there is one. Match right and left depth before adding load.",
                swaps: ["Reverse lunge", "Step-up"] },
    carry:    { name: "Farmer’s carry", input: "sec", load: "kg/hand",
                cue: "Tall and braced, shoulders back, smooth steps.",
                swaps: ["Trap-bar carry", "Kettlebell carry"] },
    plank:    { name: "Plank", input: "sec", load: "none",
                cue: "Neutral line, no sag." },
    push:     { name: "Push-up", input: "reps", load: "bw",
                cue: "Full depth, full lockout, rigid line.",
                swaps: ["Incline push-up"] },
    pulldown: { name: "Pulldown", input: "reps", load: "kg", rir: true,
                cue: "Bar to upper chest. Stop just short of the full squeeze.",
                swaps: ["Ring row", "TRX row"] },

    /* retired — kept so old sessions still read; never reuse these keys */
    calf:      { name: "Calf — slow, full ROM", retired: true },
    pallof:    { name: "Trunk · Pallof", retired: true },
    wrist:     { name: "Wrist prehab (finisher)", retired: true },
    nordic:    { name: "Nordic / ham eccentric", retired: true },
    hollow:    { name: "Trunk · Hollow hold", retired: true },
    facepull:  { name: "Pull · Face pull / band pull-apart", retired: true },
    kneeraise: { name: "Trunk · Hanging knee raise", retired: true }
  },

  days: {
    A: { name: "Day A", list: [
      { key: "wu" },
      { key: "tbdl",     sets: 3, target: "5",  load: 85, rir: "3+" },
      { key: "calf_bk",  sets: 3, target: "12" },
      { key: "bench",    sets: 3, target: "8",  load: 18 },
      { key: "dbrow",    sets: 3, target: "8",  load: 18 },
      { key: "pullup",   sets: 3, target: "1 + slow lower" },
      { key: "bext",     sets: 3, target: "12" },
      { key: "sideext",  sets: 3, target: "10" },
      { key: "deadhang", sets: 3, target: "25" }
    ]},
    B: { name: "Day B", list: [
      { key: "wu", cue: "Hops and rotations, banded ankle glides (R 3×12–15, L 1×12–15), sled 3–5 min, one light carry." },
      { key: "ssq",      sets: 3, target: "10", load: 20 },
      { key: "calf_sl",  sets: 3, target: "12" },
      { key: "carry",    sets: 3, target: "45", load: 24 },
      { key: "plank",    sets: 3, target: "50" },
      { key: "push",     sets: 3, target: "12" },
      { key: "pulldown", sets: 3, target: "8",  load: 45 },
      { key: "pullup",   sets: 3, target: "1 + slow lower" },
      { key: "deadhang", sets: 3, target: "25" }
    ]}
  }
};
