import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "Python",
    image: "python.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "oracle",
    image: "oracle.jpeg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C++",
    image: "cpp.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "AWS",
    image: "AWS.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;


export const SOCIALS = [
  {
    name: "Linkedin",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/shobhit-raj9973",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/lucifer9973",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/Shobhitraj729",
  },
] as const;


export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },

  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },


  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Oracle",
    image: "oracle.jpeg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C++",
    image: "cpp.png",
    width: 80,
    height: 80,
  },


] as const;

export const FULLSTACK_SKILL = [
] as const;

export const OTHER_SKILL = [

] as const;

export const PROJECTS = [
  {
    title: "Task Management API",
    image: "/projects/project-1.webp",
    link: "https://task-manager-api-peach.vercel.app/",
  },
  {
    title: "Water Quality Analysis",
    image: "/projects/project-2.webp",
    link: "https://water-quality-app.onrender.com/",
  },
  {
    title: "Tic-Tac-Toe Android App",
    image: "/projects/project-3.webp",
    link: "https://github.com/lucifer9973/tictactoe-app",
  },
  {
    title: "CryptoWeather Nexus",
    image: "/projects/project-4.webp",
    link: "https://crypto-weather-nexus-rho-five.vercel.app/",
  },
] as const;


export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/lucifer9973",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "www.linkedin.com/in/shobhit-raj9973",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:rajshobhit48@gmail.com",
      },
    ],
  },
] as const;


export const ACHIEVEMENTS = [
  {
    title: "AI/ML Summer School - Amazon",
    description: "Selected for Amazon ML Summer School (less than 2% acceptance rate).",
    date: "2023",
  },
  {
    title: "Hackathon Winner",
    description: "Won first place in XYZ Hackathon for innovative app development.",
    date: "2023",
  },
  {
    title: "Scholarship Recipient",
    description: "Received full scholarship for academic excellence.",
    date: "2022",
  },
] as const;

export const INTERNSHIPS = [
  {
    title: "AI/ML Intern",
    company: "Google",
    description: "Leveraged Google Firebase and cloud computing to enable dynamic AI updates within Android applications.",
    duration: "Jan 2025 - Mar 2025",
  },
  {
    title: "Android Developer Intern",
    company: "Google",
    description: "Designed and implemented intuitive UI/UX following Material Design guidelines, improving usability by 30%.",
    duration: "Oct 2024 - Dec 2024",
  },
  {
    title: "Keploy API Fellow",
    company: "Keploy",
    description: "Built and tested production-grade REST APIs, contributed to open-source API testing platform. Solved real-world backend challenges and collaborated in a dev team using Git/GitHub workflows.",
    duration: "Nov 2023 - Jan 2024",
  },
] as const;

export const CERTIFICATIONS = [
  {
    title: "AWS Academy Cloud Computing Badge",
    issuer: "Amazon Web Services (AWS Academy)",
    date: "Mar 2024",
    link: "https://aws.amazon.com/certification/",
  },
  {
    title: "Cisco JavaScript Certification",
    issuer: "Cisco Networking Academy",
    date: "May 2024",
    link: "",
  },
  {
    title: "HackerRank Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "Jan 2024",
    link: "",
  },
  {
    title: "HackerRank SQL (Basic)",
    issuer: "HackerRank",
    date: "Jan 2024",
    link: "",
  },
  {
    title: "Cisco Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "May 2024",
    link: "",
  },
  {
    title: "Cisco Python 2 Essentials",
    issuer: "Cisco Networking Academy",
    date: "Jun 2024",
    link: "",
  },
  {
    title: "Cisco CCNA - Networking and Automation",
    issuer: "Cisco Networking Academy",
    date: "Jun 2025",
    link: "",
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google",
    date: "2022",
    link: "https://cloud.google.com/certification",
  },
] as const;

export const TIMELINE = [
  {
    year: "2026",
    events: [
      "Expected graduation from KIIT University with B.Tech in Computer Science and System Engineering (CGPA: 7.52/10.0)",
    ],
  },
  {
    year: "2025",
    events: [
      "Amazon ML Summer School (9 Aug 2025 - Present)",
      "Keploy API Fellowship (Mar 2025 - Jul 2025)",
      "Google Cloud Fundamentals Certification",
    ],
  },
  {
    year: "2024",
    events: [
      "Cisco CCNA Certification",
      "Cisco Cybersecurity Certification",
      "Cisco Python 2 Essentials Certification",
      "Cisco JavaScript Certification",
      "HackerRank Problem Solving (Basic) Certification",
      "HackerRank SQL (Basic) Certification",
    ],
  },
  {
    year: "2023",
    events: [
      "AWS Academy Cloud Computing Badge",
      "Cisco Python Essentials 1 Certification",
      "Keploy API Fellowship (Nov 2023 - Jan 2024)",
    ],
  },
  {
    year: "2020-2022",
    events: [
      "12th Central Board of Secondary Education, Sri Chaitanya Vidyaniketan (Score: 81%)",
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Achievements",
    link: "#achievements",
  },
  {
    title: "Internships",
    link: "#internships",
  },
  {
    title: "Certifications",
    link: "#certifications",
  },
  {
    title: "Timeline",
    link: "#timeline",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact Me",
    link: "#contact",
  },
] as const;


