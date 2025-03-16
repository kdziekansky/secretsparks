
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StepsSection from '@/components/sections/StepsSection';
import ResearchSection from '@/components/sections/ResearchSection';
import ReportSection from '@/components/sections/ReportSection';

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      
      <main className="pb-12">
        <HeroSection />
        <div className="py-16 bg-[#0B0B0E]">
          <StepsSection />
        </div>
        
        <ResearchSection />
        <ReportSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
