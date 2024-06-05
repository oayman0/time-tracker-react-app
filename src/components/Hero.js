import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero.png'
const Hero = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-info">
                    <h1>Time Tracker</h1>
                    <h2>Be focused.</h2>
                    <p>Focus To-Do is an easy-to-use time and task management application that helps you to manage tasks anywhere and anytime, and helps you to perform tasks efficiently. Millions of users around the world use our application and have gained efficiency.</p>
                    <Link to="/app">
                        <button aria-label="Get Started">Get Started</button>
                    </Link>
                </div>
                <img src={heroImage} alt='Mobile and Laptop' />
            </section>
        </>
    )
}
export default Hero;