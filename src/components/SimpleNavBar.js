import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
const SimpleNavBar = ()=>{

    return(
        <>
         <div className="navigation-bar">
                    <Link to='/'>
              <img
                src={Logo}
                height='40'
                className='d-inline-block align-top'
                alt='logo'
              />
            </Link>
        </div>
        </>
    )
}
export default SimpleNavBar;