
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

import { Male, Female, Sparkles, ScrollText, Scan } from 'lucide-react';

const SurveyConfig: React.FC = () => {
  const { 
    userGender, 
    setUserGender, 
    partnerGender, 
    setPartnerGender, 
    gameLevel, 
    setGameLevel, 
    completeConfiguration 
  } = useSurvey();
  
  const { t } = useTranslation();
  
  return (
    <div className="glass-panel w-full max-w-xl p-6 md:p-8 animate-slide-up">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-5">
          <Scan className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          {t('surveyConfig.title')}
        </h1>
        
        <div className="w-full space-y-8">
          {/* Wybór płci użytkownika */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {t('surveyConfig.userGender.title')}
            </h2>
            
            <RadioGroup 
              value={userGender} 
              onValueChange={(value) => setUserGender(value as 'male' | 'female')}
              className="flex space-x-4"
            >
              <div className="flex flex-col items-center space-y-2">
                <Label 
                  htmlFor="user-male" 
                  className={`
                    w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-pointer border
                    ${userGender === 'male' ? 'bg-blue-100 border-blue-400' : 'bg-card/30 border-transparent hover:bg-card/50'}
                  `}
                >
                  <Male className={`w-10 h-10 ${userGender === 'male' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                  <span className={userGender === 'male' ? 'font-medium text-blue-700' : 'text-muted-foreground'}>
                    {t('surveyConfig.userGender.male')}
                  </span>
                </Label>
                <RadioGroupItem value="male" id="user-male" className="sr-only" />
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Label 
                  htmlFor="user-female" 
                  className={`
                    w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-pointer border
                    ${userGender === 'female' ? 'bg-pink-100 border-pink-400' : 'bg-card/30 border-transparent hover:bg-card/50'}
                  `}
                >
                  <Female className={`w-10 h-10 ${userGender === 'female' ? 'text-pink-500' : 'text-muted-foreground'}`} />
                  <span className={userGender === 'female' ? 'font-medium text-pink-700' : 'text-muted-foreground'}>
                    {t('surveyConfig.userGender.female')}
                  </span>
                </Label>
                <RadioGroupItem value="female" id="user-female" className="sr-only" />
              </div>
            </RadioGroup>
          </div>
          
          {/* Wybór płci partnera/partnerki */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {t('surveyConfig.partnerGender.title')}
            </h2>
            
            <RadioGroup 
              value={partnerGender} 
              onValueChange={(value) => setPartnerGender(value as 'male' | 'female')}
              className="flex space-x-4"
            >
              <div className="flex flex-col items-center space-y-2">
                <Label 
                  htmlFor="partner-male" 
                  className={`
                    w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-pointer border
                    ${partnerGender === 'male' ? 'bg-blue-100 border-blue-400' : 'bg-card/30 border-transparent hover:bg-card/50'}
                  `}
                >
                  <Male className={`w-10 h-10 ${partnerGender === 'male' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                  <span className={partnerGender === 'male' ? 'font-medium text-blue-700' : 'text-muted-foreground'}>
                    {t('surveyConfig.partnerGender.male')}
                  </span>
                </Label>
                <RadioGroupItem value="male" id="partner-male" className="sr-only" />
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Label 
                  htmlFor="partner-female" 
                  className={`
                    w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-pointer border
                    ${partnerGender === 'female' ? 'bg-pink-100 border-pink-400' : 'bg-card/30 border-transparent hover:bg-card/50'}
                  `}
                >
                  <Female className={`w-10 h-10 ${partnerGender === 'female' ? 'text-pink-500' : 'text-muted-foreground'}`} />
                  <span className={partnerGender === 'female' ? 'font-medium text-pink-700' : 'text-muted-foreground'}>
                    {t('surveyConfig.partnerGender.female')}
                  </span>
                </Label>
                <RadioGroupItem value="female" id="partner-female" className="sr-only" />
              </div>
            </RadioGroup>
          </div>
          
          {/* Wybór poziomu gry */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {t('surveyConfig.gameLevel.title')}
            </h2>
            
            <RadioGroup 
              value={gameLevel} 
              onValueChange={(value) => setGameLevel(value as 'discover' | 'explore' | 'exceed')}
              className="space-y-3"
            >
              <div className="flex items-center">
                <RadioGroupItem value="discover" id="discover" className="mr-3" />
                <Label htmlFor="discover" className="flex-grow cursor-pointer">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                    <span className="font-medium">{t('surveyConfig.gameLevel.discover.title')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('surveyConfig.gameLevel.discover.description')}
                  </p>
                </Label>
              </div>
              
              <div className="flex items-center">
                <RadioGroupItem value="explore" id="explore" className="mr-3" />
                <Label htmlFor="explore" className="flex-grow cursor-pointer">
                  <div className="flex items-center">
                    <ScrollText className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="font-medium">{t('surveyConfig.gameLevel.explore.title')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('surveyConfig.gameLevel.explore.description')}
                  </p>
                </Label>
              </div>
              
              <div className="flex items-center">
                <RadioGroupItem value="exceed" id="exceed" className="mr-3" />
                <Label htmlFor="exceed" className="flex-grow cursor-pointer">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-red-500 mr-2" />
                    <span className="font-medium">{t('surveyConfig.gameLevel.exceed.title')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('surveyConfig.gameLevel.exceed.description')}
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <Button 
          onClick={completeConfiguration}
          className="mt-8 bg-primary text-white px-8 py-2 rounded-full hover:bg-primary/90 transition-colors"
          size="lg"
        >
          {t('surveyConfig.continueButton')}
        </Button>
      </div>
    </div>
  );
};

export default SurveyConfig;
