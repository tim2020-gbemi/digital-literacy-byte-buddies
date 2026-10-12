// All learning content for Byte Buddies lives here.
// Each world = a few story "lesson" slides followed by mini-game activities.

export type Lesson = {
  title: string
  emoji: string
  text: string
  fact?: string
}

export type QuizActivity = {
  kind: 'quiz'
  title: string
  questions: {
    prompt: string
    emoji?: string
    options: { label: string; emoji?: string }[]
    answer: number
    explain: string
  }[]
}

export type SortActivity = {
  kind: 'sort'
  title: string
  prompt: string
  bins: [{ label: string; emoji: string }, { label: string; emoji: string }]
  items: { label: string; emoji: string; bin: 0 | 1; explain?: string }[]
}

export type MatchActivity = {
  kind: 'match'
  title: string
  prompt: string
  pairs: { left: string; emoji: string; right: string }[]
}

export type SequenceActivity = {
  kind: 'sequence'
  title: string
  prompt: string
  steps: { label: string; emoji: string }[] // listed in the correct order
}

export type BinaryActivity = {
  kind: 'binary'
  title: string
  prompt: string
  targets: number[]
}

export type Activity =
  | QuizActivity
  | SortActivity
  | MatchActivity
  | SequenceActivity
  | BinaryActivity

export type WorldTheme = {
  solid: string
  soft: string
  text: string
  border: string
  button: string
  gradient: string
}

export type World = {
  id: string
  number: number
  name: string
  tagline: string
  emoji: string
  image: string
  theme: WorldTheme
  badge: { name: string; emoji: string }
  lessons: Lesson[]
  activities: Activity[]
}

