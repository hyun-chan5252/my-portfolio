import { useState, useEffect } from 'react';
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
      'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500',
      'bg-pink-500', 'bg-cyan-500', 'bg-slate-500', 'bg-amber-500'
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
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
            Contact
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            궁금한 점이 있으시거나 연락이 필요하시면 아래 연락처로 문의해주세요.
            방명록도 남겨주시면 감사하겠습니다!
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-blue-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-xl">연락처</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="hover:underline text-sm"
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
                    <p className="text-sm">{location}</p>
                  </div>
                </div>

                {socialButtons.length > 0 && (
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs text-white/70 mb-3">소셜 미디어</p>
                    <div className="flex gap-2">
                      {socialButtons.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="p-2.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <item.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">방명록 작성</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {submitSuccess && (
                  <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
                    방명록이 성공적으로 등록되었습니다!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="authorName">이름 *</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      required
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">소속 (선택)</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="회사, 학교 등"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 (선택)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일 주소"
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
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="isEmailPublic" className="text-sm text-muted-foreground">
                        이메일 공개
                      </Label>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">메시지 *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="방명록에 남길 메시지를 작성해주세요."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
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
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                방명록 ({entries.length})
              </h3>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
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
                <Card className="text-center py-12">
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
                  {entries.map((entry) => (
                    <Card
                      key={entry.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className={`${getAvatarColor(entry.author_name)} text-white`}>
                            <AvatarFallback className="bg-transparent">
                              {getInitial(entry.author_name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">
                                {entry.author_name}
                              </span>
                              {entry.organization && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  <Building2 className="h-3 w-3" />
                                  {entry.organization}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-foreground whitespace-pre-wrap break-words mb-2">
                              {entry.message}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span>{formatDate(entry.created_at)}</span>
                              {entry.is_email_public && entry.email && (
                                <a
                                  href={`mailto:${entry.email}`}
                                  className="inline-flex items-center gap-1 text-blue-600 hover:underline"
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
