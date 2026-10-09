/**
 * All portfolio copy lives here, taken from the resume. Edit this file to
 * update text, links and projects without touching the components.
 */

export const profile = {
  name: 'Kalaiyarasi',
  fullName: 'R. Kalaiyarasi',
  role: 'MERN Stack Developer',
  heroWord: 'Developer',
  heroTitle: ['MERN Stack', 'Developer'],
  email: 'kalaiyarasiravi2005@gmail.com',
  phone: '+91 6369621417',
  phoneHref: 'tel:+916369621417',
  location: ['Karur, Tamil Nadu,', 'India'],
  linkedin: 'https://www.linkedin.com/in/kalaiyarasi-ravi-905385353',
  /**
   * Cut-out portrait (transparent background) served from client/public/images.
   * Leave empty to fall back to the illustrated placeholder.
   */
  photo: '/images/profile_pic.png',
  resume: '/Kalaiyarasi_MERN_Resume_ATS.pdf',
  aboutHeadline:
    'I build responsive, real-world web applications, from database design to polished UI.',
  summary:
    'MERN Stack Developer with hands-on professional experience building and maintaining responsive, real-world web applications using React.js, Node.js, Express.js, and MySQL.',
};

export const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Education', to: '/#education' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Resume', to: '/#resume' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact-us' },
];

export const heroTags = ['React.js', 'Node.js'];

export const counters = [
  { label: 'Client Projects Worked On', value: 6, suffix: '' },
  { label: 'Technologies In My Stack', value: 10, suffix: '+' },
];

export const aboutCards = {
  grade: { value: '83%', label: 'Final Grade, B.E. Computer Science', badge: 'MERN (SDLC)' },
  focus: {
    title: ['Full-Stack Thinking,', 'Clean Execution.'],
    tags: ['React.js Components', 'Node & Express APIs', 'MySQL Schema Design'],
    rotatedTag: 'REST APIs',
  },
};

export const shortMernIntro = {
  tag: 'MERN Stack Developer',
  headline: 'Hi, I’m Kalaiyarasi',
  role: 'MERN Stack Developer',
  bio:
    'I am a passionate MERN Stack Developer specializing in building responsive, modern, and high-performance web applications. I develop full-stack solutions end-to-end — from database architecture and REST APIs to dynamic, component-driven React frontends.',
  pills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'JavaScript (ES6+)', 'REST APIs', 'HTML5 & CSS3'],
};

export const credentials = [
    {
      label: 'Current Experience',
      title: 'Junior Web Developer',
      subtitle: 'Sai Techno Solutions, Coimbatore',
      period: '03/2026 - Present',
      details:
        'End-to-end client web application development using React.js, Node.js, Express.js, and MySQL. Delivering e-commerce systems and consultancy portals.',
      badge: 'Active Role',
    },
    {
      label: 'Academic Foundation',
      title: 'B.E. Computer Science',
      subtitle: 'Christian College of Engineering and Technology',
      period: '08/2022 - 04/2026',
      details:
        'Final Grade: 83%. Thorough foundation in database management, algorithms, data structures, and web development.',
      badge: 'Grade 83%',
    },
    {
      label: 'Professional Certification',
      title: 'MERN Stack Development',
      subtitle: 'SDLC Institution, Karur',
      period: 'Course Completed',
      details:
        'Intensive hands-on training and course certification in full-stack JavaScript: React.js, Node.js, Express.js, MongoDB, and REST APIs.',
      badge: 'Certified',
    },
];

export const quickStats = [
    { label: 'Location', value: 'Karur, Tamil Nadu (Working in Coimbatore)' },
    { label: 'Languages', value: 'Tamil (Native), English (Professional)' },
    { label: 'Specialization', value: 'MERN Stack & MySQL Database Development' },
    { label: 'Availability', value: 'Full-Stack MERN Web Development' },
];

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  status: 'Live' | 'In Progress';
  url: string;
  short: string;
  detailTitle: [string, string];
  /** Wide screenshot for the detail page. */
  cover: string;
  /** Card-shaped screenshot for project cards and the slideshow. */
  thumb: string;
  gallery: string[];
  stack: string[];
  sections: { heading: string; body: string }[];
  closing: { heading: string; body: string }[];
}