export const worlds: World[] = [
  {
    id: 'meet-the-computer',
    number: 1,
    name: 'Meet the Computer',
    tagline: 'What is a computer, anyway?',
    emoji: '🖥️',
    image: 'world-meet',
    theme: {
      solid: 'bg-sky-500',
      soft: 'bg-sky-100',
      text: 'text-sky-700',
      border: 'border-sky-300',
      button: 'bg-sky-500 hover:bg-sky-400 shadow-[0_6px_0_#0369a1]',
      gradient: 'from-sky-300 to-cyan-200',
    },
    badge: { name: 'Computer Spotter', emoji: '🔍' },
    lessons: [
      {
        title: 'Hi! I am Bit!',
        emoji: '🤖',
        text: 'A computer is a machine that follows instructions to help people. It can do math, show pictures, play music and games, and much more!',
        fact: 'The word "computer" used to mean a PERSON who did math problems all day!',
      },
      {
        title: 'Computers come in many shapes',
        emoji: '📱',
        text: 'Laptops, tablets, phones, game consoles, and even smart watches are all computers. Some computers are hidden inside cars, toys and washing machines!',
      },
      {
        title: 'Meet the parts',
        emoji: '⌨️',
        text: 'The SCREEN shows you pictures and words. The KEYBOARD lets you type. The MOUSE helps you point and click. SPEAKERS play sounds.',
        fact: 'The first computer mouse was made of wood!',
      },
      {
        title: 'Hardware and software',
        emoji: '🧩',
        text: 'HARDWARE is the parts you can touch, like the keyboard. SOFTWARE is the instructions inside, like games and apps. They work together as a team!',
      },
    ],
    activities: [
      {
        kind: 'sort',
        title: 'Computer or Not?',
        prompt: 'Is this a computer? Tap the right basket!',
        bins: [
          { label: 'Computer', emoji: '💻' },
          { label: 'Not a computer', emoji: '🚫' },
        ],
        items: [
          { label: 'Tablet', emoji: '📱', bin: 0, explain: 'A tablet follows instructions, so it is a computer!' },
          { label: 'Teddy bear', emoji: '🧸', bin: 1, explain: 'A teddy is cuddly, but it cannot follow instructions.' },
          { label: 'Laptop', emoji: '💻', bin: 0, explain: 'A laptop is a computer you can carry around.' },
          { label: 'Banana', emoji: '🍌', bin: 1, explain: 'Yum! But a banana is not a computer.' },
          { label: 'Smart watch', emoji: '⌚', bin: 0, explain: 'A smart watch has a tiny computer inside!' },
          { label: 'Game console', emoji: '🎮', bin: 0, explain: 'Game consoles are computers made for playing games.' },
          { label: 'Pencil', emoji: '✏️', bin: 1, explain: 'A pencil needs YOU to do all the work.' },
        ],
      },
      {
        kind: 'match',
        title: 'Parts Party',
        prompt: 'Match each part to its job. Tap a part, then tap its job!',
        pairs: [
          { left: 'Screen', emoji: '🖥️', right: 'Shows pictures and words' },
          { left: 'Keyboard', emoji: '⌨️', right: 'Types letters and numbers' },
          { left: 'Mouse', emoji: '🖱️', right: 'Points and clicks' },
          { left: 'Speakers', emoji: '🔊', right: 'Plays sounds and music' },
        ],
      },
      {
        kind: 'sort',
        title: 'Touch It or Not?',
        prompt: 'Is it hardware (you can touch it) or software (instructions)?',
        bins: [
          { label: 'Hardware', emoji: '🔧' },
          { label: 'Software', emoji: '✨' },
        ],
        items: [
          { label: 'Keyboard', emoji: '⌨️', bin: 0 },
          { label: 'A drawing app', emoji: '🎨', bin: 1 },
          { label: 'Headphones', emoji: '🎧', bin: 0 },
          { label: 'A video game', emoji: '👾', bin: 1 },
          { label: 'Printer', emoji: '🖨️', bin: 0 },
          { label: 'A web browser', emoji: '🌐', bin: 1 },
        ],
      },
    ],
  },
  {
    id: 'inside-the-machine',
    number: 2,
    name: 'Inside the Machine',
    tagline: 'How does a computer think?',
    emoji: '⚙️',
    image: 'world-inside',
    theme: {
      solid: 'bg-violet-500',
      soft: 'bg-violet-100',
      text: 'text-violet-700',
      border: 'border-violet-300',
      button: 'bg-violet-500 hover:bg-violet-400 shadow-[0_6px_0_#5b21b6]',
      gradient: 'from-violet-300 to-fuchsia-200',
    },
    badge: { name: 'Chip Champion', emoji: '🧠' },
    lessons: [
      {
        title: 'In, think, out!',
        emoji: '🔄',
        text: 'Every computer does 4 jobs: INPUT (it gets information), PROCESS (it thinks about it), STORAGE (it saves it) and OUTPUT (it shows you the answer).',
      },
      {
        title: 'The CPU is the brain',
        emoji: '🧠',
        text: 'The CPU is a tiny chip that does all the thinking. It can do BILLIONS of little steps every second. That is faster than you can blink!',
        fact: 'A CPU chip is smaller than a cookie, but it is very, very fast.',
      },
      {
        title: 'Remembering things',
        emoji: '🗄️',
        text: 'MEMORY (RAM) is like a desk: it holds what you are working on right now. STORAGE is like a toy box: it keeps your files safe, even when the computer is off.',
      },
      {
        title: 'The secret language: 1s and 0s',
        emoji: '💡',
        text: 'Deep inside, computers only understand ON and OFF, like a light switch. We write ON as 1 and OFF as 0. This is called BINARY!',
        fact: 'Every photo, song and game is made of millions of 1s and 0s.',
      },
    ],
    activities: [
      {
        kind: 'sequence',
        title: 'Computer Steps',
        prompt: 'You type a letter and see it on screen. Tap the steps in order!',
        steps: [
          { label: 'Input: you press a key', emoji: '⌨️' },
          { label: 'Process: the CPU thinks', emoji: '🧠' },
          { label: 'Storage: it saves the letter', emoji: '🗄️' },
          { label: 'Output: it shows on screen', emoji: '🖥️' },
        ],
      },
      {
        kind: 'sort',
        title: 'In or Out?',
        prompt: 'Does it put information IN, or bring it OUT to you?',
        bins: [
          { label: 'Input', emoji: '📥' },
          { label: 'Output', emoji: '📤' },
        ],
        items: [
          { label: 'Microphone', emoji: '🎤', bin: 0, explain: 'A microphone sends your voice INTO the computer.' },
          { label: 'Speakers', emoji: '🔊', bin: 1, explain: 'Speakers bring sound OUT to your ears.' },
          { label: 'Mouse', emoji: '🖱️', bin: 0, explain: 'Clicking the mouse tells the computer what to do.' },
          { label: 'Printer', emoji: '🖨️', bin: 1, explain: 'A printer puts your work OUT onto paper.' },
          { label: 'Camera', emoji: '📷', bin: 0, explain: 'A camera sends pictures IN.' },
          { label: 'Screen', emoji: '🖥️', bin: 1, explain: 'The screen shows things OUT to you.' },
        ],
      },
      {
        kind: 'binary',
        title: 'Light Up the Number',
        prompt: 'Each bulb has a value. Turn bulbs ON so they add up to the number!',
        targets: [1, 3, 5, 8, 12, 15],
      },
    ],
  },
  {
    id: 'computers-everywhere',
    number: 3,
    name: 'Computers Everywhere',
    tagline: 'All the ways computers help us',
    emoji: '🌍',
    image: 'world-uses',
    theme: {
      solid: 'bg-emerald-500',
      soft: 'bg-emerald-100',
      text: 'text-emerald-700',
      border: 'border-emerald-300',
      button: 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_6px_0_#047857]',
      gradient: 'from-emerald-300 to-lime-200',
    },
    badge: { name: 'Super Helper', emoji: '🦸' },
    lessons: [
      {
        title: 'At school and at home',
        emoji: '🏫',
        text: 'We use computers to learn, write stories, draw pictures, read books and talk to family who live far away.',
      },
      {
        title: 'Helping grown-ups at work',
        emoji: '🩺',
        text: 'Doctors use computers to look inside your body. Pilots use them to fly planes. Farmers use them to know when to water crops!',
      },
      {
        title: 'Making fun things',
        emoji: '🎬',
        text: 'Cartoons, music, and video games are all made with computers. People who write instructions for computers are called PROGRAMMERS. You could be one too!',
        fact: 'Some movie dragons and monsters are drawn completely on a computer.',
      },
    ],
    activities: [
      {
        kind: 'match',
        title: 'Who Uses It?',
        prompt: 'How does each person use a computer? Tap to match!',
        pairs: [
          { left: 'Doctor', emoji: '👩‍⚕️', right: 'Looks at X-ray pictures' },
          { left: 'Weather reporter', emoji: '🌦️', right: 'Guesses if it will rain' },
          { left: 'Artist', emoji: '🎨', right: 'Paints digital pictures' },
          { left: 'Pilot', emoji: '👨‍✈️', right: 'Finds the way in the sky' },
        ],
      },
      {
        kind: 'quiz',
        title: 'Computer Helpers Quiz',
        questions: [
          {
            prompt: 'You want to say hi to Grandma who lives far away. What can a computer do?',
            emoji: '👵',
            options: [
              { label: 'A video call', emoji: '📹' },
              { label: 'Bake a cake', emoji: '🎂' },
              { label: 'Water the plants', emoji: '🪴' },
            ],
            answer: 0,
            explain: 'Video calls let you see and hear people far away!',
          },
          {
            prompt: 'What do we call a person who writes instructions for computers?',
            emoji: '👩‍💻',
            options: [
              { label: 'A baker', emoji: '🧁' },
              { label: 'A programmer', emoji: '💻' },
              { label: 'A firefighter', emoji: '🚒' },
            ],
            answer: 1,
            explain: 'Programmers write code: instructions that tell computers what to do.',
          },
          {
            prompt: 'Which of these has a computer hidden inside?',
            emoji: '🔎',
            options: [
              { label: 'A rock', emoji: '🪨' },
              { label: 'A wooden chair', emoji: '🪑' },
              { label: 'A modern car', emoji: '🚗' },
            ],
            answer: 2,
            explain: 'Cars have many tiny computers to help with brakes, maps and more.',
          },
        ],
      },
    ],
  },
  {
    id: 'internet-galaxy',
    number: 4,
    name: 'Internet Galaxy',
    tagline: 'How computers talk to each other',
    emoji: '🛰️',
    image: 'world-internet',
    theme: {
      solid: 'bg-indigo-500',
      soft: 'bg-indigo-100',
      text: 'text-indigo-700',
      border: 'border-indigo-300',
      button: 'bg-indigo-500 hover:bg-indigo-400 shadow-[0_6px_0_#3730a3]',
      gradient: 'from-indigo-300 to-sky-200',
    },
    badge: { name: 'Net Navigator', emoji: '🚀' },
    lessons: [
      {
        title: 'A giant web of computers',
        emoji: '🕸️',
        text: 'The INTERNET is millions of computers all around the world connected together, like a huge spider web. They send messages to each other super fast!',
      },
      {
        title: 'Websites and browsers',
        emoji: '🌐',
        text: 'A WEBSITE is like a page in a giant book. A BROWSER is the app you use to open websites. Each website has an address, like a house!',
      },
      {
        title: 'Tiny packets',
        emoji: '📦',
        text: 'When you send a picture, the computer cuts it into tiny pieces called PACKETS. They zoom through wires and Wi-Fi, then join back together on the other side!',
        fact: 'Some internet cables lie at the bottom of the ocean!',
      },
    ],
    activities: [
      {
        kind: 'sequence',
        title: 'Send a Message',
        prompt: 'How does your message get to a friend? Tap the steps in order!',
        steps: [
          { label: 'You type a message', emoji: '✍️' },
          { label: 'You press Send', emoji: '👆' },
          { label: 'It splits into packets', emoji: '📦' },
          { label: 'Packets zoom across the internet', emoji: '⚡' },
          { label: 'Your friend reads it', emoji: '😊' },
        ],
      },
      {
        kind: 'quiz',
        title: 'Galaxy Quiz',
        questions: [
          {
            prompt: 'What is the internet?',
            emoji: '🌍',
            options: [
              { label: 'One really big computer', emoji: '🖥️' },
              { label: 'Lots of computers connected together', emoji: '🕸️' },
              { label: 'A kind of TV show', emoji: '📺' },
            ],
            answer: 1,
            explain: 'The internet links millions of computers so they can share information.',
          },
          {
            prompt: 'Which app do you use to visit websites?',
            emoji: '🧭',
            options: [
              { label: 'A browser', emoji: '🌐' },
              { label: 'A calculator', emoji: '🧮' },
              { label: 'A camera', emoji: '📷' },
            ],
            answer: 0,
            explain: 'Browsers open websites for you.',
          },
          {
            prompt: 'A website said a cat can fly. What should you do?',
            emoji: '🐱',
            options: [
              { label: 'Believe it right away', emoji: '😮' },
              { label: 'Check with a grown-up or another source', emoji: '🧐' },
            ],
            answer: 1,
            explain: 'Not everything online is true. Good detectives check facts!',
          },
        ],
      },
    ],
  },
  {
    id: 'safety-shield',
    number: 5,
    name: 'Safety Shield',
    tagline: 'Be safe, smart and kind online',
    emoji: '🛡️',
    image: 'world-safety',
    theme: {
      solid: 'bg-rose-500',
      soft: 'bg-rose-100',
      text: 'text-rose-700',
      border: 'border-rose-300',
      button: 'bg-rose-500 hover:bg-rose-400 shadow-[0_6px_0_#be123c]',
      gradient: 'from-rose-300 to-amber-200',
    },
    badge: { name: 'Digital Hero', emoji: '🏆' },
    lessons: [
      {
        title: 'Keep your secrets secret',
        emoji: '🤫',
        text: 'Your full name, address, school and passwords are PRIVATE. Never share them online with people you do not know.',
      },
      {
        title: 'Strong passwords',
        emoji: '🔐',
        text: 'A password is a secret key. Strong ones are long and mix words, numbers and symbols, like "PurpleTiger!42". Only share it with your grown-up.',
      },
      {
        title: 'Ask a grown-up',
        emoji: '🙋',
        text: 'If something online feels scary, weird or makes you sad, stop and tell a grown-up you trust. You will never be in trouble for asking!',
      },
      {
        title: 'Be kind and take breaks',
        emoji: '💖',
        text: 'Treat people online the way you want to be treated. And remember to rest your eyes, play outside and move your body!',
      },
    ],
    activities: [
      {
        kind: 'sort',
        title: 'Safe or Not Safe?',
        prompt: 'Is this a safe thing to do online?',
        bins: [
          { label: 'Safe', emoji: '✅' },
          { label: 'Not safe', emoji: '⛔' },
        ],
        items: [
          { label: 'Telling a grown-up about a scary message', emoji: '🙋', bin: 0, explain: 'Yes! Grown-ups are there to help.' },
          { label: 'Sharing your home address with a stranger', emoji: '🏠', bin: 1, explain: 'Your address is private. Keep it secret!' },
          { label: 'Writing a kind comment', emoji: '💬', bin: 0, explain: 'Kind words make the internet a happy place.' },
          { label: 'Telling a friend your password', emoji: '🔑', bin: 1, explain: 'Passwords are only for you and your grown-up.' },
          { label: 'Clicking a pop-up that says "YOU WON!"', emoji: '🎁', bin: 1, explain: 'Pop-ups like this are often tricks. Close them!' },
          { label: 'Taking a break to play outside', emoji: '⚽', bin: 0, explain: 'Breaks are great for your body and brain.' },
        ],
      },
      {
        kind: 'quiz',
        title: 'Password Power',
        questions: [
          {
            prompt: 'Which password is the strongest?',
            emoji: '🔐',
            options: [
              { label: '1234' },
              { label: 'password' },
              { label: 'Rocket!Banana77' },
            ],
            answer: 2,
            explain: 'Long passwords with words, numbers and symbols are hardest to guess.',
          },
          {
            prompt: 'Someone you do not know asks for a photo of you. What do you do?',
            emoji: '📸',
            options: [
              { label: 'Send it', emoji: '📤' },
              { label: 'Say no and tell a grown-up', emoji: '🙋' },
            ],
            answer: 1,
            explain: 'Never send photos to strangers. Always tell a trusted grown-up.',
          },
          {
            prompt: 'A classmate posts a mean comment about a friend. What is the kind thing to do?',
            emoji: '💬',
            options: [
              { label: 'Add another mean comment', emoji: '😠' },
              { label: 'Support your friend and tell a grown-up', emoji: '🤝' },
              { label: 'Share it with everyone', emoji: '📣' },
            ],
            answer: 1,
            explain: 'Being an upstander helps everyone feel safe.',
          },
        ],
      },
    ],
  },
]

export function getWorld(id: string) {
  return worlds.find((w) => w.id === id)
}
