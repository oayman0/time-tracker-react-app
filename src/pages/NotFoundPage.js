import Footer from "../components/Footer";
import LandingNavBar from "../components/LandingNavBar";
import SimpleNavBar from "../components/SimpleNavBar";
import NotFound from "../components/NotFound";

function NotFoundPage (){
    return(
        <>
        {/* <LandingNavBar/> */}
        <SimpleNavBar/>
        <NotFound/>
        <Footer/>
        </>
    )
}
export default NotFoundPage;