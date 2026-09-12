import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code2, ArrowUpRight, X, Layers, Activity } from 'lucide-react'
import { projects, projectCategories } from '../../data/portfolioData'
import TagBadge from '../common/TagBadge'


export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="works" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d9f99d]" />
            <span>01 // Selected Archives</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
            Works & Systems
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {projectCategories.map((cat) => {
            const count = cat === 'All'
              ? projects.length
              : projects.filter(p => p.category === cat).length

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#d9f99d] text-black border-[#d9f99d] font-bold shadow-[0_0_20px_rgba(217,249,157,0.3)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat} <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setSelectedProject(project)}
              data-cursor-view="true"
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#111115] border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 cursor-pointer overflow-hidden"
            >
              {/* Top Accent Gradient Glow on Hover */}
              <div
                className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d9f99d] font-bold">#{String(index + 1).padStart(2, '0')}</span>
                    <span>/ {project.client}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 text-[11px]">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Title and Tagline */}
                <div className="pt-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#d9f99d] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#d9f99d] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 font-sans leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Graphic Mockup Preview Container */}
              <div className="relative my-8 rounded-xl bg-[#09090b] border border-white/10 p-6 overflow-hidden min-h-[160px] flex flex-col justify-between group-hover:border-white/20 transition-colors">
                {/* Visual Graphic Representation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                    <Activity className="w-3 h-3 text-[#d9f99d]" />
                    <span>{project.metrics}</span>
                  </div>
                </div>

                {/* Abstract Code / Shader Line Preview */}
                <div className="py-4 space-y-2 font-mono text-[11px] text-zinc-500">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>render_loop.init()</span>
                    <span className="text-[10px]" style={{ color: project.accentColor }}>[ACTIVE]</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 w-2/3 group-hover:w-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                    CLICK TO VIEW CASE STUDY &rarr;
                  </span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <TagBadge key={tech} label={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl p-6 sm:p-10 border border-white/20 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d]">
                  <span>{selectedProject.category}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                  <span>•</span>
                  <span>{selectedProject.client}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Metrics Highlight */}
              <div className="my-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Activity className="w-4 h-4 text-[#d9f99d]" />
                  <span>Verified Impact Metric:</span>
                </div>
                <span className="font-mono text-sm font-bold text-[#d9f99d]">
                  {selectedProject.metrics}
                </span>
              </div>

              {/* Narrative Content */}
              <div className="space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Overview
                  </h4>
                  <p className="text-zinc-300">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-[#09090b] border border-white/10">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-rose-400 mb-2">
                      The Engineering Challenge
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#09090b] border border-white/10">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
                      The Architecture Solution
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#d9f99d]" />
                    <span>Technology Stack & Modules</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <TagBadge key={tech} label={tech} active />
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 pt-6 flex flex-wrap items-center gap-4">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#d9f99d] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(217,249,157,0.3)]"
                >
                  <span>Launch Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs hover:bg-white/10 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
