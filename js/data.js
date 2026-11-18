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
  photo: "assets/img/elon.jpg", // e.g. "assets/img/elon.jpg" (square photo works best)
  portrait: "assets/img/elon-portrait.jpg", // tall photo for the hero frame (4:5)
  roles: ["Software Developer", "UI Designer"],
  // the hero types these out one after another
  typedRoles: ["Software Developer", "UI Designer", "Full-Stack Web Developer", "iOS Developer"],
  location: "Mauban, Quezon Province, Philippines",
  badgeLocation: "Mauban, PH",
  email: "labsojohnelon@gmail.com",
  resume: "assets/Labso-Resume.pdf", // e.g. "assets/Labso-Resume.pdf" → adds a "Resume" button

  hero:
    "I build web and mobile apps that are solid under the hood and simple to use. When I'm not coding, I'm usually fixing a motorcycle, out on a ride, or putting a PC together.",

  about: [
    "I'm a graduating student taking a Bachelor of Science in Computer Science, majoring in Software Engineering, at Manuel S. Enverga University Foundation.",
    "I enjoy learning new things, and I learn best by taking something apart to see how it works, whether that's a codebase, an engine, or a computer. That habit carries into my work: I like software that's well put together on the inside and easy to use on the outside.",
  ],


  socials: [
    { label: "GitHub", handle: "Ejlon", url: "https://github.com/Ejlon" },
    { label: "LinkedIn", handle: "john-elon-labso", url: "https://www.linkedin.com/in/john-elon-labso-19a28a201/" },
  ],

  /* ---------- Projects ----------
     Shown as equal cards in this order (put the newest first).
     Keep each description to one or two short sentences.
     github: paste the repo link to turn the "Code coming soon" label
     into a working "View code on GitHub" button.
     live: add a link to show a "Live site" button. */
  projects: [
    {
      type: "Full-stack web app",
      period: "Ongoing",
      title: "TindaTrack",
      subtitle: "Multi-Branch Inventory & POS System",
      description:
        "Tracks stock and sales for a grocery business across its warehouse and branches, with dashboards for sales and profit.",
      tech: ["React.js", "Node.js", "Express.js", "MySQL"],
      live: "",
      github: "https://github.com/Ejlon/tindatrack",
    },
    {
      type: "Capstone thesis",
      period: "February 2026 – Present",
      title: "WEVA",
      subtitle: "Behavioral Threat Detection for Student Information Systems",
      description:
        "A security layer that learns how users normally behave and blocks brute-force and automated attacks in real time.",
      tech: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
      note: "Team of three at MSEUF.",
      live: "",
      github: "https://github.com/KEMMM67/Thesis-repo",
    },
    {
      type: "iOS app",
      period: "November 2025",
      title: "ExpenSave",
      subtitle: "Budget Tracker App",
      description:
        "Log expenses, set monthly budgets, and see where your money goes with simple charts.",
      tech: ["Swift", "Firebase", "Core Data"],
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
     Each group becomes its own heading with a card grid.
     image = preview picture in assets/certs/ (a small copy goes in assets/certs/thumb/)
     link  = the Coursera "verify" page
     Example item:
     { name: "Course name", issuer: "University or company", date: "Jun 2026", image: "assets/certs/ID.jpg", link: "https://coursera.org/verify/ID" },
  */
  certificates: [
    {
      group: "Specializations",
      items: [
        { name: "Software Engineering Specialization", issuer: "The Hong Kong University of Science and Technology", date: "Apr 2026", image: "assets/certs/JUFFXSKS60YR.jpg", link: "https://coursera.org/verify/specialization/JUFFXSKS60YR" },
      ],
    },
    {
      group: "Courses",
      items: [
        { name: "Software Testing, Deployment, and Maintenance Strategies", issuer: "IBM", date: "Jun 2026", image: "assets/certs/4LF36HEGX9JT.jpg", link: "https://coursera.org/verify/4LF36HEGX9JT" },
        { name: "Machine Learning with Python: Build Real-World ML Models", issuer: "IBM", date: "Apr 2026", image: "assets/certs/KKZCX9THLANQ.jpg", link: "https://coursera.org/verify/KKZCX9THLANQ" },
        { name: "Dynamic Programming, Greedy Algorithms", issuer: "University of Colorado Boulder", date: "May 2025", image: "assets/certs/1J9IVT9HJM3G.jpg", link: "https://coursera.org/verify/1J9IVT9HJM3G" },
        { name: "Introduction to Relational Databases (RDBMS)", issuer: "IBM", date: "May 2025", image: "assets/certs/3DU80CPZD10I.jpg", link: "https://coursera.org/verify/3DU80CPZD10I" },
      ],
    },
  ],

  /* ---------- Achievements & awards ----------
     Empty = section hidden. Example:
     { title: "Dean's Lister", detail: "1st Semester, A.Y. 2025–2026", year: "2025" },
  */
  achievements: [],
};
