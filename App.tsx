
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Awards from './components/Awards';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Services from './components/Services';
import Properties from './components/Properties';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sell' | 'buy'>('sell');

  return (
    <div className="font-sans text-slate-900 bg-[#fdf2f8] selection:bg-gold-500/30 selection:text-gold-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Awards />
        <Services activeTab={activeTab} setActiveTab={setActiveTab} />
        <WhyWorkWithMe />
        <Properties activeTab={activeTab} />
        <Testimonials />
        <FAQ />
        <Contact activeTab={activeTab} />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default App;
