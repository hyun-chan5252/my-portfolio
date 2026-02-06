import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Sparkles, Figma, BookOpen } from 'lucide-react';

/**
 * AboutMeSection 컴포넌트
 *
 * Props:
 * 없음 - About Me 섹션 표시 컴포넌트
 *
 * Example usage:
 * <AboutMeSection />
 */
function AboutMeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          {/* 왼쪽: 프로필 이미지 */}
          <motion.div
            className="flex justify-center lg:justify-end"
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
                {/* 실제 프로필 이미지 */}
                <img
                  src="/profile.jpg"
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

            {/* 자기소개 본문 */}
            <motion.div
              className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-4"
              variants={rightVariants}
            >
              <p>
                단순한 그래픽 작업을 넘어, 제품이 구현되는 원리(
                <span className="highlight-text font-medium text-foreground">Coding</span>
                )를 이해하고 최신 도구(
                <span className="highlight-text font-medium text-foreground">AI</span>
                )를 능숙하게 다루는 신입 디자이너입니다.
              </p>
              <p>
                <span className="highlight-text font-medium text-foreground">Figma</span>
                로 섬세한 UI를 설계하고, 일러스트와 포토샵으로 풍부한 비주얼을 만들며,
                AI를 활용해 창의적인 한계를 돌파합니다.
              </p>
              <p>
                <span className="highlight-text font-medium text-foreground">배움</span>
                에 주저함이 없는 태도로 조직의 디자인 효율을 높이는 데 기여하겠습니다.
              </p>
            </motion.div>

            {/* 핵심 키워드 태그 */}
            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              variants={rightVariants}
            >
              {['UX/UI 디자인', '프론트엔드', 'AI 활용', '프로토타이핑'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-foreground hover:border-[#FFF3B0] hover:bg-[#FFF3B0]/20 transition-all duration-300 cursor-default shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutMeSection;
