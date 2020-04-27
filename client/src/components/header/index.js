import {SPORT_CATEGORIES} from '../../__mock/categories';
import {Link} from 'react-router-dom';
import * as React from 'react';
import './index.scss';
import Logo from '../../iaau-logo.png';
import {useContext} from "react";
import {AuthContext} from "../../context/auth.context";

export const HeaderComponent = () => {
  const auth = useContext(AuthContext);
  return (
    <div className='header-main'>
      <div className='header-block'>
        <span className='header-item'>
          <Link to={'/'}>
            <img className='logo' src={Logo} alt="Logo"/>
          </Link>
        </span>
        {SPORT_CATEGORIES.map(item => (
          <span key={item.id} className='header-item'>
              <Link key={item.id} to={item.url}>
                {item.name}</Link>
          </span>
        ))}
        <span className='header-item'>
          <Link to={'/application-submit'}>
            <button className='application-submit-button'>Application Form</button>
          </Link>
        </span>
        {auth.isAuth &&
        <span className='header-item'>
          <Link to={'/create'}>
            <button className='application-submit-button'>Create Post</button>
          </Link>
        </span>
        }
        {!auth.isAuth &&
        <span className='header-item'>
          <Link to={'/login'}>
            <button className='application-submit-button'>Login</button>
          </Link>
        </span>
        }
      </div>
    </div>
  );
};
