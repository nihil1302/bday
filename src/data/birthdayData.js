/**
 * ===================================================================
 * 🎂 BIRTHDAY SURPRISE CONFIGURATION DATA
 * ===================================================================
 * 
 * Edit this single file to personalize the entire birthday experience!
 * All names, messages, photo paths, and inside jokes are centralized here.
 * 
 * Placeholders are marked clearly with brackets: [LIKE THIS].
 * Replace them with your best friend's real memories and details.
 */

export const birthdayData = {
  // --- Basic Recipient & Sender Info ---
  recipient: {
    name: "Elizaaa✨",
    nickname: "elii 🌸",
    birthDate: "Today's Special Day", // Replace with [Her Birth Date]
    age: "Forever 21 ✨", // Optional: e.g. "21" or "Forever 18 ✨"
  },
  sender: {
    name: "Nihil", // Replace with [Your Name]
    relationship: "Your Best Friend Forever 🤞",
  },

  // --- Stage 1: Opening Screen & Envelope ---
  openingScreen: {
    badgeText: "A Birthday Surprise ✨",
    caption: "Someone made something special just for you.",
    envelopeStampText: "FOR YOU",
    envelopeCoverSubtitle: "Crafted with love, laughter, and cherished memories",
    buttonText: "Open Your Surprise ♡",
    openingMessage: "Opening your surprise...",
  },

  // --- Stage 2: Friendship Scrapbook ---
  scrapbook: {
    title: "Little Moments, Big Memories ♡",
    subtitle: "A handmade collection of our favorite smiles, late-night talks, and chaotic adventures",
    badge: "CHAPTER 02 • OUR MEMORIES",
    memories: [
      {
        id: 1,
        title: "The Day We First Clicked 💫",
        date: "College Days, 2024",
        caption: "Who knew that one meet at the IPM office would lead to years of unstoppable gossip and late-night calls?",
        image: "/images/memory-1.jpeg",
        rotation: "-2deg",
        sticker: "🌸",
        tapeColor: "pink",
        tag: "Core Memory"
      },
      {
        id: 2,
        title: "That Unexpected bond between us 💖",
        date: "August 2024",
        caption: "Never expected to find such a deep connection with someone so effortlessly.",
        image: "/images/memory-2.jpeg",
        rotation: "3deg",
        sticker: "⭐",
        tapeColor: "yellow",
        tag: "Unforgettable"
      },
      {
        id: 3,
        title: "Fighting all misunderstandings and finding our way back to each other 🫂",
        date: "December 2024",
        caption: "Learning to communicate better and appreciating the strength of our friendship.",
        image: "/images/memory-3.jpeg",
        rotation: "-1.5deg",
        sticker: "💌",
        tapeColor: "lavender",
        tag: "Resilient"
      },
      {
        id: 4,
        title: "Cinema outings, laughter, and endless popcorn 🍿",
        date: "Exam Break 2024",
        caption: "The best part about going to the movies with you is the laughter and the shared experience.",
        image: "/images/memory-4.jpeg",
        rotation: "2.5deg",
        sticker: "🎬",
        tapeColor: "peach",
        tag: "Movie Buffs"
      },
      {
        id: 5,
        title: "Our Forever bond 💖",
        date: "Always & Forever",
        caption: "The connection we have is unbreakable, and honestly that is our biggest flex.",
        image: "/images/memory-5.jpeg",
        rotation: "-2.5deg",
        sticker: "💖",
        tapeColor: "teal",
        tag: "Pure Chaos"
      },
      {
        id: 6,
        title: "Celebrating Small Wins Together 🥂",
        date: "Fall 2024",
        caption: "Every time something good happened, you were the first one cheering for me like my personal hype woman.",
        image: "/images/memory-6.jpeg",
        rotation: "1.5deg",
        sticker: "✨",
        tapeColor: "pink",
        tag: "Milestone"
      },
      {
        id: 7,
        title: "Forever My Safe Space 🫂",
        date: "Every Single Day",
        caption: "Thank you for always listening, never judging, and being the truest best friend I could ever ask for.",
        image: "/images/memory-7.jpeg",
        rotation: "-2deg",
        sticker: "💌",
        tapeColor: "lavender",
        tag: "Unconditional"
      },
      {
        id: 8,
        title: "Golden Hour Smiles 🌅",
        date: "Birthday, 2024",
        caption: "Moment of surprise and joy in ur face.",
        image: "/images/memory-8.jpeg",
        rotation: "2.5deg",
        sticker: "🌸",
        tapeColor: "yellow",
        tag: "Radiant"
      }
    ],
    stickyNotes: [
      {
        id: "note-1",
        text: "“A best friend is someone who knows all your stories, but helped you write them.” 🌸",
        rotation: "-3deg",
        color: "bg-amber-100 text-amber-900 border-amber-200"
      },
      {
        id: "note-2",
        text: "Official Bestie Rule: If one of us says ‘I'm on my way,’ the countdown starts in 45 minutes.",
        rotation: "2deg",
        color: "bg-rose-100 text-rose-900 border-rose-200"
      }
    ],
    insideJokes: [
      "Remember: “We can roast each other all day, but nobody else gets that privilege.” 🫶",
      "Official rule: “We agreed to never speak about that day again.” 💀",
      "Code phrase:One screenshot. Zero context. Immediate emergency meeting."
    ]
  },

  // --- Stage 3: Heartfelt Letter ---
  letter: {
    title: "A Letter From My Heart ♡",
    subtitle: "A little stationery note dedicated to my favorite human in the world",
    badge: "CHAPTER 03 • HEARTFELT LETTER",
    envelopeCoverText: "A Letter for Elizaaa",
    envelopeSubtitle: "Tap the wax seal to unfold and read",
    paperStamp: "SEALED WITH LOVE",
    date: "October 20, 2026",
    salutation: "Dearest Elizaaa (my elii) ✨,",
    bodyParagraphs: [
      "Happy, happy Birthday to the girl who brings the brightest sunshine into my everyday life! Today is all about celebrating your laughter, your kindness, and the genuine warmth you radiate to everyone around you.",
      "Looking back at everything we've experienced—from random midnight cravings and unstoppable laugh attacks to being each other's rock through life's unpredictable storms—I am endlessly grateful for this friendship. You are the first person I want to text whenever something hilarious happens, and the one whose advice I trust without a second thought.",
      "Thank you for being my constant sanity check, my unapologetic hype squad, and for always understanding my thoughts even when I can barely explain them. You make life so much more colorful, louder, and genuinely sweeter.",
      "I hope this new year of life showers you with everything you've been working so hard for: peaceful mornings, wild adventures, zero stress, and endless reasons to smile. Never doubt how loved, irreplaceable, and cherished you are."
    ],
    closing: "With all my love & endless gratitude,",
    signature: "Nihil... 💖",
    postscript: "P.S. Scroll down to open three secret notes I wrote just for you! 💌",
    clickableNotes: [
      {
        id: "smile",
        buttonLabel: "When you need a smile 🌸",
        title: "When You Need a Smile",
        tag: "FOR A GLOOMY DAY",
        emoji: "😊",
        accent: "rose",
        content: "Remember: No matter how stressful, frustrating, or overwhelming a day feels, you always have a best friend who is ready to drop everything, send you embarrassing memes, and listen to you rant until we're both laughing. You are never alone in anything!"
      },
      {
        id: "special",
        buttonLabel: "A reminder of how special you are ✨",
        title: "A Reminder of How Special You Are",
        tag: "NEVER FORGET THIS",
        emoji: "⭐",
        accent: "amber",
        content: "In a world that is always in a hurry, you have this rare superpower of making people feel deeply seen, valued, and safe. You possess so much quiet strength, brilliance, and grace. Never ever doubt your worth or dim your light for anyone."
      },
      {
        id: "promise",
        buttonLabel: "One little promise from me 🤞",
        title: "One Little Promise From Me",
        tag: "LIFETIME BESTIE PACT",
        emoji: "💖",
        accent: "purple",
        content: "I promise to always be the loudest cheerleader in your corner, to celebrate your biggest wins and hold your hand through the hardest days, and to never let you navigate life's madness alone. Cheers to forever, elii!"
      }
    ]
  },

  // --- Stage 4: Interactive Surprise / Cake & Candle & Gift Box ---
  interactiveSurprise: {
    badge: "CHAPTER 04 • MAKE A WISH",
    headline: "Make a Birthday Wish, Elizaaa! 🎂",
    subtext: "Close your eyes, make the sweetest wish for this year, and blow out the candles!",
    candleCount: 3,
    wishButtonText: "Make a Birthday Wish ♡",
    blownMessage: "I hope this year brings you all the happiness you deserve ♡",
    blownSubMessage: "Your wish has been whispered to the stars! May every single dream of yours turn into reality, elii ✨",
    relightButtonText: "Relight the Candles 🕯️",
    nextStageButtonText: "There's One Last Thing...",
    giftBox: {
      tag: "BONUS SURPRISE 🎁",
      heading: "A Secret Gift Box for You 🎁",
      subtext: "Tap the ribbon to unwrap a little hidden bestie voucher",
      voucherTitle: "Golden Bestie Coupon 🎟️",
      voucherTag: "100% REDEEMABLE",
      voucherContent: "This coupon is officially redeemable anytime, anywhere with zero expiration date for: One free coffee/treat on me, unlimited late-night venting, unconditional hype in any argument, and an emergency hangout whenever you need a boost. Happy Birthday, Elizaaa (elii)!",
      voucherSign: "Valid for life • Signed with love by Nihil 💖",
      closeButtonText: "Fold Back Box 🎀"
    }
  },

  // --- Stage 5: Grand Finale Celebration ---
  celebration: {
    badge: "CHAPTER 05 • THE GRAND FINALE",
    headline: "Happy Birthday, Elizaaa! 🥂✨",
    subheadline: "Here's to another year of unstoppable laughter, wild dreams, and forever friendship.",
    favouritePhoto: {
      image: "/images/favourite.jpeg",
      title: "My Absolute Favourite Picture of Us 💖",
      caption: "This photo captured everything that makes you so special—radiant, joyful, and completely unapologetically yourself.",
      date: "Forever Cherished",
      tag: "FAVOURITE"
    },
    messageTitle: "To My Partner in Crime & Dearest Best Friend,",
    messageParagraphs: [
      "If there is one thing I want you to carry into this new chapter of your life, it's the certainty that you are so fiercely loved, endlessly appreciated, and admired more than you know.",
      "Thank you for being the person who makes the ordinary days extraordinary, who turns chaotic moments into core memories, and who has been my absolute rock through every high and low.",
      "I hope this upcoming year brings you unshakeable peace, exciting adventures, boundless love, our friendship, and every single thing your heart has been whispering for. No matter where life takes us or how busy things get, I will always be right here in your corner.",
      "Happy, happy Birthday, elii! Here's to us, to all the memories behind us, and to the countless unforgettable stories still waiting to be written. 🥂✨"
    ],
    closingCard: {
      tag: "SEALED WITH LOVE",
      title: "Made with love, just for you ♡",
      subtext: "A digital keepsake from Nihil... for the most wonderful friend in the universe.",
      craftedNote: "Designed with cherished memories, inside jokes & infinite appreciation."
    },
    hugInteraction: {
      buttonLabel: "One last hug? 🤗",
      modalTitle: "A Warm Bear Hug Just For You! 🫂💖",
      modalTag: "UNLIMITED HUGS ENCLOSED",
      message: "Wrapping you in the biggest, warmest, and tightest bestie hug across any distance! Thank you for being you. Happy Birthday, my dearest elii! ✨",
      closeLabel: "Hug Received ♡"
    },
    replayButtonText: "Replay Experience From Beginning 🔄"
  },

  // --- Ambient Music / Sound settings ---
  audio: {
    title: "Sweet Birthday Lofi Ambient Melodies",
    autoPlayPrompt: "Turn sound on for the cozy birthday experience 🎵",
  }
};
