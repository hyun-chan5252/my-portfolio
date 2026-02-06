import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Sparkles, Figma, BookOpen, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/**
 * AboutMeSection 컴포넌트
 *
 * Props:
 * 없음 - About Me 섹션 표시 컴포넌트
 * Context API를 통해 데이터를 받아옴
 *
 * Example usage:
 * <AboutMeSection />
 */
function AboutMeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { getHomeData } = usePortfolio();

  const { content, skills, basicInfo } = getHomeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const highlights = [
    { icon: Code, text: 'Coding', color: '#5BA4C9' },
    { icon: Sparkles, text: 'AI', color: '#E6B800' },
    { icon: Figma, text: 'Figma', color: '#E6B800' },
    { icon: BookOpen, text: '배움', color: '#5BA4C9' }
  ];

  // 첫 번째 섹션 콘텐츠 (나의 개발 스토리) 가져오기
  const devStory = content.find(item => item.id === 'dev-story');
  const philosophy = content.find(item => item.id === 'philosophy');

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#F8FCFD]"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* 왼쪽: 프로필 이미지 + 기본 정보 카드 */}
          <motion.div
            className="flex flex-col items-center lg:items-end gap-6"
            variants={leftVariants}
          >
            <div className="relative">
              {/* 장식 요소들 */}
              <motion.div
                className="absolute -top-4 -left-4 w-full h-full border-2 border-[#FFF3B0] rounded-2xl"
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#A8D8EA] rounded-2xl"
                animate={{ rotate: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />

              {/* 프로필 이미지 컨테이너 */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#FFF3B0]/30 to-[#A8D8EA]/30 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={basicInfo.photo}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 플로팅 뱃지들 */}
              {highlights.map((item, index) => {
                const Icon = item.icon;
                const positions = [
                  'top-0 -right-8',
                  '-bottom-4 left-8',
                  'top-1/2 -left-12',
                  'bottom-8 -right-10'
                ];
                return (
                  <motion.div
                    key={item.text}
                    className={`absolute ${positions[index]} hidden md:flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-lg border border-gray-100`}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                    <span className="text-xs font-medium text-foreground">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* 기본 정보 카드 */}
            <motion.div
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-64 md:w-80"
              variants={leftVariants}
            >
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">이름</span>
                  <span className="font-medium text-foreground">{basicInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">학력</span>
                  <span className="font-medium text-foreground">{basicInfo.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">전공</span>
                  <span className="font-medium text-foreground">{basicInfo.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">경력</span>
                  <span className="font-medium text-[#E6B800]">{basicInfo.experience}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 오른쪽: 자기소개 텍스트 */}
          <motion.div
            className="space-y-6"
            variants={rightVariants}
          >
            {/* 섹션 타이틀 */}
            <div>
              <motion.p
                className="text-[#5BA4C9] text-sm font-medium tracking-widest uppercase mb-2"
                variants={rightVariants}
              >
                About Me
              </motion.p>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                variants={rightVariants}
              >
                안녕하세요,{' '}
                <span className="text-[#E6B800]">신입 UX/UI 디자이너</span>
                입니다.
              </motion.h2>
            </div>

            {/* 자기소개 본문 - Context에서 가져온 데이터 사용 */}
            <motion.div
              className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-4"
              variants={rightVariants}
            >
              {devStory && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{devStory.title}</h3>
                  <p>{devStory.summary}</p>
                </div>
              )}
              {philosophy && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{philosophy.title}</h3>
                  <p>{philosophy.summary}</p>
                </div>
              )}
            </motion.div>

            {/* 주요 스킬 4개 아이콘 */}
            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              variants={rightVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#FFF3B0] hover:bg-[#FFF3B0]/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs text-[#E6B800]">{skill.level}%</span>
                </motion.div>
              ))}
            </motion.div>

            {/* 더 알아보기 버튼 */}
            <motion.div
              variants={rightVariants}
              className="pt-4"
            >
              <Link to="/about">
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFF3B0] text-[#333] font-semibold rounded-lg hover:bg-[#FFE566] transition-colors shadow-md"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  더 알아보기
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutMeSection;
