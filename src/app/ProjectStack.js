"use client";
import Image from "next/image";

/**
 * Smooth piling / stacking scroll component.
 * Calculates a global scroll progress across the container and then
 * staggers per-card progress so cards settle into their stacked transforms.
 */
export default function ProjectStack({ projects }) {
  return (
    <div className="space-y-28">
      {projects.map((proj, i) => (
        <div key={i} data-project>
          <div className="relative bg-transparent hover:bg-black/5 transition-colors duration-500 rounded-3xl p-12 border border-white/6 hover:border-purple-400/40">
            <div className={`flex flex-col ${i % 2 === 0 ? 'xl:flex-row' : 'xl:flex-row-reverse'} gap-16 items-center`}>
              <div className="xl:w-1/2">
                {proj.image ? (
                  proj.name === 'HabitQuest' ? (
                    <div className="relative flex items-center justify-center p-6">
                      <Image
                        src={proj.image}
                        alt={proj.name + ' logo'}
                        width={260}
                        height={260}
                        className="object-contain"
                        style={{ maxHeight: '260px' }}
                        unoptimized
                      />
                    </div>
                  ) : (proj.name === 'Finora' || proj.name === 'Skylynx' || proj.name === 'State' || proj.name === 'Stackholder' || (typeof proj.image === 'string' && (proj.image.toLowerCase().endsWith('state.png') || proj.image.toLowerCase().endsWith('stackholder.png')))) ? (
                    <div className={"relative overflow-hidden " + ((proj.name === 'State' || proj.name === 'Stackholder' || (typeof proj.image === 'string' && (proj.image.toLowerCase().endsWith('state.png') || proj.image.toLowerCase().endsWith('stackholder.png')))) ? '': 'rounded-2xl') + " shadow-xl p-0"}>
                      <Image src={proj.image} alt={proj.name} width={900} height={520} className="w-full object-contain" style={{ height: '420px' }} unoptimized />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl shadow-xl group/image">
                      <Image src={proj.image} alt={proj.name} width={900} height={520} className="w-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.03]" style={{ height: '400px' }} unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                    </div>
                  )
                ) : (
                  <div className="w-full h-[400px] bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-200/70">No Preview</div>
                )}
              </div>
              <div className="xl:w-1/2 flex flex-col items-start">
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 mb-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight">{proj.name}</h3>
                  {!proj.name.includes('Dashboard') && <span className="inline-flex w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]" />}
                </a>
                <p className="text-base leading-relaxed text-purple-100/90 mb-6">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((tech,j)=>(
                    <span key={j} className="bg-purple-900/40 backdrop-blur px-3 py-1.5 rounded-lg text-xs border border-purple-700/40 hover:border-purple-400/50 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

