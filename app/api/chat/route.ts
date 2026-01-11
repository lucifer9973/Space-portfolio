// app/api/chat/route.ts
import { NextResponse } from "next/server";

// Conversation State - Single in-memory context object
interface ConversationContext {
  lastIntent: null | "time" | "weather" | "portfolio" | "projects" | "skills" | "experience" | "education" | "smalltalk";
  lastTopic: null | string;
  lastEntity: null | string;
  lastResult: null | any;
}

// Initialize context (persists across requests)
const context: ConversationContext = {
  lastIntent: null,
  lastTopic: null,
  lastEntity: null,
  lastResult: null
};

// City coordinates for weather (hardcoded for common cities) - using Open-Meteo free API
const cityCoordinates: { [key: string]: { lat: number, lon: number } } = {
  "bhubaneswar": { lat: 20.2961, lon: 85.8245 },
  "ranchi": { lat: 23.3441, lon: 85.3096 },
  "delhi": { lat: 28.6139, lon: 77.2090 },
  "mumbai": { lat: 19.0760, lon: 72.8777 },
  "kolkata": { lat: 22.5726, lon: 88.3639 },
  "chennai": { lat: 13.0827, lon: 80.2707 },
  "pune": { lat: 18.5204, lon: 73.8567 },
  "hyderabad": { lat: 17.3850, lon: 78.4867 },
  "bangalore": { lat: 12.9716, lon: 77.5946 },
  "ahmedabad": { lat: 23.0225, lon: 72.5714 }
};

// Weather code to condition mapping (WMO codes)
function getWeatherCondition(weathercode: number): { condition: string, description: string } {
  const conditions: { [key: number]: { condition: string, description: string } } = {
    0: { condition: "Clear", description: "Clear sky" },
    1: { condition: "Mainly clear", description: "Mainly clear" },
    2: { condition: "Partly cloudy", description: "Partly cloudy" },
    3: { condition: "Overcast", description: "Overcast" },
    45: { condition: "Fog", description: "Fog" },
    48: { condition: "Depositing rime fog", description: "Depositing rime fog" },
    51: { condition: "Drizzle", description: "Light drizzle" },
    53: { condition: "Drizzle", description: "Moderate drizzle" },
    55: { condition: "Drizzle", description: "Dense drizzle" },
    56: { condition: "Freezing Drizzle", description: "Light freezing drizzle" },
    57: { condition: "Freezing Drizzle", description: "Dense freezing drizzle" },
    61: { condition: "Rain", description: "Slight rain" },
    63: { condition: "Rain", description: "Moderate rain" },
    65: { condition: "Rain", description: "Heavy rain" },
    66: { condition: "Freezing Rain", description: "Light freezing rain" },
    67: { condition: "Freezing Rain", description: "Heavy freezing rain" },
    71: { condition: "Snow", description: "Slight snow fall" },
    73: { condition: "Snow", description: "Moderate snow fall" },
    75: { condition: "Snow", description: "Heavy snow fall" },
    77: { condition: "Snow", description: "Snow grains" },
    80: { condition: "Rain showers", description: "Slight rain showers" },
    81: { condition: "Rain showers", description: "Moderate rain showers" },
    82: { condition: "Rain showers", description: "Violent rain showers" },
    85: { condition: "Snow showers", description: "Slight snow showers" },
    86: { condition: "Snow showers", description: "Heavy snow showers" },
    95: { condition: "Thunderstorm", description: "Thunderstorm" },
    96: { condition: "Thunderstorm", description: "Thunderstorm with slight hail" },
    99: { condition: "Thunderstorm", description: "Thunderstorm with heavy hail" }
  };
  return conditions[weathercode] || { condition: "Unknown", description: "Unknown weather" };
}

