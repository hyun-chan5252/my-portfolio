import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { supabase } from '../../lib/supabase';
import { ExternalLink, Loader2 } from 'lucide-react';

/**
 * ProjectsSection 컴포넌트
 * Supabase에서 프로젝트 목록을 가져와 카드 그리드로 표시
 *
 * Props:
 * 없음 - Projects 섹션 표시 컴포넌트
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTechStackColor = (tech) => {
    const colors = {
      'React': 'bg-[#2779a7]/20 text-[#2779a7]',
      'TailwindCSS': 'bg-teal-500/20 text-teal-400',
      'Supabase': 'bg-emerald-500/20 text-emerald-400',
      'Vite': 'bg-purple-500/20 text-purple-400',
      'MUI': 'bg-blue-500/20 text-blue-400',
      'JavaScript': 'bg-[#ECD06F]/20 text-[#ECD06F]',
      'TypeScript': 'bg-blue-500/20 text-blue-400',
      'Node.js': 'bg-green-500/20 text-green-400',
      'CSS3': 'bg-indigo-500/20 text-indigo-400',
      'HTML5': 'bg-orange-500/20 text-orange-400',
      'Figma': 'bg-pink-500/20 text-pink-400'
    };
    return colors[tech] || 'bg-muted text-muted-foreground';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#2779a7] text-sm font-medium tracking-widest uppercase mb-2">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            직접 만든 <span className="text-[#ECD06F]">프로젝트</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            직접 기획하고 개발한 프로젝트들입니다.
            각 프로젝트를 클릭하면 실제 사이트를 확인할 수 있습니다.
          </p>
        </motion.div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center border border-destructive/20">
            프로젝트를 불러오는 중 오류가 발생했습니다: {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#ECD06F]" />
            <span className="ml-2 text-muted-foreground">프로젝트 불러오는 중...</span>
          </div>
        ) : projects.length === 0 ? (
          <Card className="max-w-md mx-auto text-center py-12 bg-card border-border">
            <CardContent>
              <p className="text-muted-foreground">
                등록된 프로젝트가 없습니다.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                >
                  <Card className="group overflow-hidden bg-card border-border hover:border-[#ECD06F]/50 transition-all duration-300">
                    <motion.a
                      href={project.detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <motion.img
                          src={project.thumbnail_url}
                          alt={`${project.title} 썸네일`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#ECD06F] rounded-full p-3"
                            whileHover={{ scale: 1.1 }}
                          >
                            <ExternalLink className="h-6 w-6 text-background" />
                          </motion.div>
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-[#ECD06F] transition-colors">
                            {project.title}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-[#ECD06F] transition-colors" />
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack?.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${getTechStackColor(tech)}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </motion.a>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.a
                href="#/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#ECD06F] text-background rounded-lg font-semibold hover:bg-[#ECD06F]/90 transition-all duration-300 shadow-lg shadow-[#ECD06F]/20"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 208, 111, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                더보기
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
