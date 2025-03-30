
import React, { useEffect } from 'react';
import { Shield, Lock, KeyRound, AlertCircle, EyeOff, ServerCrash, FileCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';

const SecurityPage = () => {
  const { t } = useTranslation();
  
  // Ustawienie nagłówków bezpieczeństwa dla klienta
  useEffect(() => {
    // Ustawienie meta tagów związanych z bezpieczeństwem
    const metaTags = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'content-security-policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; connect-src 'self' https://*.supabase.co https://*.stripe.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';" }
    ];

    // Dodanie meta tagów
    metaTags.forEach(({ name, content }) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const tag = document.createElement('meta');
        tag.name = name;
        tag.content = content;
        document.head.appendChild(tag);
      }
    });

    return () => {
      // Usunięcie meta tagów przy odmontowaniu komponentu
      metaTags.forEach(({ name }) => {
        const tag = document.querySelector(`meta[name="${name}"]`);
        if (tag && tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('securityPage.title')}</h1>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              {t('securityPage.subtitle')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Shield className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">{t('securityPage.dataProtection.title')}</CardTitle>
                  </div>
                  <CardDescription>
                    {t('securityPage.dataProtection.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('securityPage.dataProtection.point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('securityPage.dataProtection.point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('securityPage.dataProtection.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <KeyRound className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">{t('securityPage.uniqueTokens.title')}</CardTitle>
                  </div>
                  <CardDescription>
                    {t('securityPage.uniqueTokens.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('securityPage.uniqueTokens.point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('securityPage.uniqueTokens.point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('securityPage.uniqueTokens.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur mb-12">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Lock className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-xl">{t('securityPage.dataSecuritySummary.title')}</CardTitle>
                </div>
                <CardDescription>
                  {t('securityPage.dataSecuritySummary.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('securityPage.dataSecuritySummary.whatData.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('securityPage.dataSecuritySummary.whatData.description')}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('securityPage.dataSecuritySummary.howWeUse.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('securityPage.dataSecuritySummary.howWeUse.description')}
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-muted-foreground">
                    <li>{t('securityPage.dataSecuritySummary.howWeUse.point1')}</li>
                    <li>{t('securityPage.dataSecuritySummary.howWeUse.point2')}</li>
                    <li>{t('securityPage.dataSecuritySummary.howWeUse.point3')}</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('securityPage.dataSecuritySummary.weDoNotShare.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('securityPage.dataSecuritySummary.weDoNotShare.description')}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">{t('securityPage.dataSecuritySummary.transmissionSecurity.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('securityPage.dataSecuritySummary.transmissionSecurity.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <EyeOff className="h-6 w-6 text-primary mr-2" />
                    <CardTitle className="text-lg">{t('securityPage.features.anonymity.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('securityPage.features.anonymity.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <ServerCrash className="h-6 w-6 text-primary mr-2" />
                    <CardTitle className="text-lg">{t('securityPage.features.encryption.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('securityPage.features.encryption.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-6 w-6 text-primary mr-2" />
                    <CardTitle className="text-lg">{t('securityPage.features.reporting.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('securityPage.features.reporting.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityPage;
