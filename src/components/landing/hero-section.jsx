import { motion } from 'framer-motion';

/**
 * HeroSection 컴포넌트
 *
 * Props:
 * 없음 - Hero 영역 표시 컴포넌트
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 기하학적 배경 패턴 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />

        {/* 기하학적 SVG 패턴 */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#ECD06F"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 떠다니는 기하학적 도형들 */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-[#ECD06F]/20 rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 border-2 border-[#2779a7]/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-[#ECD06F]/10 rotate-12"
          animate={{
            rotate: [12, -12, 12],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-20 h-20 border border-[#2779a7]/20"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* 골드 글로우 효과 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ECD06F]/5 rounded-full blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 서브 타이틀 */}
        <motion.p
          className="text-[#2779a7] text-sm md:text-base font-medium tracking-widest uppercase mb-4"
          variants={itemVariants}
        >
          UX/UI Designer & Front-end Developer
        </motion.p>

        {/* 메인 슬로건 */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          variants={itemVariants}
        >
          <span className="text-foreground">데이터로 </span>
          <span className="text-[#ECD06F]">설계</span>
          <span className="text-foreground">하고,</span>
          <br className="hidden sm:block" />
          <span className="text-foreground">AI로 </span>
          <span className="text-[#2779a7]">가속</span>
          <span className="text-foreground">하며,</span>
          <br className="hidden sm:block" />
          <span className="text-foreground">감성으로 </span>
          <span className="text-[#ECD06F]">완성</span>
          <span className="text-foreground">합니다.</span>
        </motion.h1>

        {/* 설명 텍스트 */}
        <motion.p
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          사용자 경험을 중심으로 디자인하고, 코드로 구현하는 디자이너입니다.
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 bg-[#ECD06F] text-[#0f172a] font-semibold rounded-lg hover:bg-[#ECD06F]/90 transition-all duration-300 shadow-lg shadow-[#ECD06F]/20"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 208, 111, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            프로젝트 보기
          </motion.a>
          <motion.a
            href="#about"
            className="px-8 py-3 border border-[#2779a7] text-[#2779a7] font-semibold rounded-lg hover:bg-[#2779a7]/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            About Me
          </motion.a>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-[#ECD06F]/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-[#ECD06F] rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
