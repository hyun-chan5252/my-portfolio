import { createContext, useContext, useState, useMemo, useCallback } from 'react';

/**
 * PortfolioContext
 * About Me 탭과 홈 탭 간의 데이터 연동을 위한 Context
 */
const PortfolioContext = createContext();

/**
 * PortfolioProvider 컴포넌트
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider>
 *   <App />
 * </PortfolioProvider>
 */
export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: {
      name: '홍길동',
      education: '서울대학교',
      major: 'UX/UI 디자인',
      experience: '신입',
      photo: '/profile.jpg'
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        content: '단순한 그래픽 작업을 넘어, 제품이 구현되는 원리(Coding)를 이해하고 최신 도구(AI)를 능숙하게 다루는 신입 디자이너입니다. Figma로 섬세한 UI를 설계하고, 일러스트와 포토샵으로 풍부한 비주얼을 만들며, AI를 활용해 창의적인 한계를 돌파합니다.',
        showInHome: true
      },
      {
        id: 'philosophy',
        title: '디자인 철학',
        content: '사용자 경험을 최우선으로 생각하며, 데이터 기반의 의사결정과 감성적인 디자인의 균형을 추구합니다. 배움에 주저함이 없는 태도로 조직의 디자인 효율을 높이는 데 기여하겠습니다.',
        showInHome: true
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        content: '새로운 기술을 배우는 것을 즐기며, 디자인과 개발의 경계를 넘나드는 것에 흥미를 느낍니다. 협업을 통해 더 좋은 결과물을 만들어내는 것을 좋아합니다.',
        showInHome: false
      }
    ],
    skills: [
      { id: 1, icon: 'Figma', name: 'Figma', level: 90, category: 'Design' },
      { id: 2, icon: 'PenTool', name: 'Illustrator', level: 85, category: 'Design' },
      { id: 3, icon: 'ImageIcon', name: 'Photoshop', level: 80, category: 'Design' },
      { id: 4, icon: 'Layout', name: 'Adobe XD', level: 75, category: 'Design' },
      { id: 5, icon: 'Globe', name: 'HTML/CSS', level: 85, category: 'Frontend' },
      { id: 6, icon: 'FileCode', name: 'JavaScript', level: 70, category: 'Frontend' },
      { id: 7, icon: 'Code', name: 'React', level: 65, category: 'Frontend' },
      { id: 8, icon: 'GitBranch', name: 'Git', level: 60, category: 'Frontend' }
    ]
  });

  // 섹션 업데이트 함수
  const updateSection = useCallback((sectionId, updates) => {
    setAboutMeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  }, []);

  // 기본 정보 업데이트 함수
  const updateBasicInfo = useCallback((updates) => {
    setAboutMeData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...updates }
    }));
  }, []);

  // 스킬 업데이트 함수
  const updateSkill = useCallback((skillId, updates) => {
    setAboutMeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === skillId ? { ...skill, ...updates } : skill
      )
    }));
  }, []);

  // 스킬 추가 함수
  const addSkill = useCallback((newSkill) => {
    setAboutMeData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...newSkill, id: Date.now() }]
    }));
  }, []);

  // 스킬 삭제 함수
  const removeSkill = useCallback((skillId) => {
    setAboutMeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== skillId)
    }));
  }, []);

  // 홈 탭용 데이터 자동 생성 (메모이제이션)
  const getHomeData = useMemo(() => {
    const homeContent = aboutMeData.sections
      .filter(section => section.showInHome)
      .map(section => ({
        id: section.id,
        title: section.title,
        summary: section.content.length > 100
          ? section.content.substring(0, 100) + '...'
          : section.content,
        fullContent: section.content
      }));

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4);

    return {
      content: homeContent,
      skills: topSkills,
      basicInfo: aboutMeData.basicInfo
    };
  }, [aboutMeData]);

  // 카테고리별 스킬 그룹화
  const getSkillsByCategory = useMemo(() => {
    const grouped = {};
    aboutMeData.skills.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [aboutMeData.skills]);

  const value = useMemo(() => ({
    aboutMeData,
    setAboutMeData,
    updateSection,
    updateBasicInfo,
    updateSkill,
    addSkill,
    removeSkill,
    getHomeData,
    getSkillsByCategory
  }), [
    aboutMeData,
    updateSection,
    updateBasicInfo,
    updateSkill,
    addSkill,
    removeSkill,
    getHomeData,
    getSkillsByCategory
  ]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

/**
 * usePortfolio 훅
 * PortfolioContext에 접근하기 위한 커스텀 훅
 *
 * Example usage:
 * const { aboutMeData, getHomeData } = usePortfolio();
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export default PortfolioContext;
