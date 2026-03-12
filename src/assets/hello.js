import heroImage from "./img/asish27.png"
import cv from "./img/asish_res.pdf"
import talkImg from "./img/talk_img.png"


// skills
import htmlLogo from "./tech_logo/html.png"
import cssLogo from "./tech_logo/css.png"
import sassLogo from "./tech_logo/sass.png"
import reactjsLogo from "./tech_logo/reactjs.png"
import tailwindcssLogo from "./tech_logo/tailwindcss.png"
import materialuiLogo from "./tech_logo/materialui.png"
import nodejsLogo from "./tech_logo/nodejs.png"
import expressjsLogo from "./tech_logo/express.png"
import mongodbLogo from "./tech_logo/mongodb.png"
import firebaseLogo from "./tech_logo/firebase.png"
import postgreLogo from "./tech_logo/postgre.png"
import cLogo from "./tech_logo/c.png"
import cppLogo from "./tech_logo/cpp.png"
import javaLogo from "./tech_logo/java.png"
import pythonLogo from "./tech_logo/python.png"
import javascriptLogo from "./tech_logo/javascript.png"
import gitLogo from "./tech_logo/git.png"
import githubLogo from "./tech_logo/github.png"
import vscodeLogo from "./tech_logo/vscode.png"
import postmanLogo from "./tech_logo/postman.png"
import vercelLogo from "./tech_logo/vercel.png"
import netlifyLogo from "./tech_logo/netlify.png"
import figmaLogo from "./tech_logo/figma.png"


// projects
import bloggingImg from './work_logo/blogging.png'
import todoImg from './work_logo/todo.png';
import tictactoeImg from './work_logo/tictactoe.png';
import feedbackNovaImg from './work_logo/feedbacknova.png'


const SkillsInfo = [
  { name: 'HTML', logo: htmlLogo },
  { name: 'CSS', logo: cssLogo },
  { name: 'SASS', logo: sassLogo },
  { name: 'JavaScript', logo: javascriptLogo },
  { name: 'React JS', logo: reactjsLogo },
  { name: 'Tailwind CSS', logo: tailwindcssLogo },
  { name: 'Material UI', logo: materialuiLogo },

  { name: 'Node JS', logo: nodejsLogo },
  { name: 'Express JS', logo: expressjsLogo },
  { name: 'MongoDB', logo: mongodbLogo },
  { name: 'Firebase', logo: firebaseLogo },
  { name: 'PostgreSQL', logo: postgreLogo },

  { name: 'C', logo: cLogo },
  { name: 'C++', logo: cppLogo },
  { name: 'Java', logo: javaLogo },
  { name: 'Python', logo: pythonLogo },

  { name: 'Git', logo: gitLogo },
  { name: 'GitHub', logo: githubLogo },
  { name: 'VS Code', logo: vscodeLogo },
  { name: 'Postman', logo: postmanLogo },
  { name: 'Vercel', logo: vercelLogo },
  { name: 'Netlify', logo: netlifyLogo },
  { name: 'Figma', logo: figmaLogo },
];


export const projects = [
  {
    id: 0,
    title: "Blogging Website",
    description:
      "A powerful and user-friendly full-stack application designed to uncover and showcase detailed blog information. Simply enter a blog URL, and the app fetches comprehensive data, including post stats, authors, tags, and comments. The intuitive interface ensures a seamless experience, making it a must-visit tool for bloggers and readers.",
    image: bloggingImg,
    tags: ["React JS","Tailwind CSS", "API", "Node.js", "MongoDB", "Firebase", "AWS","Flaticon","OpenAI"],
    github: "#",
    webapp: "#",
  },
  {
    id: 1,
    title: "Todo App",
    description:
      "A Todo website is a practical and efficient tool designed to help users manage their daily tasks with ease. It provides a simple, organized interface where individuals can create, track, and complete their to-do lists seamlessly. Users can add new tasks, mark them as complete once finished, and delete them when no longer needed. Some advanced versions may include features like task categorization, priority settings, due dates, and reminders to enhance productivity.",
    image: todoImg,
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    github: "https://github.com/TechAsish1212/focusontoday",
    webapp: "https://techasishtodayonfocus.netlify.app/",
  },
  {
    id: 2,
    title: "Tic Tac Toe",
    description:
      "A classic Tic Tac Toe game built with HTML, CSS, and JavaScript. Players can enjoy a simple and engaging interface to challenge each other in this timeless game of strategy.",
    image: tictactoeImg,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/TechAsish1212/tictactoe",
    webapp: "https://techasishtictactoe.netlify.app/",
  },
  {
  id: 3,
  title: "Feedback Fusion",
  description:
    "A full-stack Feedback Fusion application built with Next.js and TypeScript. It allows users to securely sign up, submit feedback, and manage responses through a clean and modern dashboard. The app features authentication with Clerk, database management using Prisma ORM with PostgreSQL, and a responsive UI styled using Tailwind CSS and shadcn components for a seamless user experience.",
  image: feedbackNovaImg,
  tags: [
    "Next.js",
    "TypeScript",
    "Clerk",
    "Prisma ORM",
    "PostgreSQL",
    "Tailwind CSS",
    "shadcn/ui",
    "React"
  ],
  github: "https://github.com/TechAsish1212/feedback-fusion",
  webapp: "https://feednova.vercel.app/",
}
];

export const education = [
  {
    id: 0,
    school: "Siliguri Institute of Technology, Siliguri",
    date: "2023 - current",
    desc: "I have completed my Bachelor's degree (B.Tech) in Computer Science (AI&ML) from Siliguri Institute of Technology, Siliguri. During my time at SIT, I gained a strong foundation in programming, software development, and computer science principles. I have studied courses such as Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering.",
    degree: "Computer Science (AI&ML) - CSE(AI&ML)",
  },
  {
    id: 1,
    school: "Purunda Ram Krishna Siksha Sadan, Paschim Medinipur",
    date: "Apr 2017 - March 2018",
    desc: "I completed my class 12 education from Purunda Ram Krishna Siksha Sadan, under the WBCHSE board, where I studied Physics, Chemistry, and Mathematics (PCM) with Computer Applications.",
    degree: "WBCHSE(XII) - PCM with Computer Applications",
  },
  {
    id: 2,
    school: "Bandhuchak Gaya Prasad Siksha Niketan, Paschim Medinipur",
    date: "2015 - 2021",
    desc: "I completed my class 10 education from Bandhuchak Gaya Prasad Siksha Niketan, under the WBBSE board, where I studied all subjects.",
    degree: "WBBSE(X)",
  },
];

export const InspiringQuotes = [
  {
    text: "Arise, awake, and stop not till the goal is reached",
    author: "Swami Vivekananda",
  },
  {
    text: "Dream is not that which you see while sleeping it is something that does not let you sleep",
    author: "A.P.J. Abdul Kalam",
  },
  {
    text: "Perform your duty, because action is indeed better than inaction.",
    author: "Lord Krishna",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
];

export default heroImage;
export { talkImg };
export { cv, SkillsInfo };