// Structured Knowledge Base - Facts only, no pre-written sentences
const knowledgeBase = {
  identity: {
    name: "Shobhit Raj",
    nickname: "Lucifer",
    location: {
      city: "Bhubaneswar",
      state: "Odisha",
      country: "India"
    },
    contact: {
      email: "rajshobhit48@gmail.com",
      phone: "+91-9973975403"
    },
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      university: "KIIT University",
      graduation_year: "2026",
      cgpa: "7.52 / 10.0"
    }
  },
  education: {
    university: {
      name: "KIIT University",
      duration: "2022–2026",
      degree: "B.Tech in Computer Science & Engineering",
      coursework: ["DSA", "Machine Learning", "AI", "Probability & Statistics", "Cloud Computing"]
    },
    twelfth: {
      school: "Sri Chaitanya Vidyaniketan",
      board: "CBSE",
      percentage: "73%"
    },
    tenth: {
      school: "DAV Public School",
      board: "CBSE"
    }
  },
  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "C++", "Java", "SQL"],
    frontend: ["HTML", "CSS", "Tailwind", "React", "Next.js", "Framer Motion"],
    backend: ["Node.js", "Express", "REST APIs", "MongoDB", "Flask"],
    ml: ["Scikit-learn", "TensorFlow", "PyTorch"],
    devopsCloud: ["AWS (EC2, S3)", "Docker", "Linux"],
    tools: ["Git", "GitHub", "Postman"]
  },
  experience: {
    keploy: {
      title: "Keploy API Fellow",
      achievements: ["Built and tested REST APIs", "Automated API testing", "Real-world backend workflows"]
    },
    amazon: {
      title: "Amazon ML Summer School",
      achievements: ["Selected in top 2% of 50k+ applicants", "Studied ML, CNNs, optimization", "Built PyTorch models"]
    }
  },
  projects: [
    {
      name: "Task Management API",
      type: "REST backend",
      technologies: ["Node.js", "Express", "MongoDB"]
    },
    {
      name: "Water Quality Prediction System",
      type: "ML + Web UI",
      technologies: ["Python", "Scikit-learn", "React"]
    },
    {
      name: "Heart Disease Prediction Model",
      type: "Machine Learning",
      technologies: ["Python", "TensorFlow", "Pandas"]
    },
    {
      name: "Tic-Tac-Toe Android App",
      type: "Mobile App with AI",
      technologies: ["Java", "Android SDK", "Minimax Algorithm"]
    },
    {
      name: "CryptoWeather Nexus",
      type: "Crypto + Weather dashboard",
      technologies: ["React", "Next.js", "API Integration"]
    },
    {
      name: "YouTube Video Downloader",
      type: "Python utility",
      technologies: ["Python", "YouTube API"]
    },
    {
      name: "WordPress REST API Plugin",
      type: "WordPress plugin",
      technologies: ["PHP", "WordPress API", "REST"]
    }
  ],
  certifications: [
    {
      name: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services"
    },
    {
      name: "Oracle Cloud AI Foundations Associate",
      issuer: "Oracle"
    },
    {
      name: "IBM Data Analysis with Python",
      issuer: "IBM"
    },
    {
      name: "IBM Generative AI Basics",
      issuer: "IBM"
    },
    {
      name: "Vanderbilt Prompt Engineering for ChatGPT",
      issuer: "Vanderbilt University"
    },
    {
      name: "Cisco Python, JavaScript, Cybersecurity",
      issuer: "Cisco"
    },
    {
      name: "HackerRank SQL & Problem Solving",
      issuer: "HackerRank"
    }
  ],
  social: {
    github: {
      url: "https://github.com/lucifer9973",
      username: "lucifer9973"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/shobhit-raj9973",
      profile: "shobhit-raj9973"
    },
    instagram: {
      url: "https://www.instagram.com/shobhitraj729/",
      username: "shobhitraj729"
    },
    twitter: {
      url: "https://x.com/Shobhitraj729",
      username: "Shobhitraj729"
    }
  }
};