const mernStack = ['React.js', 'Node.js', 'Express.js', 'MySQL', 'HTML', 'CSS', 'JavaScript'];
const stackSentence =
  'The frontend is built with React.js components, HTML, CSS and JavaScript, backed by a Node.js and Express.js server with a MySQL database.';
const roleSentence =
  'I worked on this project as a Junior Web Developer at Sai Techno Solutions, handling development from database design through to deployment-ready builds.';

export const projects: Project[] = [
  {
    slug: 'aura-global-education',
    title: 'Aura Global Education',
    client: 'Aura Global Education',
    category: 'Education Consultancy',
    status: 'Live',
    url: 'https://auraglobaledu.com/',
    short:
      'A consultancy platform guiding students through the complete study-abroad journey, from country and university selection to visa, IELTS, accommodation and travel.',
    detailTitle: ['Guiding Study Abroad:', 'Aura Global Education'],
    cover: '/images/projects/aura-cover.jpg',
    thumb: '/images/projects/aura-card.jpg',
    gallery: ['/images/projects/aura-1.jpg', '/images/projects/aura-2.jpg'],
    stack: mernStack,
    sections: [
      {
        heading: 'Project Overview',
        body: 'Built a consultancy platform guiding students through the complete study-abroad journey: country and university selection, application, scholarship, visa, IELTS, accommodation, and travel.',
      },
      {
        heading: 'Key Features',
        body: 'Implemented free counselling booking, scholarship and visa assistance sections, IELTS coaching info, and educational loan and accommodation assistance modules.',
      },
      {
        heading: 'Forms & Student Support',
        body: 'Developed student enquiry and application forms and pre-departure & post-arrival support content using React components with a Node.js, Express and MySQL backend.',
      },
    ],
    closing: [
      { heading: 'Tech Stack', body: stackSentence },
      { heading: 'My Role', body: roleSentence },
    ],
  },
  {
    slug: 'sarvesh-enterprises',
    title: 'Sarvesh Enterprises',
    client: 'Sarvesh Enterprises',
    category: 'E-Commerce',
    status: 'Live',
    url: 'https://thelabplanner.in/',
    short:
      'A full-featured e-commerce platform with product catalog, cart, checkout and secure payment integration, plus an admin dashboard for products, orders and shipping.',
    detailTitle: ['Selling Online:', 'Sarvesh Enterprises'],
    cover: '/images/projects/labplanner-cover.jpg',
    thumb: '/images/projects/labplanner-card.jpg',
    gallery: ['/images/projects/labplanner-1.jpg', '/images/projects/labplanner-2.jpg'],
    stack: mernStack,
    sections: [
      {
        heading: 'Project Overview',
        body: 'Developed a full-featured e-commerce platform with product catalog, cart, checkout, and secure payment integration.',
      },
      {
        heading: 'Admin Dashboard',
        body: 'Built an admin dashboard for managing products, orders, and shipping details.',
      },
      {
        heading: 'Orders & Shipping',
        body: 'Implemented the shipping workflow and order management, integrated with a MySQL backend via REST APIs.',
      },
    ],
    closing: [
      { heading: 'Tech Stack', body: stackSentence },
      { heading: 'My Role', body: roleSentence },
    ],
  },
  {
    slug: 'nikitha-enterprises',
    title: 'Nikitha Enterprises',
    client: 'Nikitha Enterprises',
    category: 'E-Commerce',
    status: 'In Progress',
    url: 'https://anyrastrove.com/',
    short:
      'An e-commerce platform currently in development, with product catalog, cart, checkout, payment integration and shipping management.',
    detailTitle: ['Building The Store:', 'Nikitha Enterprises'],
    cover: '/images/projects/anyrastrove-cover.jpg',
    thumb: '/images/projects/anyrastrove-card.jpg',
    gallery: ['/images/projects/anyrastrove-1.jpg', '/images/projects/anyrastrove-2.jpg'],
    stack: mernStack,
    sections: [
      {
        heading: 'Project Overview',
        body: 'Currently developing an e-commerce platform with product catalog, cart, checkout, payment integration, and shipping management.',
      },
      {
        heading: 'Admin Dashboard',
        body: 'Building an admin dashboard for order and inventory management using a React frontend and a Node.js, Express and MySQL backend.',
      },
    ],
    closing: [
      { heading: 'Tech Stack', body: stackSentence },
      { heading: 'My Role', body: roleSentence },
    ],
  },
  {
    slug: 'baani-jewels',
    title: 'Baani Jewels',
    client: 'Baani Jewels',
    category: 'E-Commerce',
    status: 'Live',
    url: 'https://baanijewels.com/',
    short:
      'A responsive jewellery e-commerce platform with dynamic product, category, variant, cart, wishlist and checkout modules.',
    detailTitle: ['Crafting Commerce:', 'Baani Jewels'],
    cover: '/images/projects/baani_jewel.png',
    thumb: '/images/projects/baani_jewel.png',
    gallery: ['/images/projects/baani_jewel.png'],
    stack: mernStack,
    sections: [
      {
        heading: 'Project Overview',
        body: 'Developed a responsive jewellery e-commerce platform with dynamic product, category, variant, cart, wishlist, and checkout modules.',
      },
      {
        heading: 'Payments & Orders',
        body: 'Implemented the complete payment gateway, order management, shipping, and customer tracking flow with secure transaction handling.',
      },
      {
        heading: 'Admin Panel',
        body: 'Developed the admin panel, coupons, offers, banners, reviews, and product management, with testing, debugging, and deployment support.',
      },
    ],
    closing: [
      { heading: 'Tech Stack', body: stackSentence },
      { heading: 'My Role', body: roleSentence },
    ],
  },
  {
    slug: 'forever-sparkle',
    title: 'Forever Sparkle',
    client: 'Forever Sparkle',
    category: 'E-Commerce',
    status: 'Live',
    url: 'https://foreversparkle.co.in/',
    short:
      'An elegant luxury jewellery and fashion accessories e-commerce store with product collections, shopping cart, customer authentication and secure checkout.',
    detailTitle: ['Crafting Elegance:', 'Forever Sparkle'],
    cover: '/images/projects/Forever Sparkle.png',
    thumb: '/images/projects/Forever Sparkle.png',
    gallery: ['/images/projects/Forever Sparkle.png'],
    stack: mernStack,
    sections: [
      {
        heading: 'Project Overview',
        body: 'Developed an elegant e-commerce platform for luxury jewellery and fashion accessories, featuring dynamic collection filtering, responsive product view, and cart system.',
      },
      {
        heading: 'Cart & User Authentication',
        body: 'Implemented interactive shopping cart with subtotal calculation, user sign-in/registration flows, and streamlined order checkout.',
      },
      {
        heading: 'Product Catalog & Components',
        body: 'Built responsive product catalogs with React components and RESTful backend APIs for categories including watches, anti-tarnish chains, bracelets, and hair accessories.',
      },
    ],
    closing: [
      { heading: 'Tech Stack', body: stackSentence },
      { heading: 'My Role', body: roleSentence },
    ],
  },
  {
    slug: 'srp-facilities-services',
    title: 'SRP Facilities Services',
    client: 'SRP Facilities Services',
    category: 'Facility & Corporate Services',
    status: 'Live',
    url: 'https://srpfacilitiesservices.com/',
    short:
      'A responsive commercial website for SRP Facilities Services, showcasing industrial facility management, housekeeping, security, and corporate workforce solutions.',
    detailTitle: ['Corporate Facility Solutions:', 'SRP Facilities Services'],
    cover: '/images/projects/srp-home.png',
    thumb: '/images/projects/srp-home.png',
    gallery: ['/images/projects/srp-home.png'],
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap', 'Responsive Web Design', 'Static Site'],
    sections: [
      {
        heading: 'Project Overview',
        body: 'Developed a responsive commercial website for SRP Facilities Services, presenting corporate facility management, housekeeping, security staffing, and building maintenance services.',
      },
      {
        heading: 'Responsive Design & Architecture',
        body: 'Engineered a clean mobile-first layout using semantic HTML5, modern CSS3, and JavaScript, ensuring rapid loading performance and optimal viewing across all mobile, tablet, and desktop devices.',
      },
      {
        heading: 'Service Showcase & Enquiries',
        body: 'Structured clear service categories, client enquiry channels, and direct call/email CTAs enabling corporate clients to request quick quotes and facility management consultations.',
      },
    ],
    closing: [
      {
        heading: 'Tech Stack',
        body: 'Built with semantic HTML5, modern CSS3 styling, responsive Bootstrap grid, and interactive JavaScript.',
      },
      {
        heading: 'My Role',
        body: 'Handled end-to-end frontend development, layout design, performance optimization, and cross-browser testing for production deployment.',
      },
    ],
  },
];

