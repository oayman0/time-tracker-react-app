
import LandingNavBar from '../components/LandingNavBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';


function LandingPage() {
  return (
    <>
    <LandingNavBar/>
      <main>
        <Hero/>
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
