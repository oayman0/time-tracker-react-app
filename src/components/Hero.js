import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero.png'
const Hero = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-info">
                    <h1>Pomify</h1>
                    <h2>Be focused.</h2>
                    <p>Boost your productivity with Pomify, the perfect blend of a Pomodoro timer and task manager. Stay focused, manage tasks effortlessly, and track your progress, all in one intuitive app. Achieve more with Pomify!</p>
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