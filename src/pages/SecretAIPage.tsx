
import React from 'react';
import { Bot, Sparkles, ShieldCheck, Lightbulb, Users, Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SecretAIPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Bot className="h-10 w-10 text-primary mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">{t('secretAIPage.title')}</h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-12 text-center">
              {t('secretAIPage.subtitle')}
            </p>
            
            <Card className="border-accent/20 bg-card/40 backdrop-blur mb-12">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Sparkles className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-xl">{t('secretAIPage.whatIs.title')}</CardTitle>
                </div>
                <CardDescription>
                  {t('secretAIPage.whatIs.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {t('secretAIPage.whatIs.paragraph1')}
                </p>
                
                <p className="text-muted-foreground">
                  {t('secretAIPage.whatIs.paragraph2')}
                </p>
                
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>{t('secretAIPage.whatIs.listItem1')}</li>
                  <li>{t('secretAIPage.whatIs.listItem2')}</li>
                  <li>{t('secretAIPage.whatIs.listItem3')}</li>
                  <li>{t('secretAIPage.whatIs.listItem4')}</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <ShieldCheck className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">{t('secretAIPage.security.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t('secretAIPage.security.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.security.point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.security.point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.security.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">{t('secretAIPage.howItWorks.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t('secretAIPage.howItWorks.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">1</span>
                      <span>{t('secretAIPage.howItWorks.step1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">2</span>
                      <span>{t('secretAIPage.howItWorks.step2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">3</span>
                      <span>{t('secretAIPage.howItWorks.step3')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">4</span>
                      <span>{t('secretAIPage.howItWorks.step4')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Users className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">{t('secretAIPage.personalization.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t('secretAIPage.personalization.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.personalization.point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.personalization.point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.personalization.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-card/40 backdrop-blur hover:bg-card/60 transition-all">
                <CardHeader className="space-y-1">
                  <div className="flex items-center mb-2">
                    <Heart className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="text-xl">{t('secretAIPage.communication.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t('secretAIPage.communication.description')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.communication.point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.communication.point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/20 p-1 rounded text-primary mr-3 mt-0.5">✓</span>
                      <span>{t('secretAIPage.communication.point3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">{t('secretAIPage.cta.title')}</h2>
              <Link to="/survey">
                <Button className="btn-primary px-8 py-6 text-lg">
                  {t('secretAIPage.cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecretAIPage;