export const services = {
  frontend: {
    title: 'Frontend Development',
    text: 'Component-based React interfaces that are reusable and maintainable.',
    tags: ['React.js', 'JavaScript (ES6+)', 'Bootstrap', 'HTML5', 'CSS3', 'jQuery', 'Responsive'],
  },
  responsive: {
    title: 'Responsive Design',
    text: 'Mobile-first layouts, cross-browser tested on every device.',
  },
  backend: {
    title: 'Backend & APIs',
    text: 'RESTful APIs for CRUD, authentication flows and forms.',
    routes: [
      { method: 'GET', path: '/api/products', status: 200 },
      { method: 'POST', path: '/api/orders', status: 201 },
      { method: 'POST', path: '/api/enquiries', status: 201 },
      { method: 'PUT', path: '/api/cart/:id', status: 200 },
    ],
  },
  database: {
    title: 'Database & Tools',
    text: 'Relational schemas in MySQL, plus MongoDB and Git/GitHub.',
  },
  cta: {
    tag: 'Sai Techno Solutions',
    title: 'Let’s Build Together',
    text: 'Have a website or web app in mind? Let’s make it real.',
    button: 'Start A Project',
  },
};

export interface EducationCardData {
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  suffix: string;
  location: string;
  description: string;
  listTitle: string;
  items: string[];
  tags: string[];
}

