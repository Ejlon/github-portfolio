/* =========================================================================
   PORTFOLIO CONTENT
   -------------------------------------------------------------------------
   This is the only file you need to edit to update the site.
   - Text goes inside quotes: "like this"
   - Every item in a list ends with a comma
   - Leave a link as "" (empty) and the button for it won't show
   - Leave a list as [] (empty) and that whole section hides itself
   After editing, save, then commit + push to GitHub. Vercel redeploys
   automatically in about a minute.
   ========================================================================= */

window.PORTFOLIO = {
  /* ---------- Basics ---------- */
  name: "John Elon C. Labso",
  heroName: "John Elon Labso", // the big name at the top (last word drops to line 2)
  shortName: "Elon", // shown on the badge
  lanyardText: "elon", // printed along the lanyard strap
  initials: "JL", // shown on the badge when there's no photo
  photo: "", // e.g. "assets/img/elon.jpg" (square photo works best)
  roles: ["Software Developer", "UI Designer"],
  location: "Lucena City, Quezon Province, Philippines",
  badgeLocation: "Lucena City, PH",
  email: "labsojohnelon@gmail.com",
  resume: "assets/Labso-Resume.pdf", // e.g. "assets/Labso-Resume.pdf" → adds a "Download résumé" button

  hero:
    "I build web and mobile apps that are solid under the hood and simple to use. When I'm not coding, I'm usually fixing a motorcycle, out on a ride, or putting a PC together.",

  about: [
    "I'm a graduating student taking a Bachelor of Science in Computer Science, majoring in Software Engineering, at Manuel S. Enverga University Foundation.",
    "I enjoy learning new things, and I learn best by taking something apart to see how it works, whether that's a codebase, an engine, or a computer. That habit carries into my work: I like software that's well put together on the inside and easy to use on the outside.",
  ],

  // icon options: "wrench", "wheel", "chip"
  offKeyboard: [
    { icon: "wrench", text: "Fixing motorcycles, cars, and just about anything that's broken" },
    { icon: "wheel", text: "Riding motorcycles and taking cars out on the road" },
    { icon: "chip", text: "Building desktop PCs from parts" },
  ],

  socials: [
    { label: "GitHub", handle: "Ejlon", url: "https://github.com/Ejlon" },
    { label: "LinkedIn", handle: "john-elon-labso", url: "https://www.linkedin.com/in/john-elon-labso-19a28a201/" },
  ],

  /* ---------- Projects ----------
     The first one with featured: true gets the big layout.
     highlights = the bullet points shown on each card.
     github: paste the repo link to turn the "Code coming soon" label
     into a working "View code on GitHub" button.
     live: add a link to show a "Live site" button. */
  projects: [
    {
      featured: true,
      type: "Capstone thesis",
      period: "February 2026 – Present",
      title: "WEVA",
      subtitle: "Agentic Runtime Application Security Framework: Behavioral Threat Detection",
      description:
        "A behavioral security layer for a student information system. It watches how each user and device acts and responds in proportion to the risk, stopping brute-force and automated attacks without getting in the way of real students.",
      steps: [
        "Identifies each device before it logs in",
        "Scores its live traffic over time and flags risky patterns",
        "Allows, logs, throttles, or blocks the request",
      ],
      highlights: [
        "Behavioral profiling layer that scores live network traffic per user with an exponential moving average (EMA), flagging brute-force, DoS, and DDoS patterns in real time.",
        "Hexagonal Architecture (ports and adapters) keeps the threat-detection logic independent of the Express.js routes and the Prisma/PostgreSQL data layer.",
        "Hardened cryptography: CSPRNG-based OTP generation, constant-time secret comparison with timingSafeEqual, and AES-256-GCM encryption for data at rest.",
      ],
      note: "Built with a team of three at MSEUF.",
      tech: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT", "AES-256-GCM"],
      live: "",
      github: "", // paste the GitHub repo link here
    },
    {
      type: "Full-stack web app",
      period: "Ongoing",
      title: "TindaTrack",
      subtitle: "Multi-Branch Inventory & POS System",
      description:
        "A full-stack inventory and sales management app that centralizes retail grocery operations across a central warehouse and its branches.",
      highlights: [
        "Dual-location inventory in MySQL, with strict SQL transactions so stock transfers between the warehouse and branches never lose data.",
        "JWT role-based access control (RBAC) with bcrypt password hashing for secure routing.",
        "Recharts dashboards that show real-time sales, revenue, and profit for each role.",
      ],
      tech: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "bcrypt", "Recharts"],
      live: "",
      github: "", // paste the GitHub repo link here
    },
    {
      type: "iOS app",
      period: "November 2025",
      title: "ExpenSave",
      subtitle: "Budget Tracker App",
      description:
        "A native iOS personal finance app, built with Swift and the MVVM architecture for a clean, testable codebase.",
      highlights: [
        "Full CRUD for tracking transactions, managing custom expense categories, and setting monthly budgets.",
        "Google Firebase authentication and Cloud Firestore, alongside Core Data, to store and sync relational data.",
        "Dashboards that turn raw transactions into interactive pie charts and circular goal-tracking progress bars.",
      ],
      tech: ["Swift", "MVVM", "Firebase Auth", "Cloud Firestore", "Core Data"],
      live: "",
      github: "", // paste the GitHub repo link here
    },
  ],

  /* ---------- Experience ----------
     Empty = section hidden. Example:
     { years: "Nov 2026 – Present", role: "Software Developer Intern", place: "Company name", detail: "What you worked on, in one or two sentences." },
  */
  experience: [],

  /* ---------- Education ---------- */
  education: [
    {
      years: "2023 – Present",
      title: "Bachelor of Science in Computer Science, Specialization in Software Engineering",
      school: "Manuel S. Enverga University Foundation",
      detail: "College of Computing and Multimedia Studies",
      place: "University Site, Brgy. Ibabang Dupay, Lucena City",
    },
    {
      years: "2021 – 2023",
      title: "Senior High School",
      school: "Mother Perpetua Parochial School, Inc.",
      place: "Lual Poblacion, Mauban, Quezon Province",
    },
    {
      years: "2017 – 2021",
      title: "Junior High School",
      school: "Mother Perpetua Parochial School, Inc.",
      place: "Lual Poblacion, Mauban, Quezon Province",
    },
  ],

  /* ---------- Skills & tech stack ---------- */
  skills: [
    { group: "Languages", items: ["Python", "Java", "C++", "Swift", "JavaScript", "SQL", "HTML", "CSS"] },
    { group: "Frameworks and libraries", items: ["React.js", "Node.js", "Express.js", "Flutter"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "Supabase", "Cloud Firestore", "Core Data"] },
    { group: "Cloud and backend", items: ["Google Firebase", "Prisma ORM", "JWT Authentication", "Vercel"] },
    { group: "Design", items: ["Figma"] },
    { group: "Tools", items: ["Visual Studio Code", "IntelliJ IDEA", "Xcode", "Git", "GitHub"] },
  ],

  /* ---------- Certificates ----------
     Each group becomes a tab. Example item:
     { name: "Introduction to Python", issuer: "University of Michigan", year: "2025", link: "https://coursera.org/verify/XXXX" },
  */
  certificates: [
    {
      group: "Coursera",
      items: [
        { name: "Software Testing, Deployment, and Maintenance Strategies", issuer: "IBM", year: "2026", link: "https://coursera.org/verify/4LF36HEGX9JT" },
        { name: "Software Engineering Specialization (3 courses)", issuer: "The Hong Kong University of Science and Technology", year: "2026", link: "https://coursera.org/verify/specialization/JUFFXSKS60YR" },
        { name: "Machine Learning with Python: Build Real-World ML Models", issuer: "IBM", year: "2026", link: "https://coursera.org/verify/KKZCX9THLANQ" },
        { name: "Dynamic Programming, Greedy Algorithms", issuer: "University of Colorado Boulder", year: "2025", link: "https://coursera.org/verify/1J9IVT9HJM3G" },
        { name: "Introduction to Relational Databases (RDBMS)", issuer: "IBM", year: "2025", link: "https://coursera.org/verify/3DU80CPZD10I" },
      ],
    },
    {
      group: "Others",
      items: [
        { name: "TCL Certificate of Participation", issuer: "TCL", year: "", link: "" },
      ],
    },
  ],

  /* ---------- Achievements & awards ----------
     Empty = section hidden. Example:
     { title: "Dean's Lister", detail: "1st Semester, A.Y. 2025–2026", year: "2025" },
  */
  achievements: [],
};
