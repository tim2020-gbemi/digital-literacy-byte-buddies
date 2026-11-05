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
  {
    id: 'code-club',
    number: 6,
    name: 'Code Club',
    tagline: 'Give a computer step-by-step orders',
    emoji: '🧑‍💻',
    image: 'world-code',
    theme: {
      solid: 'bg-orange-500',
      soft: 'bg-orange-100',
      text: 'text-orange-700',
      border: 'border-orange-300',
      button: 'bg-orange-500 hover:bg-orange-400 shadow-[0_6px_0_#c2410c]',
      gradient: 'from-orange-300 to-yellow-200',
    },
    badge: { name: 'Junior Coder', emoji: '🧩' },
    lessons: [
      {
        title: 'What is code?',
        emoji: '📜',
        text: 'CODE is a list of instructions written for a computer. People who write code are called programmers or coders. You can be one too!',
      },
      {
        title: 'Algorithms are recipes',
        emoji: '🥪',
        text: 'An ALGORITHM is a set of steps in the right order, like a recipe for a sandwich. If the steps are mixed up, the sandwich goes wrong!',
        fact: 'You follow algorithms every day, like when you brush your teeth.',
      },
      {
        title: 'Loops repeat',
        emoji: '🔁',
        text: 'A LOOP tells the computer to do something again and again. Instead of writing "jump" ten times, you can say "repeat jump 10 times".',
      },
      {
        title: 'Bugs and debugging',
        emoji: '🐞',
        text: 'A BUG is a mistake in the code. Finding and fixing it is called DEBUGGING. Every coder makes bugs, so mistakes are part of learning!',
        fact: 'Long ago, a real moth got stuck inside a computer and caused a problem. People called it the first computer bug!',
      },
    ],
    activities: [
      {
        kind: 'sequence',
        title: 'Robot Sandwich',
        prompt: 'Help Bit make a jam sandwich. Tap the steps in order!',
        steps: [
          { label: 'Take two slices of bread', emoji: '🍞' },
          { label: 'Open the jam jar', emoji: '🫙' },
          { label: 'Spread jam on one slice', emoji: '🔪' },
          { label: 'Put the other slice on top', emoji: '🥪' },
          { label: 'Eat and enjoy!', emoji: '😋' },
        ],
      },
      {
        kind: 'quiz',
        title: 'Code Detective',
        questions: [
          {
            prompt: 'Bit must clap 5 times. What is the smartest code?',
            emoji: '👏',
            options: [
              { label: 'Clap, clap, clap, clap, clap', emoji: '📝' },
              { label: 'Repeat clap 5 times', emoji: '🔁' },
              { label: 'Clap once', emoji: '1️⃣' },
            ],
            answer: 1,
            explain: 'A loop says it once and repeats it. Short and smart!',
          },
          {
            prompt: 'Your code makes the robot walk into a wall. What is that called?',
            emoji: '🧱',
            options: [
              { label: 'A bug', emoji: '🐞' },
              { label: 'A loop', emoji: '🔁' },
              { label: 'A badge', emoji: '🏅' },
            ],
            answer: 0,
            explain: 'A mistake in code is a bug. Time to debug it!',
          },
          {
            prompt: 'What is an algorithm?',
            emoji: '🤔',
            options: [
              { label: 'A kind of animal', emoji: '🦎' },
              { label: 'Steps in the right order', emoji: '🪜' },
              { label: 'A computer screen', emoji: '🖥️' },
            ],
            answer: 1,
            explain: 'An algorithm is a list of steps, like a recipe.',
          },
        ],
      },
      {
        kind: 'match',
        title: 'Coder Words',
        prompt: 'Match each coder word to what it means. Tap a word, then its meaning!',
        pairs: [
          { left: 'Code', emoji: '📜', right: 'Instructions for a computer' },
          { left: 'Loop', emoji: '🔁', right: 'Do it again and again' },
          { left: 'Bug', emoji: '🐞', right: 'A mistake in the code' },
          { left: 'Algorithm', emoji: '🪜', right: 'Steps in the right order' },
        ],
      },
    ],
  },
  {
    id: 'files-and-folders',
    number: 7,
    name: 'Files & Folders',
    tagline: 'Save, sort and find your work',
    emoji: '🗂️',
    image: 'world-files',
    theme: {
      solid: 'bg-teal-500',
      soft: 'bg-teal-100',
      text: 'text-teal-700',
      border: 'border-teal-300',
      button: 'bg-teal-500 hover:bg-teal-400 shadow-[0_6px_0_#0f766e]',
      gradient: 'from-teal-300 to-emerald-200',
    },
    badge: { name: 'Super Organizer', emoji: '🗃️' },
    lessons: [
      {
        title: 'What is a file?',
        emoji: '📄',
        text: 'A FILE is one thing saved on a computer, like a drawing, a story, a photo or a song. Each file has a name so you can find it again.',
      },
      {
        title: 'Folders keep things tidy',
        emoji: '📁',
        text: 'A FOLDER is like a box that holds files. You can put all your photos in one folder and all your stories in another.',
        fact: 'Folders can go inside other folders, like boxes inside boxes!',
      },
      {
        title: 'Save your work!',
        emoji: '💾',
        text: 'When you SAVE, the computer remembers your work, even after you turn it off. Save often so you never lose anything.',
        fact: 'The save button often looks like a floppy disk, a kind of storage people used long ago.',
      },
      {
        title: 'The recycle bin',
        emoji: '🗑️',
        text: 'When you DELETE a file, it usually goes to the recycle bin first. If it was a mistake, you can often bring it back!',
      },
    ],
    activities: [
      {
        kind: 'sort',
        title: 'Which Folder?',
        prompt: 'Put each file in the right folder!',
        bins: [
          { label: 'Pictures', emoji: '🖼️' },
          { label: 'Music', emoji: '🎵' },
        ],
        items: [
          { label: 'Photo of my dog', emoji: '🐶', bin: 0, explain: 'A photo is a picture file.' },
          { label: 'Birthday song', emoji: '🎂', bin: 1, explain: 'Songs go in the Music folder.' },
          { label: 'Drawing of a rocket', emoji: '🚀', bin: 0, explain: 'Drawings are pictures too!' },
          { label: 'Drum beat', emoji: '🥁', bin: 1, explain: 'A drum beat is a sound file.' },
          { label: 'Beach selfie', emoji: '🏖️', bin: 0, explain: 'Selfies are photos, so they are pictures.' },
          { label: 'Lullaby', emoji: '🌙', bin: 1, explain: 'A lullaby is a song. Music folder!' },
        ],
      },
      {
        kind: 'quiz',
        title: 'File Smarts',
        questions: [
          {
            prompt: 'You finished a great story on the computer. What should you do?',
            emoji: '📝',
            options: [
              { label: 'Save it', emoji: '💾' },
              { label: 'Turn off the computer', emoji: '🔌' },
              { label: 'Close it without saving', emoji: '❌' },
            ],
            answer: 0,
            explain: 'Saving keeps your story safe so you can open it later.',
          },
          {
            prompt: 'Which file name helps you find it later?',
            emoji: '🔎',
            options: [
              { label: 'aaaa', emoji: '😵' },
              { label: 'My cat drawing', emoji: '🐱' },
              { label: 'file1', emoji: '🤷' },
            ],
            answer: 1,
            explain: 'A good name tells you what is inside the file.',
          },
          {
            prompt: 'Oops! You deleted a photo by mistake. Where can you look?',
            emoji: '😮',
            options: [
              { label: 'The recycle bin', emoji: '🗑️' },
              { label: 'Under the bed', emoji: '🛏️' },
              { label: 'The keyboard', emoji: '⌨️' },
            ],
            answer: 0,
            explain: 'Deleted files often wait in the recycle bin, so you can bring them back.',
          },
        ],
      },
    ],
  },
  {
    id: 'keyboard-and-mouse',
    number: 8,
    name: 'Keyboard & Mouse',
    tagline: 'Click, drag and type like a pro',
    emoji: '🖱️',
    image: 'world-keys',
    theme: {
      solid: 'bg-fuchsia-500',
      soft: 'bg-fuchsia-100',
      text: 'text-fuchsia-700',
      border: 'border-fuchsia-300',
      button: 'bg-fuchsia-500 hover:bg-fuchsia-400 shadow-[0_6px_0_#a21caf]',
      gradient: 'from-fuchsia-300 to-pink-200',
    },
    badge: { name: 'Speedy Fingers', emoji: '⚡' },
    lessons: [
      {
        title: 'Click and double-click',
        emoji: '🖱️',
        text: 'Press the mouse button once to CLICK and choose something. Press it twice quickly to DOUBLE-CLICK and open it.',
      },
      {
        title: 'Drag and drop',
        emoji: '✋',
        text: 'To DRAG, hold the mouse button down and move. Let go to DROP. It is like picking something up and putting it somewhere new!',
      },
      {
        title: 'Special keys',
        emoji: '⌨️',
        text: 'The SPACE bar makes a gap between words. ENTER starts a new line. BACKSPACE rubs out a mistake. SHIFT makes a capital letter.',
        fact: 'The space bar is the biggest key, because we use it the most!',
      },
      {
        title: 'Sit like a pro',
        emoji: '🪑',
        text: 'Sit up tall, keep your feet flat, and keep the screen about an arm away. Rest your fingers gently on the keys.',
      },
    ],
    activities: [
      {
        kind: 'match',
        title: 'Key Jobs',
        prompt: 'What does each key do? Tap a key, then its job!',
        pairs: [
          { left: 'Space bar', emoji: '⬜', right: 'Makes a gap between words' },
          { left: 'Enter', emoji: '↩️', right: 'Starts a new line' },
          { left: 'Backspace', emoji: '⬅️', right: 'Rubs out a mistake' },
          { left: 'Shift', emoji: '⬆️', right: 'Makes a capital letter' },
        ],
      },
      {
        kind: 'quiz',
        title: 'Mouse Moves',
        questions: [
          {
            prompt: 'How do you open a file on a computer?',
            emoji: '📂',
            options: [
              { label: 'Double-click it', emoji: '👆👆' },
              { label: 'Shout at it', emoji: '📣' },
              { label: 'Shake the mouse', emoji: '🫨' },
            ],
            answer: 0,
            explain: 'A quick double-click opens files and apps.',
          },
          {
            prompt: 'You want to move a picture into a folder. What do you do?',
            emoji: '🖼️',
            options: [
              { label: 'Drag and drop it', emoji: '✋' },
              { label: 'Press Shift', emoji: '⬆️' },
              { label: 'Turn the screen off', emoji: '🌑' },
            ],
            answer: 0,
            explain: 'Hold, move and let go. That is drag and drop!',
          },
          {
            prompt: 'You typed "cta" instead of "cat". Which key fixes it?',
            emoji: '🐱',
            options: [
              { label: 'Enter', emoji: '↩️' },
              { label: 'Backspace', emoji: '⬅️' },
              { label: 'Space bar', emoji: '⬜' },
            ],
            answer: 1,
            explain: 'Backspace rubs out letters so you can type them again.',
          },
        ],
      },
      {
        kind: 'sequence',
        title: 'Type Your Name',
        prompt: 'How do you type your name with a capital letter? Tap the steps in order!',
        steps: [
          { label: 'Click in the box', emoji: '🖱️' },
          { label: 'Hold Shift', emoji: '⬆️' },
          { label: 'Press your first letter', emoji: '🔤' },
          { label: 'Type the other letters', emoji: '⌨️' },
          { label: 'Press Enter', emoji: '↩️' },
        ],
      },
    ],
  },
  {
    id: 'digital-citizen',
    number: 9,
    name: 'Digital Citizen',
    tagline: 'Be kind, fair and balanced with tech',
    emoji: '🤝',
    image: 'world-citizen',
    theme: {
      solid: 'bg-pink-500',
      soft: 'bg-pink-100',
      text: 'text-pink-700',
      border: 'border-pink-300',
      button: 'bg-pink-500 hover:bg-pink-400 shadow-[0_6px_0_#be185d]',
      gradient: 'from-pink-300 to-violet-200',
    },
    badge: { name: 'Kindness Champion', emoji: '💖' },
    lessons: [
      {
        title: 'Real people, real feelings',
        emoji: '💬',
        text: 'Behind every screen is a real person with real feelings. Before you send a message, ask: is it kind? Is it true? Would I say it face to face?',
      },
      {
        title: 'Ask before you share',
        emoji: '📸',
        text: 'Always ask before you share a photo of someone else. Everyone gets to choose what is shared about them.',
      },
      {
        title: 'Is it real?',
        emoji: '🧐',
        text: 'Not everything online is true. Some pictures are changed and some stories are made up. Check with a grown-up or a trusted website.',
        fact: 'Computers can now make pictures of things that never really happened!',
      },
      {
        title: 'Balance your screen time',
        emoji: '⚖️',
        text: 'Screens are fun, but so is playing, reading, and being with family. A healthy day has a mix of screen time and green time!',
      },
    ],
    activities: [
      {
        kind: 'sort',
        title: 'Kind or Unkind?',
        prompt: 'Is this kind or unkind online?',
        bins: [
          { label: 'Kind', emoji: '😊' },
          { label: 'Unkind', emoji: '😞' },
        ],
        items: [
          { label: 'Saying "great job!" on a friend\'s drawing', emoji: '🎨', bin: 0, explain: 'Kind words make people feel great!' },
          { label: 'Leaving a friend out of a game on purpose', emoji: '🚪', bin: 1, explain: 'Leaving people out hurts. Invite them in!' },
          { label: 'Asking before sharing a photo of someone', emoji: '🙋', bin: 0, explain: 'Asking first shows respect.' },
          { label: 'Laughing at someone\'s mistake in a chat', emoji: '😝', bin: 1, explain: 'Everyone makes mistakes. Be gentle instead.' },
          { label: 'Telling a grown-up when someone is bullied', emoji: '🛡️', bin: 0, explain: 'That is being an upstander. Brave and kind!' },
          { label: 'Spreading a rumor', emoji: '🗣️', bin: 1, explain: 'Rumors can hurt and are often not true.' },
        ],
      },
      {
        kind: 'quiz',
        title: 'Smart Choices',
        questions: [
          {
            prompt: 'A video says eating rocks makes you super strong. What do you do?',
            emoji: '🪨',
            options: [
              { label: 'Try it right away', emoji: '😬' },
              { label: 'Ask a grown-up if it is true', emoji: '🙋' },
              { label: 'Share it with everyone', emoji: '📣' },
            ],
            answer: 1,
            explain: 'Not everything online is true. Checking first keeps you safe.',
          },
          {
            prompt: 'You have played games for a long time. What is a good idea?',
            emoji: '🎮',
            options: [
              { label: 'Play all night', emoji: '🌙' },
              { label: 'Take a break and move your body', emoji: '🤸' },
            ],
            answer: 1,
            explain: 'Breaks help your eyes, body and brain stay happy.',
          },
          {
            prompt: 'You want to post a funny photo of your friend. What first?',
            emoji: '📷',
            options: [
              { label: 'Ask your friend if it is okay', emoji: '🤝' },
              { label: 'Post it secretly', emoji: '🤫' },
              { label: 'Add silly words to it', emoji: '✏️' },
            ],
            answer: 0,
            explain: 'Your friend gets to choose. Always ask first!',
          },
        ],
      },
    ],
  },
  {
    id: 'future-tech',
    number: 10,
    name: 'Future Tech',
    tagline: 'Robots, AI and smart homes',
    emoji: '🚀',
    image: 'world-future',
    theme: {
      solid: 'bg-cyan-500',
      soft: 'bg-cyan-100',
      text: 'text-cyan-700',
      border: 'border-cyan-300',
      button: 'bg-cyan-500 hover:bg-cyan-400 shadow-[0_6px_0_#0e7490]',
      gradient: 'from-cyan-300 to-indigo-200',
    },
    badge: { name: 'Future Inventor', emoji: '🔮' },
    lessons: [
      {
        title: 'Robots help people',
        emoji: '🦾',
        text: 'A ROBOT is a machine with a computer brain that can move and do jobs. Robots build cars, clean floors, and even explore other planets!',
        fact: 'There are robots driving around on Mars right now!',
      },
      {
        title: 'What is AI?',
        emoji: '🧠',
        text: 'AI means ARTIFICIAL INTELLIGENCE. It is when computers learn from lots of examples, so they can recognize faces, understand voices, or answer questions.',
      },
      {
        title: 'AI can make mistakes',
        emoji: '🤖',
        text: 'AI is clever, but it is not always right. It does not have feelings and it is not a person. Always check important answers with a grown-up.',
      },
      {
        title: 'Smart homes',
        emoji: '🏠',
        text: 'Some homes have smart speakers, lights and doorbells that connect to the internet. You can ask them to play music or turn on the lights!',
      },
    ],
    activities: [
      {
        kind: 'sort',
        title: 'Robot or Not?',
        prompt: 'Is this a robot or not a robot?',
        bins: [
          { label: 'Robot', emoji: '🤖' },
          { label: 'Not a robot', emoji: '🚫' },
        ],
        items: [
          { label: 'Robot vacuum cleaner', emoji: '🧹', bin: 0, explain: 'It moves around by itself and cleans. That is a robot!' },
          { label: 'Teddy bear', emoji: '🧸', bin: 1, explain: 'A teddy bear has no computer brain.' },
          { label: 'Mars rover', emoji: '🪐', bin: 0, explain: 'Rovers are robots that explore other planets.' },
          { label: 'Wooden spoon', emoji: '🥄', bin: 1, explain: 'A spoon cannot move or think on its own.' },
          { label: 'Delivery drone', emoji: '🚁', bin: 0, explain: 'Drones with computers that fly by themselves are robots.' },
          { label: 'Bicycle', emoji: '🚲', bin: 1, explain: 'A bike needs you to pedal. No computer brain!' },
        ],
      },
      {
        kind: 'quiz',
        title: 'AI Explorer',
        questions: [
          {
            prompt: 'How does AI learn?',
            emoji: '📚',
            options: [
              { label: 'From lots and lots of examples', emoji: '🖼️' },
              { label: 'By eating snacks', emoji: '🍪' },
              { label: 'By sleeping', emoji: '😴' },
            ],
            answer: 0,
            explain: 'AI looks at many examples to find patterns.',
          },
          {
            prompt: 'An AI helper gives you an answer for your homework. What should you do?',
            emoji: '📝',
            options: [
              { label: 'Believe it no matter what', emoji: '🙈' },
              { label: 'Check it with a grown-up or a book', emoji: '🔎' },
            ],
            answer: 1,
            explain: 'AI can make mistakes, so it is smart to double-check.',
          },
          {
            prompt: 'Which of these is a smart home helper?',
            emoji: '🏠',
            options: [
              { label: 'A smart speaker', emoji: '🔊' },
              { label: 'A pillow', emoji: '🛏️' },
              { label: 'A flower pot', emoji: '🪴' },
            ],
            answer: 0,
            explain: 'A smart speaker listens for your voice and connects to the internet.',
          },
        ],
      },
      {
        kind: 'match',
        title: 'Tech Helpers',
        prompt: 'Match each helper to its job. Tap a helper, then its job!',
        pairs: [
          { left: 'Robot vacuum', emoji: '🧹', right: 'Cleans the floor' },
          { left: 'Smart speaker', emoji: '🔊', right: 'Plays music when you ask' },
          { left: 'Mars rover', emoji: '🪐', right: 'Explores another planet' },
          { left: 'Video doorbell', emoji: '🔔', right: 'Shows who is at the door' },
        ],
      },
    ],
  },
]

export function getWorld(id: string) {
  return worlds.find((w) => w.id === id)
}