export const educationCards: EducationCardData[] = [
  {
    label: 'College Education',
    badge: 'Grade: 83%',
    title: 'B.E. CSE',
    subtitle: 'Christian College of Engineering and Technology',
    suffix: '/ 83%',
    location: 'Karur / Dindigul, Tamil Nadu',
    description:
      'Bachelor of Computer Science (08/2022 - 04/2026). Strong grounding in database design, web development, and full-stack applications.',
    listTitle: 'College Highlights & Certifications:',
    items: [
      'Final Grade: 83% in Bachelor of Computer Science',
      'MERN Stack Development Course Completion Certificate (SDLC Institution, Karur)',
      'Relational Database Modeling & MySQL Administration',
      'Modern JavaScript (ES6+), React.js Components & REST APIs',
    ],
    tags: ['B.E. CSE', 'Grade: 83%', 'Christian College', 'SDLC MERN Certified', 'MySQL', 'React.js'],
  },
  {
    label: 'School Education',
    badge: '12th: 83.83% • 10th: 81.4%',
    title: 'HSC & SSLC',
    subtitle: 'Government Higher Secondary School',
    suffix: '/ 83.8% & 81.4%',
    location: 'Elavanur, Karur, Tamil Nadu',
    description:
      'Completed both Secondary School (SSLC - 10th) and Higher Secondary (HSC - 12th) education at Government Higher Secondary School, Elavanur, Karur with outstanding academic records.',
    listTitle: 'School Academic Scores & Details:',
    items: [
      '12th Standard (HSC): 503 / 600 — 83.83%',
      '10th Standard (SSLC): 407 / 500 — 81.40%',
      'Institution: Government Higher Secondary School, Elavanur, Karur',
      'Core Subjects: Mathematics, Physics, Chemistry & Computer Science',
      'Consistent first-class academic track record throughout school and college',
    ],
    tags: ['12th HSC: 83.83%', '10th SSLC: 81.40%', 'Elavanur, Karur', 'Govt Higher Secondary'],
  },
];