// Response Templates for dynamic generation
const responseTemplates = {
  identity: {
    introduction: [
      "Hi! I'm Shobhit AI, representing {identity.name} ({identity.nickname}).",
      "Hello! I'm here to tell you about {identity.name}, also known as {identity.nickname}.",
      "Greetings! I'm Shobhit AI, Shobhit's digital assistant."
    ],
    full_intro: [
      "{introduction} {identity.name} is a {identity.education.degree} student at {education.university.name} in {identity.location.city}, {identity.location.state}, graduating in {identity.education.graduation_year} with a CGPA of {identity.education.cgpa}.",
      "{introduction} Currently pursuing {identity.education.degree} at {education.university.name} in {identity.location.city}, {identity.location.state}, {identity.name} is set to graduate in {identity.education.graduation_year} with a CGPA of {identity.education.cgpa}."
    ],
    contact: [
      "You can reach {identity.name} at {identity.contact.email} or call {identity.contact.phone}.",
      "Contact details: Email - {identity.contact.email}, Phone - {identity.contact.phone}.",
      "Get in touch via email at {identity.contact.email} or phone at {identity.contact.phone}."
    ],
    location: [
      "{identity.name} is based in {identity.location.city}, {identity.location.state}, {identity.location.country}.",
      "{identity.name} lives in {identity.location.city}, {identity.location.state}.",
      "Currently located in {identity.location.city}, {identity.location.state}, {identity.location.country}."
    ]
  },
  education: {
    overview: [
      "{identity.name} is pursuing {education.university.degree} at {education.university.name} from {education.university.duration}.",
      "Currently studying {education.university.degree} at {education.university.name} ({education.university.duration}).",
      "{education.university.name} is where {identity.name} studies {education.university.degree}, expected graduation {identity.education.graduation_year}."
    ],
    university: [
      "{identity.name} is pursuing {education.university.degree} at {education.university.name} from {education.university.duration}.",
      "Currently studying {education.university.degree} at {education.university.name} ({education.university.duration}).",
      "{education.university.name} is where {identity.name} studies {education.university.degree}, expected graduation {identity.education.graduation_year}."
    ],
    coursework: [
      "The coursework includes {university.coursework}.",
      "Key subjects: {university.coursework}.",
      "Focus areas: {university.coursework}."
    ],
    school: [
      "Completed Class 12 at {education.twelfth.school} ({education.twelfth.board}) with {education.twelfth.percentage}.",
      "Class 10 at {education.tenth.school} ({education.tenth.board})."
    ]
  },
  skills: {
    overview: [
      "{identity.name} has diverse technical skills across multiple domains.",
      "Skilled in various technologies and programming languages.",
      "Proficient in modern development technologies."
    ],
    languages: [
      "Programming languages: {skills.languages}.",
      "Codes in: {skills.languages}.",
      "Language expertise: {skills.languages}."
    ],
    frontend: [
      "Frontend technologies: {skills.frontend}.",
      "Web development: {skills.frontend}.",
      "UI/UX stack: {skills.frontend}."
    ],
    backend: [
      "Backend development: {skills.backend}.",
      "Server-side technologies: {skills.backend}.",
      "API development: {skills.backend}."
    ],
    ml: [
      "Machine Learning: {skills.ml}.",
      "AI/ML frameworks: {skills.ml}.",
      "Data science tools: {skills.ml}."
    ],
    devops: [
      "DevOps & Cloud: {skills.devopsCloud}.",
      "Infrastructure: {skills.devopsCloud}.",
      "Cloud technologies: {skills.devopsCloud}."
    ],
    tools: [
      "Development tools: {skills.tools}.",
      "Version control and collaboration: {skills.tools}."
    ]
  },
  experience: {
    overview: [
      "{identity.name} has gained valuable experience through fellowships and competitive programs.",
      "Professional experience includes specialized training programs.",
      "Has participated in prestigious tech programs and fellowships."
    ],
    keploy: [
      "As a {experience.keploy.title}, {identity.name} {experience.keploy.achievements}.",
      "{experience.keploy.title} role involved {experience.keploy.achievements}."
    ],
    amazon: [
      "Selected for {experience.amazon.title} in the top 2% of 50k+ applicants, where {identity.name} {experience.amazon.achievements}.",
      "{experience.amazon.title} provided intensive training in {experience.amazon.achievements}."
    ]
  },
  projects: {
    overview: [
      "{identity.name} has built {projects.length} impressive projects.",
      "Portfolio includes diverse projects across web development, ML, and mobile apps.",
      "Has developed applications ranging from APIs to AI-powered systems."
    ],
    specific: [
      "{project.name} - {project.type} using {project.technologies}.",
      "Built {project.name}, a {project.type} project with {project.technologies}.",
      "{project.name}: {project.type} implemented using {project.technologies}."
    ],
    call_to_action: [
      "Check out the full portfolio on GitHub!",
      "More details available on {social.github.url}.",
      "View complete project repository at {social.github.url}."
    ]
  },
  certifications: {
    overview: [
      "{identity.name} holds {certifications.length} professional certifications.",
      "Certified in various technologies and platforms.",
      "Professional credentials from leading tech companies and institutions."
    ],
    list: [
      "Certifications include: {certifications}.",
      "Professional certifications: {certifications}.",
      "Qualified through: {certifications}."
    ]
  },
  social: {
    overview: [
      "Connect with {identity.name} on various platforms!",
      "Find {identity.name} online across social and professional networks.",
      "Follow {identity.name} for updates and collaborations."
    ],
    github: [
      "GitHub: {social.github.url}",
      "Code repository: {social.github.url}"
    ],
    linkedin: [
      "LinkedIn: {social.linkedin.url}",
      "Professional profile: {social.linkedin.url}"
    ],
    instagram: [
      "Instagram: {social.instagram.url}",
      "Personal updates: {social.instagram.url}"
    ],
    twitter: [
      "Twitter: {social.twitter.url}",
      "Tech discussions: {social.twitter.url}"
    ]
  },
  weather: {
    success: [
      "Using Shobhit's Weather Dashboard system, the current weather in {city} is: Temperature: {temp}°C, Condition: {condition} ({description}), Humidity: {humidity}%.",
      "Weather update for {city}: {temp}°C, {condition} with {description}, humidity at {humidity}%.",
      "Current conditions in {city}: {temp}°C temperature, {condition} ({description}), {humidity}% humidity."
    ],
    fallback: [
      "Using Shobhit's Weather Dashboard system, the current weather in {city} is: {fallbackData}. (Note: Real-time data temporarily unavailable)",
      "Weather data for {city}: {fallbackData}. (Real-time information currently unavailable)"
    ]
  },
  time: [
    "The current local time is {time}. Shobhit's dashboard can also display real-time clocks for various time zones.",
    "Right now it's {time}. The system supports multiple timezone displays.",
    "Current time: {time}. Timezone conversions available on request."
  ],
  greeting: [
    "Hello! I'm Shobhit AI, {identity.name}'s personal assistant. I'm here to help you learn about {identity.name}'s background, skills, projects, and more. What would you like to know?",
    "Hi there! I'm Shobhit AI, ready to share information about {identity.name}. What interests you most?",
    "Greetings! I'm here to tell you about {identity.name}'s journey in tech. What would you like to explore?"
  ],
  well_being: [
    "I'm doing great, thank you for asking! As Shobhit AI, I'm always ready to share information about {identity.name}'s impressive work and achievements. How can I assist you today?",
    "Excellent! I'm functioning optimally and excited to tell you about {identity.name}'s accomplishments. What would you like to know?",
    "I'm wonderful, thanks! Ready to dive into {identity.name}'s background, skills, and projects. What's your question?"
  ],
  thanks: [
    "You're very welcome! I'm glad I could help. Feel free to ask me anything else about {identity.name}'s background, skills, projects, or experience.",
    "My pleasure! Happy to assist. Don't hesitate to ask about {identity.name}'s journey in technology.",
    "Glad to help! I'm here whenever you have questions about {identity.name}'s work and achievements."
  ],
  fallback: [
    "I'm Shobhit AI, {identity.name}'s personal assistant. I can share details about background, skills, projects, education, experience, or even check the weather or time. What would you like to know?",
    "I'm here to help you learn about {identity.name}. Ask me about education, skills, projects, experience, or current weather/time information.",
    "As {identity.name}'s AI assistant, I can provide information on various topics. What specific aspect interests you?"
  ]
};

