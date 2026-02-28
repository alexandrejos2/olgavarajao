
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
    <div className="font-sans text-slate-900 bg-gray-50 selection:bg-primary-100 selection:text-primary-900">
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
