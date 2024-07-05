
import LandingNavBar from '../components/LandingNavBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SimpleNavBar from '../components/SimpleNavBar';


function LandingPage() {
  return (
    <>
    <SimpleNavBar/>
    {/* <LandingNavBar/> */}
      <main>
        <Hero/>
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