// Normalize user input: lowercase, remove punctuation, trim
function normalizeInput(input: string): string {
  return input.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

// Fuzzy match for keywords
function fuzzyMatch(word: string, keywords: string[]): number {
  for (const keyword of keywords) {
    if (word.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(word)) {
      return 1;
    }
  }
  return 0;
}

// Detect sub-intent based on category
function detectSubIntent(message: string, category: string): string {
  const normalized = normalizeInput(message);

  switch (category) {
    case "identity":
      if (normalized.includes("full") || normalized.includes("complete") || normalized.includes("introduce")) {
        return "full_intro";
      }
      if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("phone")) {
        return "contact";
      }
      if (normalized.includes("location") || normalized.includes("where")) {
        return "location";
      }
      return "introduction";
    case "skills":
      if (normalized.includes("language") || normalized.includes("programming")) {
        return "languages";
      }
      if (normalized.includes("frontend") || normalized.includes("web") || normalized.includes("ui")) {
        return "frontend";
      }
      if (normalized.includes("backend") || normalized.includes("server") || normalized.includes("api")) {
        return "backend";
      }
      if (normalized.includes("ml") || normalized.includes("machine learning") || normalized.includes("ai")) {
        return "ml";
      }
      if (normalized.includes("devops") || normalized.includes("cloud") || normalized.includes("aws")) {
        return "devops";
      }
      if (normalized.includes("tool") || normalized.includes("git")) {
        return "tools";
      }
      return "overview";
    case "projects":
      if (normalized.includes("specific") || knowledgeBase.projects.some(p => normalized.includes(p.name.toLowerCase()))) {
        return "specific";
      }
      return "overview";
    case "certifications":
      if (normalized.includes("list") || normalized.includes("all")) {
        return "list";
      }
      return "overview";
    default:
      return "overview";
  }
}

// Get context for user
function getContext(userId: string): ConversationContext {
  // For simplicity, using global context. In production, use a map or database
  return context;
}

// Detect follow-up message
function isFollowUp(message: string): boolean {
  return isFollowup(message);
}

// Update context
function updateContext(userId: string, intent: string, topic?: string | null, entity?: string | null): void {
  context.lastIntent = intent as ConversationContext["lastIntent"];
  if (topic !== undefined) context.lastTopic = topic;
  if (entity !== undefined) context.lastEntity = entity;
}

