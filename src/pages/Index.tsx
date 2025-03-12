
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StepsSection from '@/components/sections/StepsSection';
import StatsSection from '@/components/sections/StatsSection';
import ResearchSection from '@/components/sections/ResearchSection';
import ReportSection from '@/components/sections/ReportSection';

const Index = () => {
  return (
    <div className="bg-[#05050a] text-foreground min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        
        <div className="section-container">
          <StepsSection />
          <StatsSection />
        </div>
        
        <ResearchSection />
        <ReportSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
