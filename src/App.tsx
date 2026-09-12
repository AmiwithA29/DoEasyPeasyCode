import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Demo from '@/components/Demo';
import VideoShorts from '@/components/VideoShorts';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

type Route = 'home' | 'signin' | 'signup';

function getRoute(): Route {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'signin') return 'signin';
  if (hash === 'signup') return 'signup';
  return 'home';
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'signin') return <SignIn />;
  if (route === 'signup') return <SignUp />;

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
