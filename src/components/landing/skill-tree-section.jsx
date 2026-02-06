import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Code, Figma, PenTool, ImageIcon, Layout, FileCode, GitBranch, Globe } from 'lucide-react';

/**
 * SkillTreeSection 컴포넌트
 *
 * Props:
 * 없음 - Skill Tree 섹션 표시 컴포넌트
 *
 * Example usage:
 * <SkillTreeSection />
 */
function SkillTreeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const designSkills = [
    { name: 'Figma', level: 90, icon: Figma },
    { name: 'Illustrator', level: 85, icon: PenTool },
    { name: 'Photoshop', level: 80, icon: ImageIcon },
    { name: 'Adobe XD', level: 75, icon: Layout }
  ];

  const codingSkills = [
    { name: 'HTML/CSS', level: 85, icon: Globe },
    { name: 'JavaScript', level: 70, icon: FileCode },
    { name: 'React', level: 65, icon: Code },
    { name: 'Git', level: 60, icon: GitBranch }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#F8FCFD] to-[#FFF9E6]"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#5BA4C9] text-sm font-medium tracking-widest uppercase mb-2">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            디자인과 <span className="text-[#E6B800]">코딩</span>을 함께
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            UX/UI 디자인 역량과 프론트엔드 개발 능력을 갖춰 디자인부터 구현까지 가능합니다.
          </p>
        </motion.div>

        {/* 스킬 그리드 */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Design Skills 카드 */}
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:border-[#FFF3B0] transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FFF3B0] flex items-center justify-center">
                <Palette className="w-6 h-6 text-[#E6B800]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Design Skills</h3>
                <p className="text-sm text-muted-foreground">디자인 도구</p>
              </div>
            </div>

            <div className="space-y-5">
              {designSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-[#E6B800] transition-colors" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[#E6B800] font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#FFF3B0] to-[#FFE566] rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.15, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Coding Skills 카드 */}
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:border-[#A8D8EA] transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#A8D8EA] flex items-center justify-center">
                <Code className="w-6 h-6 text-[#5BA4C9]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Coding Skills</h3>
                <p className="text-sm text-muted-foreground">개발 역량</p>
              </div>
            </div>

            <div className="space-y-5">
              {codingSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-[#5BA4C9] transition-colors" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[#5BA4C9] font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#A8D8EA] to-[#7CC4E4] rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.15, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* 추가 도구 태그들 */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-muted-foreground text-sm mb-4">그 외 사용 가능한 도구들</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Notion', 'Slack', 'Jira', 'ChatGPT', 'Midjourney', 'After Effects', 'Premiere Pro'].map((tool, index) => (
              <motion.span
                key={tool}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-muted-foreground hover:border-[#A8D8EA] hover:text-[#5BA4C9] hover:bg-[#A8D8EA]/10 transition-all duration-300 cursor-default shadow-sm"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.05 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillTreeSection;
