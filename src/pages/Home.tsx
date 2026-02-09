import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { CuratedForRoles } from '@/sections/CuratedForRoles';
import { CollectionsSection } from '@/sections/Collections';
import { FeaturedModules } from '@/sections/FeaturedModules';
import { WhatYouGet } from '@/sections/WhatYouGet';
import { AboutAuthor } from '@/sections/AboutAuthor';
import { HowItWorks } from '@/sections/HowItWorks';
import { CTASection } from '@/sections/CTASection';

export function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Hero />
        <CuratedForRoles />
        <CollectionsSection />
        <FeaturedModules />
        <WhatYouGet />
        <AboutAuthor />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
