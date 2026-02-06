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
      name: '유현지',
      education: 'OO대학교',
      major: '호텔조리/외식경영',
      experience: '1년차 / 신입',
      photo: '/profile.jpg'
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        content: '"망상에서 시작된 질문, 사용자 경험의 해답이 되다."\n\n저는 평소 다양한 콘텐츠를 접하며 "이 서비스는 왜 이런 구조를 선택했을까?", "나라면 이 인터페이스를 어떻게 바꿀까?"를 끊임없이 상상하고 망상하는 것을 즐겼습니다. 혼자만의 상상으로 그치던 생각들은 제가 디자이너가 되어야겠다고 결심한 가장 강력한 동기였습니다.\n\n지난 1년은 그 상상들을 현실로 구현하기 위해 디자인 원칙을 세우고, 코딩을 배우며, AI 툴로 아이디어를 시각화하는 법을 익히는 시간이었습니다. 이제 저의 즐거운 망상을 실제 사용자가 감동하는 정교한 UI/UX로 증명해 보이고 싶습니다.',
        showInHome: true
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        content: '디자인 트렌드는 매 순간 변하지만, 본질은 사용자에게 닿는 \'경험\'에 있다고 믿습니다. 1년의 집중적인 과정을 통해 UI/UX의 기초부터 웹 퍼블리싱까지 웹 디자인의 전 과정을 섭렵했습니다. 특히 AI를 디자인 워크플로우에 적극 도입하여 리서치와 에셋 제작 시간을 단축하고, 그만큼 사용자의 고민에 더 깊이 몰입하는 효율적인 크리에이터입니다.',
        showInHome: true
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        content: '애니메이션 보기를 좋아하고, 귀여운 것을 수집하기 좋아합니다. 어쩌면 제가 디자인을 사랑하게 된 이유일 수도 있겠습니다.',
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
