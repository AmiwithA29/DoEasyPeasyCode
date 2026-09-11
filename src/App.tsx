import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Demo from '@/components/Demo';
import VideoShorts from '@/components/VideoShorts';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <Demo />
      <VideoShorts />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
