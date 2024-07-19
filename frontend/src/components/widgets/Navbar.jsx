import React, { useEffect } from 'react';
import './css/Navbar.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset, checkUserRestaurant } from '../../features/auth/authSlice'


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth);
  const { restaurantId } = useSelector(
    (state) => state.auth
  );
  var isRestaurantPage = false;


  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/home")
  }
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    dispatch(checkUserRestaurant())
  }, [dispatch, navigate]);
  return (

    <nav className={`navbar ${isRestaurantPage ? 'scrolled' : ''}`}>
      <NavLink to={`/`} activeclassname="active-link"><p className="logo">Ikaly</p></NavLink>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul className="nav__links">

        <li className="nav-items"><NavLink to={`/`} activeclassname="active-link">Accueil</NavLink></li>
        <li className="nav-items"><NavLink to={`/restaurant/all`} activeclassname="active-link">Restaurants</NavLink></li>
        {user &&
          <>
            {restaurantId && <li className="nav-items"><NavLink to={`/dashboard/${restaurantId}`} activeclassname="active-link" >Dashboard</NavLink></li>}
            <li className="nav-items"><NavLink to={`/profile`} activeclassname="active-link">Profile</NavLink></li>
            <li className="nav-items"><NavLink to={"/"} activeclassname="active-link" onClick={handleLogout}>Logout</NavLink></li>
          </>
        }
      </ul>

    </nav>

  );
}

export default Navbar;
