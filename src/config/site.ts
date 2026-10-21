/**
 * -----------------------------------------------------------------------------
 * SAWALA RASA — centralized content configuration
 * -----------------------------------------------------------------------------
 * Everything personal lives here so the site can be customised without
 * touching a single component.
 *
 *  - Replace `hero.photo` and each gallery `src` with real photographs
 *    (drop files into /public/images and update the path).
 *  - Replace placeholder names / dates / captions with real details.
 *  - Replace the background track in /public/audio and update `music.src`.
 * -----------------------------------------------------------------------------
 */

export type Poem = {
  id: string;
  number: string; // Sundanese numeral, used as a visual signature
  title: string;
  lines: string[];
  emLines?: number[]; // indexes of lines to give gentle emphasis
};

export type TimelineEntry = {
  id: string;
  number: string;
  date: string; // editable
  title: string;
  text: string;
  photo?: string; // optional
};

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  size: "feature" | "tall" | "wide" | "square";
};

export const siteConfig = {
  name: "Sawala Rasa",
  tagline: "A letter I never knew how to say.",

  /** Verified Sundanese script — used only as small visual signatures.
   *  "Aksara Sunda" is confirmed against Unicode / public references;
   *  the site name is a faithful phonetic transliteration. */
  sundanese: {
    signature: "ᮞᮝᮜ ᮛᮞ",
    aksaraSunda: "ᮃᮊ᮪ᮞᮛ ᮞᮥᮔ᮪ᮓ",
    rasa: "ᮛᮞ",
    numerals: ["᮰", "᮱", "᮲", "᮳", "᮴", "᮵", "᮶", "᮷", "᮸", "᮹"],
  },

  hero: {
    eyebrow: "S A W A L A   R A S A",
    headline: "A letter I never knew how to say.",
    supporting: "Enter our little world",
    primaryCta: "Enter the letter",
    secondaryCta: "Read the poem",
    photo: "/images/1.jpeg",
    photoAlt: "A quiet photograph from our story.",
  },

  poetry: {
    label: "The Original Poem",
    heading: "For Sifa Nuraliza",
    note: "Some feelings are easier to write than to say.",
    signature: "ᮎᮛᮤᮒ",
    poems: [
      {
        id: "sifa-poem",
        number: "᮱",
        title: "For Sifa Nuraliza",
        lines: [
          "aku lelah sayang, ancur rasanya",
          "",
          "terus terbakar dan tenggelam dalam noda situasi yang sulit ku mengerti saat ini,",
          "",
          "jadi...",
          "",
          "apakah kau sudi untuk meminjamkan bahu mu untuk menopang rasa lelahku yang menumpuk ini sekali lagi, sayang?",
          "",
          "maafkan si busuk ini sayang,",
          "",
          "maafkan jika dia memaksa untuk terus terlelap dalam relung matamu",
          "dia hanya seonggok cinta tak utuh sayang, jadi kumohon, izinkan dia terus menetap di dalam rimbunnya bunga bermekaran di hati mu yang suci itu... kumohon",
        ],
        emLines: [0, 2, 4, 6, 8, 9],
      },
    ],
  },

  timeline: {
    label: "A Quiet Story",
    heading: "The little chapters we have lived.",
    signature: "ᮛᮞ",
    entries: [
      {
        id: "met",
        number: "᮱",
        date: "the first meeting",
        title: "The moment it began",
        text: "A conversation I did not know would become the place I always return to.",
        photo: "/images/2.jpeg",
      },
      {
        id: "unexpected",
        number: "᮲",
        date: "small surprises",
        title: "The ordinary miracles",
        text: "The little moments that kept teaching me that love can live quietly and still feel huge.",
      },
      {
        id: "memories",
        number: "᮳",
        date: "soft hours",
        title: "The memories we keep",
        text: "The laughter, the silences, and every ordinary day we have turned into something tender.",
        photo: "/images/4.jpeg",
      },
      {
        id: "home",
        number: "᮴",
        date: "homecoming",
        title: "The place I feel safe",
        text: "When being with you began to feel like a home I never wanted to leave.",
      },
      {
        id: "next",
        number: "᮵",
        date: "still writing",
        title: "Whatever comes next",
        text: "I want every chapter from here onward to be one where you are still in it, gently and truly.",
        photo: "/images/7.jpeg",
      },
    ],
  },

  gallery: {
    label: "Eleven Fragments of Us",
    heading: "A sequence of memories, not a perfect archive.",
    signature: "ᮛᮞ",
    photos: [
      { id: "p1", src: "/images/1.jpeg", alt: "A quiet, personal photograph from our story.", caption: "Where it began.", size: "feature" },
      { id: "p2", src: "/images/2.jpeg", alt: "A tender moment in the middle of our story.", caption: "The way your laughter settled in me.", size: "tall" },
      { id: "p3", src: "/images/3.jpeg", alt: "A moment of stillness shared between us.", caption: "Our kind of quiet.", size: "square" },
      { id: "p4", src: "/images/4.jpeg", alt: "A candid memory from a softer hour.", caption: "Small hours, soft light.", size: "wide" },
      { id: "p5", src: "/images/5.jpeg", alt: "A story told through a shared glance.", caption: "The look I keep returning to.", size: "square" },
      { id: "p6", src: "/images/6.jpeg", alt: "A warm, real photograph of us in motion.", caption: "The world felt kinder with you in it.", size: "tall" },
      { id: "p7", src: "/images/7.jpeg", alt: "A golden hour memory from our days together.", caption: "Sunday, somehow golden.", size: "wide" },
      { id: "p8", src: "/images/8.jpeg", alt: "A candid photograph of us in a quiet scene.", caption: "Still more pages to turn.", size: "square" },
      { id: "p9", src: "/images/9.jpeg", alt: "A tender memory we keep close.", caption: "The kind of tenderness you can feel.", size: "square" },
      { id: "p10", src: "/images/10.jpeg", alt: "A warm, intimate photograph from our collection.", caption: "The feeling of being home.", size: "tall" },
      { id: "p11", src: "/images/11.jpeg", alt: "The final, lingering memory in our story.", caption: "Always the one I choose.", size: "wide" },
    ],
  },

  loveLetter: {
    label: "A Letter for Sifa",
    heading: "Some feelings are easier to write than to say.",
    seal: "ᮞ",
    openLabel: "Open your letter",
    closeLabel: "Fold the letter",
    paragraphs: [
      "Sifa, if these words reach you the way you reached me — quietly, and all at once — then I have already said more than I ever meant to say out loud.",
      "I never planned for you to become this kind of comfort in my life. I did not know I was waiting for your name, your laugh, your calm, until one day it was simply there, and I did not want to be anywhere else.",
      "You have become the place where my tired heart learns how to rest. In your patience, in your gentleness, in the way you make ordinary hours feel softer and kinder. I love you in the quietest places, in the hardest days, and in the simple moments where no words are needed at all.",
      "I am not always graceful with my feelings. I am tired, imperfect, and sometimes too honest in ways that make me feel exposed. But if there is one thing I know without confusion, it is this: I want to be gentler with you, softer with you, and more honest with you than I have ever been with anyone else.",
      "So if I am allowed to keep loving you, then I will do it in the simplest ways I know: by staying, by listening, by being present, and by loving you in the way that feels like home.",
    ],
    closing: "With all my heart, always,",
    signature: "Fachri",
    date: "For Sifa Nuraliza",
  },

  closing: {
    headline: "Somewhere between the words I cannot say and the feelings I cannot hide, there will always be a place for you.",
    line: "Sifa Nuraliza",
    recipient: "Sawala Rasa",
    cta: "Read our story again",
    signature: "ᮞᮝᮜ ᮛᮞ",
  },

  navigation: {
    links: [
      { href: "#poems", label: "Poem" },
      { href: "#story", label: "Story" },
      { href: "#gallery", label: "Gallery" },
      { href: "#letter", label: "Letter" },
    ],
  },

  music: {
    // Replace this single path to change the licensed instrumental soundtrack.
    src: "/audio/background-music.mp3",
    label: "Music",
    hint: "A calm melody for the quiet moments.",
    unavailableHint: "Music is unavailable right now. Add the soundtrack to /public/audio/background-music.mp3.",
  },
};

export type SiteConfig = typeof siteConfig;