export interface WorkExperienceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  clientProject: string;
  image: string;
  metric: string;
}

export interface WorkExperienceData {
  index: string;
  sectionTag: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  headline: string;
  summary: string;
  responsibilities: string[];
  items: WorkExperienceItem[];
  technologies: string[];
}

export const workExperience: WorkExperienceData = {
  index: '02',
  sectionTag: '( Work Experience )',
  role: 'Junior Web Developer',
  company: 'Sai Techno Solutions',
  location: 'Coimbatore, Tamil Nadu',
  period: '03/2026 – Present',
  type: 'Full-Time',
  headline: 'Building responsive full-stack web applications with React.js, Node.js, Express.js, and MySQL.',
  summary:
    'Junior Web Developer at Sai Techno Solutions, building responsive React user interfaces, server-side Express REST APIs, and relational MySQL databases for live client projects.',
  responsibilities: [
    'Developed responsive client websites using React.js for modern, component-driven user interfaces.',
    'Designed relational database tables and managed data using MySQL for products, orders, and user enquiries.',
    'Built Node.js and Express REST APIs to handle CRUD operations, forms, and business logic.',
    'Collaborated directly with clients and team members to gather requirements and deliver updates on schedule.',
    'Implemented mobile-first layouts tested across mobile, tablet, and desktop browsers.',
    'Managed source code using Git and GitHub for version control and team collaboration.',
    'Debugged issues, improved site responsiveness, and optimized page load speed.',
    'Delivered multiple live client platforms including an overseas education consultancy site and e-commerce stores.',
  ],
  items: [
    {
      id: 'frontend',
      number: '01',
      title: 'Responsive React.js User Interface',
      category: 'Frontend Development',
      description:
        'Built clean, responsive React components with mobile-first layouts, modern CSS, and smooth user interactions. Fully tested across mobile, tablet, and desktop screens.',
      tags: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive Design', 'Bootstrap'],
      clientProject: 'Aura Global Education',
      image: '/images/projects/aura-card.jpg',
      metric: 'Mobile-First UI',
    },
    {
      id: 'backend',
      number: '02',
      title: 'Node.js & Express REST APIs',
      category: 'Backend & APIs',
      description:
        'Developed server-side REST APIs using Node.js and Express. Handled CRUD operations, user enquiries, and e-commerce shopping cart logic.',
      tags: ['Node.js', 'Express.js', 'REST APIs', 'CRUD Operations', 'API Integration'],
      clientProject: 'Baani Jewels',
      image: '/images/projects/baani-card.jpg',
      metric: 'REST APIs',
    },
    {
      id: 'database',
      number: '03',
      title: 'MySQL Database & Schema Design',
      category: 'Database Management',
      description:
        'Structured normalized MySQL database tables for product catalogs, customer orders, and enquiries. Wrote clean SQL queries and maintained data integrity.',
      tags: ['MySQL', 'SQL Queries', 'Database Design', 'Data Integrity', 'CRUD'],
      clientProject: 'Sarvesh Enterprises / The Lab Planner',
      image: '/images/projects/labplanner-card.jpg',
      metric: 'MySQL Database',
    },
    {
      id: 'delivery',
      number: '04',
      title: 'Live Client Platforms & Git Collaboration',
      category: 'Client Delivery',
      description:
        'Delivered 5 live client websites at Sai Techno Solutions. Managed code using Git/GitHub, fixed bugs, improved page load speed, and incorporated client feedback.',
      tags: ['Git / GitHub', 'Code Collaboration', 'Bug Fixing', 'Performance', 'Client Delivery'],
      clientProject: 'Nikitha Enterprises / Anyra Strove',
      image: '/images/projects/anyrastrove-card.jpg',
      metric: '5 Live Sites',
    },
  ],
  technologies: [
    'React.js',
    'Node.js',
    'Express.js',
    'MySQL',
    'JavaScript (ES6+)',
    'REST APIs',
    'HTML5 & CSS3',
    'Git & GitHub',
    'Bootstrap',
    'jQuery',
  ],
};

