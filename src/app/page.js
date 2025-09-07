import Image from "next/image";
import { getGithubProfile, getGithubRepos } from "./github";
import SkillsCarousel from "./SkillsCarousel";
import ProjectStack from "./ProjectStack";
import ContactForm from "./components/ContactForm"; // ADDED

export const metadata = {
  title: "Swapnil Shukla",
};
export const dynamic = 'force-dynamic';

function getPinnedProjects(repos) {
  // Pin and rename specific projects
  const pins = [
    { name: "finora", display: "Finora" },
    { name: "habitquest", display: "HabitQuest" },
    { name: "flight-booking-system", display: "Skylynx" },
  ];
  const pinned = pins
    .map(pin => {
      const repo = repos.find(r => r.name.toLowerCase() === pin.name.toLowerCase());
      if (repo) {
        return { ...repo, name: pin.display };
      }
      return null;
    })
    .filter(Boolean);
  // Remove pinned from repos
  const rest = repos.filter(r => !pins.some(pin => r.name.toLowerCase() === pin.name.toLowerCase()));
  return [...pinned, ...rest];
}

const mainProjects = [
  {
    name: "Finora",
    description:
      "Modern Finance Management Website. Built a full-stack finance app handling 500+ transactions with automated categorization. Secure authentication for 100+ test users. Integrated Gemini AI API for receipt parsing.",
    tech: ["React.js", "Next.js", "Tailwind CSS", "Prisma", "Supabase", "Arcjet", "Inngest", "Gemini AI API"],
    link: "https://finora-phi.vercel.app/",
    image: "/Finora.png", // Public folder screenshot for Finora homepage
  },
  {
    name: "HabitQuest",
    description:
      "Habit tracking and productivity platform. Gamified experience for building habits and tracking progress.",
    tech: ["UI/UX", "Figma"],
    link: "https://www.figma.com/proto/bC93EGAXwyHI1L9cNbhRD1/high-fidelity?node-id=1-1380&t=0Rl73OqCYYl3zVoY-1&starting-point-node-id=102%3A10281",
    image: "/HabitQuest.png", // Public folder screenshot for HabitQuest homepage
  },
  {
    name: "Skylynx",
    description:
      "Flight Booking System. Engineered a booking system supporting 1,000+ mock reservations, optimized backend API response, and designed a responsive UI.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    link: "https://skylynx.vercel.app/",
    image: "/Skylynx.png", // Public folder screenshot for Skylynx homepage
  },
  {
    name: "India State Performance Dashboard",
    description:
      "Comprehensive interactive dashboard analyzing performance metrics across Indian states and territories. Dynamic filtering and drill-down analysis for state-wise comparison. Reduced manual analysis time by 60% through automated data preparation and visualization workflows.",
    tech: ["Tableau", "Data Visualization", "Statistical Analysis"],
    link: "https://tabsoft.co/4mRw9aJ",
    image: "/state.png", // Screenshot for India State Performance Dashboard
  },
  {
    name: "Stakeholder Insights and Performance Dashboard",
    description:
      "Executive dashboard consolidating 20+ KPIs for 5+ stakeholders. Interactive visuals for revenue, segmentation, and efficiency. Advanced calculated fields and parameters reduced manual reporting effort by 40 hours/month.",
    tech: ["Tableau", "Business Analytics", "KPI Tracking"],
    link: "https://tabsoft.co/4fI5M51",
  image: "/Stackholder.png", // Screenshot for Stakeholder Insights Dashboard
  },
];

