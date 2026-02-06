import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Figma,
  PenTool,
  ImageIcon,
  Layout,
  Globe,
  FileCode,
  Code,
  GitBranch,
  User,
  GraduationCap,
  Briefcase
} from 'lucide-react';

/**
 * AboutPage 컴포넌트
 * About Me 페이지 - Context와 연동된 편집 가능한 페이지
 *
 * Props:
 * 없음 - About Me 페이지 컴포넌트
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const {
    aboutMeData,
    updateSection,
    updateBasicInfo,
    updateSkill,
    addSkill,
    removeSkill,
    getSkillsByCategory
  } = usePortfolio();

  const [editingSection, setEditingSection] = useState(null);
  const [editingBasicInfo, setEditingBasicInfo] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Design', icon: 'Code' });
  const [showAddSkill, setShowAddSkill] = useState(false);

  // 아이콘 매핑
  const iconMap = {
    Figma, PenTool, ImageIcon, Layout, Globe, FileCode, Code, GitBranch
  };

  const getIcon = (iconName) => {
    return iconMap[iconName] || Code;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="flex-1 pt-20">
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-[#FFF9E6] to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 페이지 헤더 */}
            <motion.div className="text-center" variants={itemVariants}>
              <p className="text-[#5BA4C9] text-sm font-medium tracking-widest uppercase mb-2">
                About Me
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                나에 대해 <span className="text-[#E6B800]">알아보기</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                아래 내용을 수정하면 홈 탭에 실시간으로 반영됩니다.
              </p>
            </motion.div>

            {/* 기본 정보 카드 */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-gray-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#FFF3B0]/50 to-[#A8D8EA]/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <User className="w-5 h-5 text-[#5BA4C9]" />
                      기본 정보
                    </CardTitle>
                    {!editingBasicInfo ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingBasicInfo(true)}
                        className="text-[#5BA4C9] hover:bg-[#A8D8EA]/20"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        수정
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingBasicInfo(false)}
                          className="text-green-600 hover:bg-green-50"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          저장
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingBasicInfo(false)}
                          className="text-gray-500 hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 프로필 이미지 */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF3B0]/30 to-[#A8D8EA]/30 shadow-md">
                        <img
                          src={aboutMeData.basicInfo.photo}
                          alt="프로필"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* 정보 필드 */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground flex items-center gap-1">
                          <User className="w-3 h-3" /> 이름
                        </Label>
                        {editingBasicInfo ? (
                          <Input
                            value={aboutMeData.basicInfo.name}
                            onChange={(e) => updateBasicInfo({ name: e.target.value })}
                            className="bg-gray-50"
                          />
                        ) : (
                          <p className="font-medium">{aboutMeData.basicInfo.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" /> 학력
                        </Label>
                        {editingBasicInfo ? (
                          <Input
                            value={aboutMeData.basicInfo.education}
                            onChange={(e) => updateBasicInfo({ education: e.target.value })}
                            className="bg-gray-50"
                          />
                        ) : (
                          <p className="font-medium">{aboutMeData.basicInfo.education}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> 전공
                        </Label>
                        {editingBasicInfo ? (
                          <Input
                            value={aboutMeData.basicInfo.major}
                            onChange={(e) => updateBasicInfo({ major: e.target.value })}
                            className="bg-gray-50"
                          />
                        ) : (
                          <p className="font-medium">{aboutMeData.basicInfo.major}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> 경력
                        </Label>
                        {editingBasicInfo ? (
                          <Input
                            value={aboutMeData.basicInfo.experience}
                            onChange={(e) => updateBasicInfo({ experience: e.target.value })}
                            className="bg-gray-50"
                          />
                        ) : (
                          <p className="font-medium">{aboutMeData.basicInfo.experience}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 섹션들 */}
            {aboutMeData.sections.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Card className="bg-white border-gray-100 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-foreground">
                          {section.title}
                        </CardTitle>
                        <button
                          onClick={() => updateSection(section.id, { showInHome: !section.showInHome })}
                          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
                            section.showInHome
                              ? 'bg-[#A8D8EA]/30 text-[#5BA4C9]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                          title={section.showInHome ? '홈에 표시됨' : '홈에 숨김'}
                        >
                          {section.showInHome ? (
                            <>
                              <Eye className="w-3 h-3" /> 홈 표시
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" /> 홈 숨김
                            </>
                          )}
                        </button>
                      </div>
                      {editingSection !== section.id ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSection(section.id)}
                          className="text-[#5BA4C9] hover:bg-[#A8D8EA]/20"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          수정
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSection(null)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            저장
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSection(null)}
                            className="text-gray-500 hover:bg-gray-100"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingSection === section.id ? (
                      <Textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, { content: e.target.value })}
                        rows={5}
                        className="bg-gray-50"
                        placeholder="내용을 입력하세요..."
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content || '내용을 입력해주세요.'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* 스킬 섹션 */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-gray-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#FFF3B0]/50 to-[#A8D8EA]/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#E6B800]" />
                      스킬
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddSkill(!showAddSkill)}
                      className="text-[#E6B800] hover:bg-[#FFF3B0]/50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      스킬 추가
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* 스킬 추가 폼 */}
                  {showAddSkill && (
                    <motion.div
                      className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">스킬 이름</Label>
                          <Input
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            placeholder="예: TypeScript"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">레벨 ({newSkill.level}%)</Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={newSkill.level}
                            onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                            className="w-full mt-3 accent-[#E6B800]"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">카테고리</Label>
                          <select
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                            className="w-full mt-1 p-2 bg-white border rounded-md"
                          >
                            <option value="Design">Design</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Tools">Tools</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={() => {
                              if (newSkill.name) {
                                addSkill(newSkill);
                                setNewSkill({ name: '', level: 50, category: 'Design', icon: 'Code' });
                                setShowAddSkill(false);
                              }
                            }}
                            className="bg-[#E6B800] hover:bg-[#D4A800] text-white"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            추가
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 카테고리별 스킬 표시 */}
                  {Object.entries(getSkillsByCategory).map(([category, skills]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          category === 'Design' ? 'bg-[#E6B800]' : 'bg-[#5BA4C9]'
                        }`} />
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {skills.map((skill) => {
                          const Icon = getIcon(skill.icon);
                          return (
                            <div key={skill.id} className="group">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <Icon className={`w-4 h-4 ${
                                    category === 'Design' ? 'text-[#E6B800]' : 'text-[#5BA4C9]'
                                  }`} />
                                  {editingSkill === skill.id ? (
                                    <Input
                                      value={skill.name}
                                      onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                                      className="h-7 w-32 text-sm"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium">{skill.name}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {editingSkill === skill.id ? (
                                    <>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={skill.level}
                                        onChange={(e) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                                        className="w-24 accent-[#E6B800]"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingSkill(null)}
                                        className="h-7 text-green-600"
                                      >
                                        <Save className="w-3 h-3" />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <span className={`text-sm font-semibold ${
                                        category === 'Design' ? 'text-[#E6B800]' : 'text-[#5BA4C9]'
                                      }`}>
                                        {skill.level}%
                                      </span>
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditingSkill(skill.id)}
                                          className="h-7 w-7 p-0 text-gray-400 hover:text-[#5BA4C9]"
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeSkill(skill.id)}
                                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${
                                    category === 'Design'
                                      ? 'bg-gradient-to-r from-[#FFF3B0] to-[#FFE566]'
                                      : 'bg-gradient-to-r from-[#A8D8EA] to-[#7CC4E4]'
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* 안내 메시지 */}
            <motion.div
              className="text-center p-4 bg-[#A8D8EA]/20 rounded-lg border border-[#A8D8EA]/30"
              variants={itemVariants}
            >
              <p className="text-sm text-muted-foreground">
                💡 <strong>팁:</strong> 여기서 수정한 내용은 홈 탭의 About Me 섹션과 스킬 섹션에 실시간으로 반영됩니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