// Match intent
function matchIntent(question: string): { category: string; score: number } {
  const normalized = normalizeInput(question);
  const words = normalized.split(/\s+/);
  let bestCategory = "fallback";
  let bestScore = 0;

  const intentKeywords = {
    identity: ["name", "who", "introduce", "location", "email", "phone", "contact", "role", "student", "graduation", "cgpa", "background"],
    education: ["education", "university", "college", "school", "degree", "btech", "cse", "kiit", "coursework", "dsa", "machine learning", "ai", "12th", "10th", "cbse"],
    skills: ["skills", "programming", "languages", "frontend", "backend", "ml", "data", "cloud", "devops", "tools", "frameworks", "technologies", "tech"],
    experience: ["experience", "internship", "amazon", "keploy", "ml summer school", "api fellow", "fellowship"],
    projects: ["projects", "portfolio", "task management", "water quality", "heart disease", "tic tac toe", "cryptoweather", "youtube downloader", "wordpress"],
    certifications: ["certifications", "certificates", "aws", "oracle", "ibm", "vanderbilt", "cisco", "hackerrank"],
    social: ["social", "links", "github", "linkedin", "instagram", "twitter", "connect", "follow"],
    weather: ["weather", "temperature", "forecast", "rain", "sunny", "climate", "hot", "cold", "today"],
    time: ["time", "clock", "current time", "what time", "now"],
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
    well_being: ["how are you", "how do you do", "how's it going", "what's up", "how are things", "how have you been"],
    thanks: ["thank you", "thanks", "thank", "appreciate", "grateful"],
    fallback: []
  };

  for (const [category, keywords] of Object.entries(intentKeywords)) {
    let score = 0;
    // Check for exact phrase matches first
    for (const keyword of keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        score += 4; // Higher score for phrase matches
      }
    }
    // Also check individual word matches
    for (const word of words) {
      score += fuzzyMatch(word, keywords);
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  // Threshold: if score < 2, fallback (increased threshold for stricter matching)
  if (bestScore < 2) {
    bestCategory = "fallback";
  }

  return { category: bestCategory, score: bestScore };
}

// Detect strong intent from message
function detectStrongIntent(message: string): ConversationContext["lastIntent"] {
  const normalized = normalizeInput(message);

  // Strong intents (always override context)
  if (normalized.includes("who") || normalized.includes("introduce") || normalized.includes("about you") || normalized.includes("portfolio")) {
    return "portfolio";
  }
  if (normalized.includes("project") || normalized.includes("what have you built") || normalized.includes("work")) {
    return "projects";
  }
  if (normalized.includes("skill")) {
    return "skills";
  }
  if (normalized.includes("time") || normalized.includes("current time") || normalized.includes("what time")) {
    return "time";
  }
  if (normalized.includes("weather") || normalized.includes("temperature")) {
    return "weather";
  }
  if (normalized.includes("internship") || normalized.includes("experience")) {
    return "experience";
  }
  if (normalized.includes("college") || normalized.includes("education") || normalized.includes("university")) {
    return "education";
  }
  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
    return "smalltalk";
  }

  return null; // No strong intent detected
}

// Extract entity from message (for projects, etc.)
function extractEntity(message: string): string | null {
  const normalized = normalizeInput(message);

  // Check for specific project mentions
  const projectNames = knowledgeBase.projects.map(p => p.name.toLowerCase());
  for (const projectName of projectNames) {
    if (normalized.includes(projectName)) {
      return projectName;
    }
  }

  return null;
}

// Detect follow-up message
function isFollowup(message: string): boolean {
  const normalized = normalizeInput(message);
  const followupIndicators = [
    "these", "those", "they", "them", "that", "this",
    "what are they", "what are these", "what are the names",
    "which ones", "tell me more", "list them", "and then"
  ];

  return followupIndicators.some(indicator => normalized.includes(indicator));
}

// Continuation logic for follow-ups
function continueFromContext(message: string, ctx: ConversationContext): string {
  switch (ctx.lastIntent) {
    case "projects":
      return listProjectNames();
    case "skills":
      return expandSkills(ctx.lastTopic);
    case "portfolio":
      return moreAboutShobhit();
    default:
      return fallbackSkill(message);
  }
}

// Template interpolation function
function interpolateTemplate(template: string, data: any): string {
  return template.replace(/\{([^}]+)\}/g, (match, path) => {
    const keys = path.split('.');
    let value = data;
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return match; // Return original if path not found
      }
    }
    return Array.isArray(value) ? value.join(', ') : String(value);
  });
}

// Route to skill handlers
async function routeToSkill(intent: ConversationContext["lastIntent"], message: string, ctx: ConversationContext): Promise<string> {
  switch (intent) {
    case "portfolio":
      return portfolioSkill(message, ctx);
    case "projects":
      return projectsSkill(message, ctx);
    case "skills":
      return skillsSkill(message, ctx);
    case "time":
      return await timeSkill(message, ctx);
    case "weather":
      return await weatherSkill(message, ctx);
    case "experience":
      return experienceSkill(message, ctx);
    case "education":
      return educationSkill(message, ctx);
    case "smalltalk":
      return smalltalkSkill(message, ctx);
    default:
      return fallbackSkill(message);
  }
}

