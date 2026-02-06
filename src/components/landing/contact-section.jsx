import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { supabase } from '../../lib/supabase';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  Building2,
  Loader2
} from 'lucide-react';

/**
 * ContactSection 컴포넌트
 * Contact 섹션 - 연락처 정보와 방명록을 포함
 *
 * Props:
 * @param {string} email - 이메일 주소 [Optional, 기본값: 'contact@example.com']
 * @param {string} location - 위치 정보 [Optional, 기본값: 'Seoul, Korea']
 * @param {object} socialLinks - SNS 링크 객체 [Optional]
 *
 * Example usage:
 * <ContactSection email="hello@example.com" />
 */
function ContactSection({
  email = 'contact@example.com',
  location = 'Seoul, Korea',
  socialLinks = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
}) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    authorName: '',
    message: '',
    organization: '',
    email: '',
    isEmailPublic: false
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetchGuestbook();
  }, []);

  const fetchGuestbook = async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('portfolio_guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (fetchError) throw fetchError;
      setEntries(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('portfolio_guestbook')
        .insert([{
          author_name: formData.authorName,
          message: formData.message,
          organization: formData.organization || null,
          email: formData.email || null,
          is_email_public: formData.isEmailPublic
        }]);

      if (insertError) throw insertError;

      setSubmitSuccess(true);
      setFormData({
        authorName: '',
        message: '',
        organization: '',
        email: '',
        isEmailPublic: false
      });
      fetchGuestbook();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || '?';

  const getAvatarColor = (name) => {
    const colors = [
      'bg-[#ECD06F]', 'bg-[#2779a7]', 'bg-emerald-500', 'bg-purple-500',
      'bg-pink-500', 'bg-cyan-500', 'bg-amber-500', 'bg-rose-500'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const socialButtons = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: socialLinks.twitter, label: 'Twitter' }
  ].filter(item => item.href);

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30"
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
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            연락 <span className="text-[#ECD06F]">&</span> 방명록
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            궁금한 점이 있으시거나 연락이 필요하시면 아래 연락처로 문의해주세요.
            방명록도 남겨주시면 감사하겠습니다!
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8 max-w-6xl mx-auto">
          {/* 왼쪽: 연락처 & 폼 */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* 연락처 카드 */}
            <Card className="bg-gradient-to-br from-[#ECD06F] to-[#2779a7] text-white border-0 overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#contactGrid)" />
                </svg>
              </div>

              <CardHeader className="relative">
                <CardTitle className="text-xl">연락처</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="hover:underline text-sm font-medium"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Location</p>
                    <p className="text-sm font-medium">{location}</p>
                  </div>
                </div>

                {socialButtons.length > 0 && (
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs text-white/70 mb-3">소셜 미디어</p>
                    <div className="flex gap-2">
                      {socialButtons.map((item) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="p-2.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 방명록 작성 폼 */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">방명록 작성</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20">
                    {error}
                  </div>
                )}

                {submitSuccess && (
                  <motion.div
                    className="mb-4 p-3 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm border border-emerald-500/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    방명록이 성공적으로 등록되었습니다!
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="authorName" className="text-foreground">이름 *</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      required
                      placeholder="이름을 입력하세요"
                      className="bg-muted border-border focus:border-[#ECD06F] focus:ring-[#ECD06F]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-foreground">소속 (선택)</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="회사, 학교 등"
                      className="bg-muted border-border focus:border-[#ECD06F] focus:ring-[#ECD06F]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">이메일 (선택)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일 주소"
                      className="bg-muted border-border focus:border-[#ECD06F] focus:ring-[#ECD06F]/20"
                    />
                  </div>

                  {formData.email && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isEmailPublic"
                        name="isEmailPublic"
                        checked={formData.isEmailPublic}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-border bg-muted accent-[#ECD06F]"
                      />
                      <Label htmlFor="isEmailPublic" className="text-sm text-muted-foreground">
                        이메일 공개
                      </Label>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">메시지 *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="방명록에 남길 메시지를 작성해주세요."
                      className="bg-muted border-border focus:border-[#ECD06F] focus:ring-[#ECD06F]/20"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-[#ECD06F] hover:bg-[#ECD06F]/90 text-background font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          등록 중...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          방명록 남기기
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 오른쪽: 방명록 목록 */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                방명록 <span className="text-[#ECD06F]">({entries.length})</span>
              </h3>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-1/3" />
                            <div className="h-3 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-2/3" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : entries.length === 0 ? (
                <Card className="text-center py-12 bg-card border-border">
                  <CardContent>
                    <p className="text-muted-foreground">
                      아직 작성된 방명록이 없습니다.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      첫 번째 방명록을 남겨보세요!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Card className="bg-card border-border hover:border-[#ECD06F]/30 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <Avatar className={`${getAvatarColor(entry.author_name)} text-background`}>
                              <AvatarFallback className="bg-transparent font-semibold">
                                {getInitial(entry.author_name)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-foreground">
                                  {entry.author_name}
                                </span>
                                {entry.organization && (
                                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                    <Building2 className="h-3 w-3" />
                                    {entry.organization}
                                  </span>
                                )}
                              </div>

                              <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words mb-2">
                                {entry.message}
                              </p>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <span>{formatDate(entry.created_at)}</span>
                                {entry.is_email_public && entry.email && (
                                  <a
                                    href={`mailto:${entry.email}`}
                                    className="inline-flex items-center gap-1 text-[#2779a7] hover:underline"
                                  >
                                    <Mail className="h-3 w-3" />
                                    {entry.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
