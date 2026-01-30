import { useState, useEffect } from 'react';
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
      'React': 'bg-cyan-100 text-cyan-800',
      'TailwindCSS': 'bg-teal-100 text-teal-800',
      'Supabase': 'bg-emerald-100 text-emerald-800',
      'Vite': 'bg-purple-100 text-purple-800',
      'MUI': 'bg-blue-100 text-blue-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'Node.js': 'bg-green-100 text-green-800',
      'CSS3': 'bg-indigo-100 text-indigo-800',
      'HTML5': 'bg-orange-100 text-orange-800'
    };
    return colors[tech] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            직접 기획하고 개발한 프로젝트들입니다.
            각 프로젝트를 클릭하면 실제 사이트를 확인할 수 있습니다.
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
            프로젝트를 불러오는 중 오류가 발생했습니다: {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-muted-foreground">프로젝트 불러오는 중...</span>
          </div>
        ) : projects.length === 0 ? (
          <Card className="max-w-md mx-auto text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">
                등록된 프로젝트가 없습니다.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {projects.slice(0, 4).map((project) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <a
                    href={project.detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={project.thumbnail_url}
                        alt={`${project.title} 썸네일`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <ExternalLink className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech, index) => (
                          <span
                            key={index}
                            className={`px-2.5 py-1 text-xs font-medium rounded-full ${getTechStackColor(tech)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="#/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                더보기
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
