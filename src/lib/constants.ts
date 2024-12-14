export const HEADER_LINKS = [
  { name: 'Submit', href: '/submit', icon: '✨' },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: '📚' },
  { id: 'ai', name: 'AI Tutors', icon: '🤖' },
  { id: 'flashcards', name: 'Flashcards', icon: '🗂️' },
  { id: 'notes', name: 'Note Taking', icon: '✍️' },
];

export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: "Google's Notebooklm",
    tagline: 'NotebookLM is your powerful virtual research assistant rooted in information you can trust.',
    description: 'NotebookLM now lets you listen to a conversation about your sources!',
    fullDescription:'NotebookLM revolutionizes how you engage with information, turning your uploads—PDFs, websites, videos, audio files, and more—into personalized insights powered by Gemini 1.5s multimodal understanding. With instant analysis and smart connections between topics, it serves as your AI expert, providing clear citations for every response so you can trust its answers. Whether youre exploring complex ideas or seeking quick summaries, NotebookLM keeps the source at your fingertips for confidence in every interaction. Plus, its new Audio Overview feature transforms your materials into immersive Deep Dive discussions, perfect for learning on the go.',
    saves: 100,
    votes: 234,
    rating: 5,
    topics: ['Flashcard', 'Note-taking'],
    pricing: {
      type: 'freemium',
    },
    websiteUrl: 'https://notebooklm.google/',
    stats: {
      users: 10000,
      reviews: 42,
    },
    images: [
      '/assets/images/notebook/image1.jpg',
    ],
    logo: '/assets/images/notebook/logo.jpg',
    emoji: '📚', // Add a default emoji
    savedBy: ['user1', 'user2'],
  },
  {
    id: '2',
    name: 'Remnote',
    tagline: 'Highlight text on any web page or PDF and take notes.',
    description: 'RemNote is a study tool that integrates note-taking and flashcards for optimal retention.',
    fullDescription:'RemNote is a comprehensive study tool that integrates note-taking and flashcards for optimal retention. It helps you quickly create flashcards within your notes and schedules reviews for you. With mind map style notes and PDF annotations, understanding complex topics is easier. Join 730,000+ students who have reduced study time and exam stress. RemNote offers offline access, image occlusion, and customizable tables. Transform your study routine today.',
    votes: 234,
    rating: 5,
    topics: ['Flashcard', 'Note-taking'],
    pricing: {
      type: 'freemium',
    },
    websiteUrl: 'https://www.remnote.com/',
    stats: {
      users: 10000,
      reviews: 42,
    },
    images: [
      '/assets/images/remnote/image1.jpg',
      '/assets/images/remnote/image2.jpg',
    ],
    logo: '/assets/images/remnote/logo.jpg',
    emoji: '📚', // Add a default emoji
  },
  {
    id: '3',
    name: 'RemNote',
    tagline: 'Make flashcards in your notes. Cut study time in half.',
    description: 'RemNote is a study tool that integrates note-taking and flashcards for optimal retention.',
    votes: 234,
    rating: 5,
    topics: ['Flashcard', 'Note-taking'],
    pricing: {
      type: 'freemium',
    },
    websiteUrl: 'https://www.remnote.com/',
    stats: {
      users: 10000,
      reviews: 42,
    },
    images: [
      '/assets/images/remnote/image1.jpg',
      '/assets/images/remnote/image2.jpg',
    ],
    logo: '/assets/images/remnote/logo.jpg',
    emoji: '📚', // Add a default emoji
  },
  {
    id: '4',
    name: 'RemNote',
    tagline: 'Make flashcards in your notes. Cut study time in half.',
    description: 'RemNote is a study tool that integrates note-taking and flashcards for optimal retention.',
    votes: 234,
    rating: 5,
    topics: ['Flashcard', 'Note-taking'],
    pricing: {
      type: 'freemium',
    },
    websiteUrl: 'https://www.remnote.com/',
    stats: {
      users: 10000,
      reviews: 42,
    },
    images: [
      '/assets/images/remnote/image1.jpg',
      '/assets/images/remnote/image2.jpg',
    ],
    logo: '/assets/images/remnote/logo.jpg',
    emoji: '📚', // Add a default emoji
  },
  {
    id: '5',
    name: 'RemNote',
    tagline: 'Make flashcards in your notes. Cut study time in half.',
    description: 'RemNote is a study tool that integrates note-taking and flashcards for optimal retention.',
    votes: 234,
    rating: 5,
    topics: ['Flashcard', 'Note-taking'],
    pricing: {
      type: 'freemium',
    },
    websiteUrl: 'https://www.remnote.com/',
    stats: {
      users: 10000,
      reviews: 42,
    },
    images: [
      '/assets/images/remnote/image1.jpg',
      '/assets/images/remnote/image2.jpg',
    ],
    logo: '/assets/images/remnote/logo.jpg',
    emoji: '📚', // Add a default emoji
  },
  {
    id: '6',
    name: 'RemNote',
    tagline: 'Make flashcards in your notes. Cut study time in half.',
    description: 'RemNote is a study tool that integrates note-taking and flashcards for optimal retention.',
    votes: 234,
    rating: 5,
    topics: ['Flashcard', 'Note-taking'],
    pricing: {
      type: 'freemium',
    },
    websiteUrl: 'https://www.remnote.com/',
    stats: {
      users: 10000,
      reviews: 42,
    },
    images: [
      '/assets/images/remnote/image1.jpg',
      '/assets/images/remnote/image2.jpg',
    ],
    logo: '/assets/images/remnote/logo.jpg',
    emoji: '📚', // Add a default emoji
  },
];

export const SAMPLE_ARTICLES = [
  {
    id: '1',
    title: 'The Computer Science Job Market',
    excerpt: 'Are Comp-sci Grads Cooked?...',
    content: 'Full content of the article goes here...',
    category: 'Education',
    author: 'Abdirahman',
    date: '2024-12-14',
    tags: ['AI', 'Education', 'Future'],
    notionPageId: '15b10001be6480ea8118cc32bbfb2cf1', // Add notionPageId field
  },
  {
    id: '2',
    title: 'Advancements in AI Technology',
    excerpt: 'Discover the latest advancements in AI technology...',
    content: 'Full content of the article goes here...',
    category: 'technology',
    author: 'Jane Smith',
    date: '2023-09-15',
    tags: ['AI', 'Technology', 'Innovation'],
    notionPageId: '15b10001be6480ea8118cc32bbfb2cf1', // Add notionPageId field
  },
  // Add more articles as needed
];