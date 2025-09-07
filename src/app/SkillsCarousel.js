"use client";
import Image from "next/image";

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
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/FFFFFF" },  { name: "Supabase", icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Tableau", icon: "/tableau-white.svg" },
];

export default function SkillsCarousel() {
  // Duplicate the skills array for seamless looping
  // Tripling the array ensures enough content for seamless scroll and visibility
  return (
    <section className="w-full max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-12 text-center shine-gradient">Technical Skills</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {skills.map((skill, i) => (
          <div 
            key={i + skill.name} 
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-purple-800/20 backdrop-blur-sm transition-all duration-300 border border-white/10 hover:border-purple-500/50"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
              <Image 
                src={skill.icon} 
                alt={skill.name} 
                width={32} 
                height={32} 
                className="group-hover:scale-110 transition-transform duration-300" 
                unoptimized 
              />
            </div>
            <span className="mt-3 text-white/80 text-sm font-medium tracking-wide text-center group-hover:text-white transition-colors duration-300">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
