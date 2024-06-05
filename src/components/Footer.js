import logo from '../assets/images/logo.png';
import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer>
        <div className="footer">
          {/* <img src={logo} alt='Little Lemon Logo' /> */}
          <div className='footer-lists'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Menu</Link></li>
              <li><Link to="/">Login</Link></li>
            </ul>
            <ul>
              <li>Contact Info</li>
              <li>Time Tracker</li>
              <li>112 Nile Avenue, Zamalek Cairo, Egypt</li>
              <li>+20 101202564</li>
              <li>+20 245454611</li>
            </ul>
            <ul>
            <li>Social Links</li>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.threads.com/" target="_blank" rel="noopener noreferrer">Threads</a></li>
            <li><a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">Tiktok</a></li>
          </ul>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;