// Skill handlers
function portfolioSkill(message: string, ctx: ConversationContext): string {
  const templates = responseTemplates.identity.full_intro;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

function projectsSkill(message: string, ctx: ConversationContext): string {
  const templates = responseTemplates.projects.overview;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

function skillsSkill(message: string, ctx: ConversationContext): string {
  const templates = responseTemplates.skills.overview;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

async function timeSkill(message: string, ctx: ConversationContext): Promise<string> {
  const currentTime = new Date().toLocaleTimeString();
  const templates = responseTemplates.time;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, { time: currentTime });
}

async function weatherSkill(message: string, ctx: ConversationContext): Promise<string> {
  // Extract city from question - look for city after "in" or "for"
  const cityMatch = message.match(/\b(?:in|for)\s+(\w+)/i);
  let city = cityMatch ? cityMatch[1] : "Bhubaneswar";

  // If no "in" or "for" found, try to extract last word that might be a city
  if (city === "Bhubaneswar") {
    const words = message.toLowerCase().split(/\s+/);
    const lastWord = words[words.length - 1];
    // Check if last word is not a common non-city word
    if (!['today', 'now', 'please', 'here', 'there'].includes(lastWord)) {
      city = lastWord;
    }
  }

  try {
    // Fetch real weather data from Open-Meteo (free API)
    const coords = cityCoordinates[city.toLowerCase()];
    if (!coords) {
      // Fallback to simulated data if city not found
      const fallbackData = `Temperature: 28°C, Condition: Sunny, Humidity: 65%`;
      const templates = responseTemplates.weather.fallback;
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      return interpolateTemplate(selectedTemplate, { city, fallbackData });
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (weatherResponse.ok && weatherData.current_weather) {
      const temp = Math.round(weatherData.current_weather.temperature);
      const weathercode = weatherData.current_weather.weathercode;
      const condition = getWeatherCondition(weathercode).condition;
      const description = getWeatherCondition(weathercode).description;
      const humidity = weatherData.hourly?.relative_humidity_2m?.[0] || 65; // Get humidity from hourly data

      const templates = responseTemplates.weather.success;
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      return interpolateTemplate(selectedTemplate, {
        city,
        temp,
        condition,
        description,
        humidity
      });
    } else {
      // Fallback to simulated data if API fails
      const fallbackData = `Temperature: 28°C, Condition: Sunny, Humidity: 65%`;
      const templates = responseTemplates.weather.fallback;
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      return interpolateTemplate(selectedTemplate, { city, fallbackData });
    }
  } catch (error) {
    // Fallback to simulated data if fetch fails
    const fallbackData = `Temperature: 28°C, Condition: Sunny, Humidity: 65%`;
    const templates = responseTemplates.weather.fallback;
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    return interpolateTemplate(selectedTemplate, { city, fallbackData });
  }
}

function experienceSkill(message: string, ctx: ConversationContext): string {
  const templates = responseTemplates.experience.overview;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

function educationSkill(message: string, ctx: ConversationContext): string {
  const templates = responseTemplates.education.university;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

function smalltalkSkill(message: string, ctx: ConversationContext): string {
  const templates = responseTemplates.greeting;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

function fallbackSkill(message: string): string {
  const templates = responseTemplates.fallback;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

// Continuation functions
function listProjectNames(): string {
  const projectNames = knowledgeBase.projects.map(p => p.name).join(', ');
  return `Here are the projects: ${projectNames}. Which one would you like to know more about?`;
}

function expandSkills(topic: string | null): string {
  if (!topic) {
    const templates = responseTemplates.skills.overview;
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    return interpolateTemplate(selectedTemplate, knowledgeBase);
  }

  const skillMap: { [key: string]: string[] } = {
    languages: knowledgeBase.skills.languages,
    frontend: knowledgeBase.skills.frontend,
    backend: knowledgeBase.skills.backend,
    ml: knowledgeBase.skills.ml,
    devops: knowledgeBase.skills.devopsCloud,
    tools: knowledgeBase.skills.tools
  };

  const skills = skillMap[topic] || [];
  return `${topic.charAt(0).toUpperCase() + topic.slice(1)} skills: ${skills.join(', ')}`;
}

function moreAboutShobhit(): string {
  const templates = responseTemplates.identity.location;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

// Generate conversational, human-like response using dynamic templates
async function generateResponse(category: string, question: string): Promise<string> {
  const subIntent = detectSubIntent(question, category);
  const templates = responseTemplates[category as keyof typeof responseTemplates];

  if (!templates) {
    return responseTemplates.fallback[Math.floor(Math.random() * responseTemplates.fallback.length)];
  }

  let selectedTemplate: string;

  // Handle special cases
  if (category === "weather") {
    // Extract city from question - look for city after "in" or "for"
    const cityMatch = question.match(/\b(?:in|for)\s+(\w+)/i);
    let city = cityMatch ? cityMatch[1] : "Bhubaneswar";

    // If no "in" or "for" found, try to extract last word that might be a city
    if (city === "Bhubaneswar") {
      const words = question.toLowerCase().split(/\s+/);
      const lastWord = words[words.length - 1];
      // Check if last word is not a common non-city word
      if (!['today', 'now', 'please', 'here', 'there'].includes(lastWord)) {
        city = lastWord;
      }
    }

    try {
      // Fetch real weather data from Open-Meteo (free API)
      const coords = cityCoordinates[city.toLowerCase()];
      if (!coords) {
        // Fallback to simulated data if city not found
        const fallbackData = `Temperature: 28°C, Condition: Sunny, Humidity: 65%`;
        selectedTemplate = responseTemplates.weather.fallback[Math.floor(Math.random() * responseTemplates.weather.fallback.length)];
        return interpolateTemplate(selectedTemplate, { city, fallbackData });
      }

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;

      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (weatherResponse.ok && weatherData.current_weather) {
        const temp = Math.round(weatherData.current_weather.temperature);
        const weathercode = weatherData.current_weather.weathercode;
        const condition = getWeatherCondition(weathercode).condition;
        const description = getWeatherCondition(weathercode).description;
        const humidity = weatherData.hourly?.relative_humidity_2m?.[0] || 65; // Get humidity from hourly data

        selectedTemplate = responseTemplates.weather.success[Math.floor(Math.random() * responseTemplates.weather.success.length)];
        return interpolateTemplate(selectedTemplate, {
          city,
          temp,
          condition,
          description,
          humidity
        });
      } else {
        // Fallback to simulated data if API fails
        const fallbackData = `Temperature: 28°C, Condition: Sunny, Humidity: 65%`;
        selectedTemplate = responseTemplates.weather.fallback[Math.floor(Math.random() * responseTemplates.weather.fallback.length)];
        return interpolateTemplate(selectedTemplate, { city, fallbackData });
      }
    } catch (error) {
      // Fallback to simulated data if fetch fails
      const fallbackData = `Temperature: 28°C, Condition: Sunny, Humidity: 65%`;
      selectedTemplate = responseTemplates.weather.fallback[Math.floor(Math.random() * responseTemplates.weather.fallback.length)];
      return interpolateTemplate(selectedTemplate, { city, fallbackData });
    }
  }

  if (category === "time") {
    const currentTime = new Date().toLocaleTimeString();
    selectedTemplate = responseTemplates.time[Math.floor(Math.random() * responseTemplates.time.length)];
    return interpolateTemplate(selectedTemplate, { time: currentTime });
  }

  // Handle projects with specific project detection
  if (category === "projects" && subIntent === "specific") {
    const normalized = normalizeInput(question);
    let selectedProject = null;

    // Find the specific project mentioned
    for (const project of knowledgeBase.projects) {
      const projectName = project.name.toLowerCase();
      if (normalized.includes(projectName) ||
          (projectName.includes("task") && normalized.includes("task")) ||
          (projectName.includes("water") && normalized.includes("water")) ||
          (projectName.includes("heart") && normalized.includes("heart")) ||
          (projectName.includes("tic") && normalized.includes("tic")) ||
          (projectName.includes("crypto") && normalized.includes("crypto")) ||
          (projectName.includes("youtube") && normalized.includes("youtube")) ||
          (projectName.includes("wordpress") && normalized.includes("wordpress"))) {
        selectedProject = project;
        break;
      }
    }

    if (selectedProject) {
      selectedTemplate = responseTemplates.projects.specific[Math.floor(Math.random() * responseTemplates.projects.specific.length)];
      const response = interpolateTemplate(selectedTemplate, {
        project: selectedProject,
        name: knowledgeBase.identity.name,
        social: knowledgeBase.social
      });
      // Add call to action
      const callToAction = responseTemplates.projects.call_to_action[Math.floor(Math.random() * responseTemplates.projects.call_to_action.length)];
      return response + " " + interpolateTemplate(callToAction, { social: knowledgeBase.social });
    }
  }

  // Handle certifications list
  if (category === "certifications" && subIntent === "list") {
    const certNames = knowledgeBase.certifications.map(cert => cert.name);
    selectedTemplate = responseTemplates.certifications.list[Math.floor(Math.random() * responseTemplates.certifications.list.length)];
    return interpolateTemplate(selectedTemplate, { certifications: certNames });
  }

  // Select template based on sub-intent or use default
  const subTemplates = (templates as any)[subIntent] || templates;
  if (Array.isArray(subTemplates)) {
    selectedTemplate = subTemplates[Math.floor(Math.random() * subTemplates.length)];
  } else {
    // Handle nested template structures
    const defaultTemplates = (subTemplates as any).default || subTemplates;
    selectedTemplate = Array.isArray(defaultTemplates)
      ? defaultTemplates[Math.floor(Math.random() * defaultTemplates.length)]
      : defaultTemplates;
  }

  // For identity full_intro, combine introduction + details
  if (category === "identity" && subIntent === "full_intro") {
    const introTemplate = responseTemplates.identity.introduction[Math.floor(Math.random() * responseTemplates.identity.introduction.length)];
    const intro = interpolateTemplate(introTemplate, knowledgeBase);
    selectedTemplate = responseTemplates.identity.full_intro[Math.floor(Math.random() * responseTemplates.identity.full_intro.length)];
    return interpolateTemplate(selectedTemplate, { introduction: intro, ...knowledgeBase });
  }

  // For education university, sometimes add coursework
  if (category === "education" && subIntent === "university" && Math.random() > 0.5) {
    const uniResponse = interpolateTemplate(selectedTemplate, { name: knowledgeBase.identity.name, ...knowledgeBase.education });
    const courseworkTemplate = responseTemplates.education.coursework[Math.floor(Math.random() * responseTemplates.education.coursework.length)];
    const courseworkResponse = interpolateTemplate(courseworkTemplate, knowledgeBase.education);
    return uniResponse + " " + courseworkResponse;
  }

  return interpolateTemplate(selectedTemplate, knowledgeBase);
}

export async function POST(req: Request) {
  try {
    const { message, userId = "default" } = await req.json();
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ response: "Please provide a valid question." });
    }

    console.log("Incoming message:", message);

    let category: string;
    const context = getContext(userId);

    // Check if this is a follow-up message
    if (isFollowUp(message) && context.lastIntent) {
      // Use context to route follow-up to appropriate category
      category = context.lastIntent;

      // For follow-ups, try to detect sub-intent based on context
      if (category === "skills" && context.lastTopic) {
        // If we were talking about a specific skill area, maintain that context
        const subIntent = detectSubIntent(message, category);
        if (subIntent !== "overview") {
          // Update context with more specific topic
          updateContext(userId, category, subIntent);
        }
      } else if (category === "projects" && context.lastEntity) {
        // If we were talking about a specific project, try to find it
        const normalized = normalizeInput(message);
        let foundProject = null;
        for (const project of knowledgeBase.projects) {
          if (normalized.includes(project.name.toLowerCase()) ||
              (project.name.toLowerCase().includes("task") && normalized.includes("task")) ||
              (project.name.toLowerCase().includes("water") && normalized.includes("water")) ||
              (project.name.toLowerCase().includes("heart") && normalized.includes("heart")) ||
              (project.name.toLowerCase().includes("tic") && normalized.includes("tic")) ||
              (project.name.toLowerCase().includes("crypto") && normalized.includes("crypto")) ||
              (project.name.toLowerCase().includes("youtube") && normalized.includes("youtube")) ||
              (project.name.toLowerCase().includes("wordpress") && normalized.includes("wordpress"))) {
            foundProject = project;
            break;
          }
        }
        if (foundProject) {
          updateContext(userId, category, "specific", foundProject.name);
        }
      }
    } else {
      // Normal intent matching
      const intentResult = matchIntent(message);
      category = intentResult.category;
    }

    const response = await generateResponse(category, message);

    // Update context after response generation
    const subIntent = detectSubIntent(message, category);
    let topic = null;
    let entity = null;

    if (category === "skills") {
      topic = subIntent;
    } else if (category === "projects" && subIntent === "specific") {
      // Find the project entity
      const normalized = normalizeInput(message);
      for (const project of knowledgeBase.projects) {
        if (normalized.includes(project.name.toLowerCase()) ||
            (project.name.toLowerCase().includes("task") && normalized.includes("task")) ||
            (project.name.toLowerCase().includes("water") && normalized.includes("water")) ||
            (project.name.toLowerCase().includes("heart") && normalized.includes("heart")) ||
            (project.name.toLowerCase().includes("tic") && normalized.includes("tic")) ||
            (project.name.toLowerCase().includes("crypto") && normalized.includes("crypto")) ||
            (project.name.toLowerCase().includes("youtube") && normalized.includes("youtube")) ||
            (project.name.toLowerCase().includes("wordpress") && normalized.includes("wordpress"))) {
          entity = project.name;
          break;
        }
      }
    }

    updateContext(userId, category, topic, entity);

    return NextResponse.json({ response });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({
      response: "Something went wrong. Please try again later."
    });
  }
}