const skills = [
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/npm/@prisma/icons@latest/svg/white.svg" },
  { name: "Supabase", icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/FFFFFF" }, // Use white Tableau icon from CDN
];

export default async function Home() {
  let profile = null;
  try {
    const username = process.env.GITHUB_USERNAME || 'swaaaaaapnil'; // CHANGED
    profile = await getGithubProfile(username);                     // CHANGED
  } catch (e) {
    console.error('GitHub profile load failed', e);                  // CHANGED
  }
  const avatarUrl = profile
    ? profile.avatar_url + (profile.avatar_url.includes('?') ? '&' : '?') +
      'rev=' + new Date(profile.updated_at || Date.now()).getTime() // CHANGED (cache buster)
    : '/avatar-fallback.png';                                       // CHANGED

  const socials = [
    { href: "https://drive.google.com/file/d/1Uxitk1lyc0Xb42oM_W0CIuMbJ-XaoT5U/view?usp=sharing", icon: "/cv.svg", label: "Download CV", color: "#06b6d4", download: true },
    { href: "mailto:swapnilshukla470@gmail.com", icon: "/email.svg", label: "Email", color: "#a855f7" },
    { href: "https://github.com/swaaaaaapnil", icon: "/github.svg", label: "GitHub", color: "#6366f1" },
    { href: "https://www.linkedin.com/in/swapnil-shukla-2674a8269", icon: "/linkedin.svg", label: "LinkedIn", color: "#0A66C2" },
    { href: "https://public.tableau.com/app/profile/swapnil.shukla2935/vizzes", icon: "/tableau.svg", label: "Tableau", color: "#ff6f00" },
  ];

    return (
      <div className="min-h-screen flex flex-col items-center bg-black">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 px-4 sm:px-6 pt-16 md:pt-20 pb-10 min-h-[420px]">
          {/* Text & Socials */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start min-w-[280px] md:min-w-[320px] md:ml-16">
            <h1 className="font-extrabold text-white tracking-tight leading-tight text-[clamp(2.2rem,8vw,4.5rem)] md:text-[clamp(2.8rem,6vw,4.5rem)] mb-4 md:mb-5 text-center md:text-left">
              Swapnil Shukla
            </h1>
            <p className="text-[15px] sm:text-[17px] md:text-lg text-purple-200/95 max-w-2xl leading-relaxed mb-6 text-center md:text-left px-2 md:px-0">
               Web Developer | Data Analytics Enthusiast
            </p>
            <nav aria-label="Social links" className="flex gap-3 md:gap-4 mt-2">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? "_blank" : undefined}
                  rel={s.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  download={s.download ? '' : undefined}
                  className="social-icon transform hover:scale-110 active:scale-95 transition-transform duration-200"
                  style={{ ['--brand-color']: s.color }}
                  title={s.label}
                  aria-label={s.label}
                >
                  <Image src={s.icon} alt={s.label} width={24} height={24} className="md:w-[26px] md:h-[26px]" />
                </a>
              ))}
            </nav>
          </div>
          {/* Avatar Flip */}
          <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
            <div
              className="avatar-flip group w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] md:ml-20"
              style={{ perspective: '1200px' }}
              tabIndex={0}
              aria-label="Swapnil Shukla Avatar"
            >
              <div
                className="flip-inner group-hover:rotate-y-180 focus:rotate-y-180 w-full h-full relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                }}
              >
                <div
                  className="flip-front absolute inset-0 w-full h-full"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image
                    src={avatarUrl}                                  // CHANGED
                    alt="Swapnil Shukla"
                    width={360}
                    height={360}
                    className="w-full h-full rounded-full border-4 md:border-[6px] border-purple-500/90 shadow-2xl object-cover"
                    priority
                  />
                </div>
                <div
                  className="flip-back absolute inset-0 w-full h-full rounded-full border-4 md:border-[6px] border-purple-500/90 shadow-2xl flex items-center justify-center text-black text-lg md:text-xl font-semibold text-center px-4 md:px-6 bg-gradient-to-br from-purple-200 to-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  Web Developer &amp; Data Analyst
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Skills carousel */}
      <SkillsCarousel />

      {/* Projects section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 pb-32 md:pb-40">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-center shine-gradient">Featured Projects</h2>
        <p className="text-purple-200/80 max-w-2xl mx-auto text-center mb-16 md:mb-24 text-sm sm:text-base leading-relaxed px-2 md:px-0">A selection of products, platforms, and analytical dashboards I&apos;ve crafted with focus on performance, usability, and clarity.</p>

        {/* Mobile / small screens improved styling */}
        <div className="lg:hidden space-y-12 md:space-y-20">
          {mainProjects.map((proj, i) => (
            <div key={i} className="relative bg-black/60 md:bg-black/50 gradient-border backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 md:border-white/10 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col gap-6 md:gap-10">
                {proj.image && (
                  proj.name === 'HabitQuest' ? (
                    <div className="relative flex items-center justify-center p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl">
                      <Image src={proj.image} alt={proj.name} width={180} height={180} className="sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] object-contain" unoptimized />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl group">
                      <Image 
                        src={proj.image} 
                        alt={proj.name} 
                        width={800} 
                        height={480} 
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        style={{height: '240px', ['@media (minWidth: 640px)']: { height: '280px' }, ['@media (minWidth: 768px)']: { height: '340px' }}} 
                        unoptimized 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )
                )}
                <div className="space-y-4 md:space-y-0">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-3 md:mb-5 group">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-white transition-all duration-300 text-center md:text-left">{proj.name}</h3>
                    {!proj.name.includes('Dashboard') && (
                      <span className="pulse-ring inline-flex w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400" title="Live Project" />
                    )}
                  </a>
                  <p className="text-purple-100/90 mb-4 md:mb-6 leading-relaxed text-sm sm:text-base text-center md:text-left">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center md:justify-start">
                    {proj.tech.map((tech,j)=>(
                      <span key={j} className="bg-purple-900/50 md:bg-purple-900/40 backdrop-blur px-2.5 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-xs border border-purple-700/50 md:border-purple-700/40 hover:bg-purple-800/60 hover:border-purple-600/50 transition-all duration-200">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Large screen smooth piling animation */}
        <div className="hidden lg:block">
          <ProjectStack projects={mainProjects} />
        </div>
      </section>
      {/* CONTACT SECTION */}
      <section id="contact" className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-32 md:pb-40">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center shine-gradient">Contact Me</h2>
        <p className="text-purple-200/80 max-w-2xl mx-auto text-center mb-10 text-sm sm:text-base leading-relaxed">
          Send a direct message.
        </p>
        <div className="relative bg-black/60 gradient-border backdrop-blur-2xl rounded-2xl p-6 sm:p-10 border border-white/10 shadow-xl">
          <ContactForm />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-purple-500/10" />
        </div>
      </section>
    </div>
  );
}