export const experienceCards = educationCards;

export const highlights = [
  {
    pill: 'Consultancy Platform',
    project: 'Aura Global Education',
    text: 'Delivered an end-to-end overseas education consultancy platform guiding students through university selection, application, scholarship, visa, and counselor booking using React.js and Node.js.',
    image: '/images/projects/aura-card.jpg',
    url: 'https://auraglobaledu.com/',
  },
  {
    pill: 'E-Commerce Platform',
    project: 'Sarvesh Enterprises (The Lab Planner)',
    text: 'Engineered a full-featured commercial e-commerce platform with product catalogs, shopping cart, checkout, payment gateway integration, and shipping management connected to MySQL.',
    image: '/images/projects/labplanner-card.jpg',
    url: 'https://thelabplanner.in/',
  },
  {
    pill: 'E-Commerce Storefront',
    project: 'Nikitha Enterprises (Anyra Strove)',
    text: 'Built dynamic e-commerce shopping experience with product catalogs, cart state management, checkout, order tracking, and admin inventory management using React and Express.',
    image: '/images/projects/anyrastrove-card.jpg',
    url: 'https://anyrastrove.com/',
  },
  {
    pill: 'Luxury Jewellery Store',
    project: 'Baani Jewels',
    text: 'Developed a high-converting luxury jewellery e-commerce platform with dynamic product variants, category hierarchies, wishlists, cart checkout, payment gateway, and coupon offers.',
    image: '/images/projects/baani_jewel.png',
    url: 'https://baanijewels.com/',
  },
  {
    pill: 'Fashion Accessories',
    project: 'Forever Sparkle',
    text: 'Crafted an elegant fashion and jewellery e-commerce platform featuring dynamic collection filtering, responsive product view, cart subtotal calculations, and secure order placement.',
    image: '/images/projects/Forever Sparkle.png',
    url: 'https://foreversparkle.co.in/',
  },
  {
    pill: 'Corporate Static Website',
    project: 'SRP Facilities Services',
    text: 'Engineered a high-performance corporate static website showcasing commercial facility management, housekeeping, and security staffing with semantic HTML5, CSS3, and Bootstrap.',
    image: '/images/projects/srp-home.png',
    url: 'https://srpfacilitiesservices.com/',
  },
];

export const highlightSource = {
  name: 'Sai Techno Solutions',
  role: 'Junior Web Developer, 03/2026 - Present',
};

export const faqs = [
  {
    question: 'Which technologies do you work with?',
    answer:
      'React.js, Node.js, Express.js, MySQL and MongoDB, along with HTML5, CSS3, JavaScript (ES6+), jQuery, Bootstrap and Git/GitHub.',
  },
  {
    question: 'What kind of projects have you built?',
    answer:
      'An overseas education consultancy website and multiple e-commerce platforms with product catalogs, carts, checkout, payment integration and admin dashboards.',
  },
  {
    question: 'Do you handle both frontend and backend?',
    answer:
      'Yes. I deliver websites end to end, from database design to REST API integration and responsive UI development.',
  },
  {
    question: 'Where are you based?',
    answer:
      'I am from Karur, Tamil Nadu, India, and currently work as a Junior Web Developer at Sai Techno Solutions in Coimbatore.',
  },
];

export const contactServices = [
  'Website Development',
  'E-Commerce Website',
  'Frontend Development (React.js)',
  'Backend / REST API Development',
  'Other',
];
