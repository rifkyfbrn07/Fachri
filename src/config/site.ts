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
 *  - Add your own song at /public/audio/music.mp3 (or change `music.src`).
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
  tagline: "Two Hearts, One Unwritten Story.",

  /** Verified Sundanese script — used only as small visual signatures.
   *  "Aksara Sunda" is confirmed against Unicode / public references;
   *  the site name is a faithful phonetic transliteration. */
  sundanese: {
    signature: "ᮞᮝᮜ ᮛᮞ", // "Sawala Rasa" (phonetic)
    aksaraSunda: "ᮃᮊ᮪ᮞᮛ ᮞᮥᮔ᮪ᮓ", // "Aksara Sunda" (verified)
    rasa: "ᮛᮞ", // "rasa" — feeling
    numerals: ["᮰", "᮱", "᮲", "᮳", "᮴", "᮵", "᮶", "᮷", "᮸", "᮹"],
  },

  hero: {
    eyebrow: "Sawala Rasa",
    headline: "Somehow, Every Road Led Me to You.",
    supporting:
      "Of all the moments life could have given me, I am grateful it gave me you.",
    primaryCta: "Explore Our Story",
    secondaryCta: "A Letter for You",
    photo: "/images/hero.svg",
    photoAlt:
      "A quiet, golden placeholder for the photograph that begins our story.",
  },

  poetry: {
    label: "Words I Never Said",
    heading: "Poems I kept, until you.",
    note: "Written slowly, the way love is.",
    /** Sundanese script signature mark shown beside the section label */
    signature: "ᮎᮛᮤᮒ", // "carita" — story
    poems: [
      {
        id: "encounter",
        number: "᮱",
        title: "The First Encounter",
        lines: [
          "I didn't notice the world going quiet,",
          "only the way your voice found its way in",
          "and stayed.",
          "",
          "We talked about nothing important —",
          "the kind of nothing",
          "that becomes everything later.",
          "",
          "Now I keep returning to that hour,",
          "the way one returns to a room",
          "where something beautiful once happened.",
          "",
          "And I think: of all the doors",
          "that could have stayed closed,",
          "you are the one I am glad swung open.",
        ],
        emLines: [2, 6, 14],
      },
      {
        id: "distance",
        number: "᮲",
        title: "When You Are Far",
        lines: [
          "Distance has a curious habit —",
          "it sharpens what it cannot take.",
          "",
          "I find you in small places:",
          "a certain slant of afternoon light,",
          "the scent of rain on warm stone,",
          "a song I never finished for you.",
          "",
          "I have learned to wait gently,",
          "to let the hours pass like weather,",
          "knowing that every goodbye",
          "is only a long way of saying",
          "“I am already on my way back.”",
        ],
        emLines: [1, 6, 12],
      },
      {
        id: "little-things",
        number: "᮳",
        title: "Small Hours, Soft Things",
        lines: [
          "I love you most in the small hours —",
          "the way you stir a spoon in your coffee,",
          "counting the slow circles of a morning",
          "that belongs to no one but us.",
          "",
          "Your habits have become my furniture:",
          "the book left open on the sill,",
          "your laugh arriving before your words,",
          "the way you say my name",
          "like it is something you have kept.",
          "",
          "Big things shout, but it is the quiet ones",
          "that build a home.",
        ],
        emLines: [0, 8, 11],
      },
      {
        id: "seasons",
        number: "᮴",
        title: "I Would Still Choose You",
        lines: [
          "If I had to do it all again —",
          "the spring of first meetings,",
          "the summer of long goodnights,",
          "the autumn when we learned",
          "that love is also a patience —",
          "",
          "I would still find you.",
          "",
          "Not because the road was easy,",
          "but because at every turning",
          "it was you I wanted waiting.",
          "",
          "So let the years change the weather.",
          "I will keep choosing you",
          "through every season I am given.",
        ],
        emLines: [6, 12],
      },
    ],
  },

  timeline: {
    label: "Chapters of Us",
    heading: "The story so far.",
    signature: "ᮛᮞ",
    entries: [
      {
        id: "met",
        number: "᮱",
        date: "[ Add a date ]",
        title: "The Day We Met",
        text: "Two strangers, one unremarkable afternoon, and a conversation we somehow never wanted to end.",
        photo: "/images/photo-2.svg",
      },
      {
        id: "unexpected",
        number: "᮲",
        date: "[ Add a date ]",
        title: "The Unexpected Moments",
        text: "The small surprises that taught me love is not found — it happens, when you are not looking for it.",
      },
      {
        id: "memories",
        number: "᮳",
        date: "[ Add a date ]",
        title: "The Memories We Keep",
        text: "The laughter, the silences, the ordinary days we have quietly turned into treasures.",
        photo: "/images/photo-4.svg",
      },
      {
        id: "home",
        number: "᮴",
        date: "[ Add a date ]",
        title: "The Days That Feel Like Home",
        text: "When being with you stopped feeling like an occasion and started feeling like the place I live.",
      },
      {
        id: "next",
        number: "᮵",
        date: "[ Add a date ]",
        title: "Whatever Comes Next",
        text: "The chapters we haven't written yet — and the quiet certainty that I want to write them with you.",
        photo: "/images/photo-7.svg",
      },
    ],
  },

  gallery: {
    label: "Fragments of Us",
    heading: "Eight small windows into us.",
    signature: "ᮛᮞ",
    photos: [
      {
        id: "p1",
        src: "/images/photo-1.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "Where it began.",
        size: "feature",
      },
      {
        id: "p2",
        src: "/images/photo-2.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "The way you laughed.",
        size: "tall",
      },
      {
        id: "p3",
        src: "/images/photo-3.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "Our kind of quiet.",
        size: "square",
      },
      {
        id: "p4",
        src: "/images/photo-4.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "Small hours, soft light.",
        size: "wide",
      },
      {
        id: "p5",
        src: "/images/photo-5.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "A road we walked together.",
        size: "square",
      },
      {
        id: "p6",
        src: "/images/photo-6.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "The view I keep coming back to.",
        size: "tall",
      },
      {
        id: "p7",
        src: "/images/photo-7.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "Sunday, somehow golden.",
        size: "wide",
      },
      {
        id: "p8",
        src: "/images/photo-8.svg",
        alt: "A placeholder photograph — replace with a real image",
        caption: "Still more pages to turn.",
        size: "square",
      },
    ],
  },

  loveLetter: {
    label: "A Letter for You",
    heading: "Some things are easier written than said.",
    seal: "ᮞ", // the monogram inside the wax seal
    openLabel: "Open Your Letter",
    closeLabel: "Fold the Letter",
    paragraphs: [
      "My dearest, if these words find you the way you found me — quietly, and all at once — then I have already said more than I meant to.",
      "I did not plan for you. I had no map, no careful list of what I was looking for. And yet somewhere between an ordinary morning and a late-night conversation, you became the direction I could not stop walking toward.",
      "I love you in ways I have no language for. In the way you are gentle with things that cannot fight back. In the way you make ordinary days feel like occasions. In the way your name, even unsaid, sounds like rest.",
      "Whatever comes, I want it to come with you — the good days and the hard ones, the seasons that pass and the ones that stay. I will keep writing this letter for the rest of my life, a few lines at a time.",
      "Until then, know this: of every road, every door, every almost — I would choose you again, every time.",
    ],
    closing: "With all my heart, always,",
    signature: "[ Your name ]", // editable
    date: "[ Add a date ]", // editable
  },

  closing: {
    headline: "If I Could Choose Again",
    line: "Of all the moments life could have given me, I am grateful it gave me you.",
    recipient: "[ Her name ]", // optional
    cta: "Read Our Story Again",
    signature: "ᮞᮝᮜ ᮛᮞ",
  },

  navigation: {
    links: [
      { href: "#poems", label: "Poems" },
      { href: "#story", label: "Our Story" },
      { href: "#gallery", label: "Gallery" },
      { href: "#letter", label: "A Letter" },
    ],
  },

  music: {
    src: "/audio/music.wav",
    label: "Music",
    hint: "Add your own track at public/audio/music.wav",
  },
};

export type SiteConfig = typeof siteConfig;


