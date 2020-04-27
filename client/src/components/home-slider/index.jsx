import TableTennis from '../../images/slider/table-tennis.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Volleyball from '../../images/slider/volleyball.jpg';
import Basketball from '../../images/slider/basketball.jpg';
import Football from '../../images/slider/football.jpg';
import Chess from '../../images/slider/chess.jpeg';
import {Carousel} from 'react-responsive-carousel';
import * as React from 'react';

const HomeSlider = () => {
  return (
    <Carousel>
      <div>
        <img src={Football} alt=""/>
        <p className='legend'>Football</p>
      </div>
      <div>
        <img src={Volleyball} alt=""/>
        <p className='legend'>Volleyball</p>
      </div>
      <div>
        <img src={Basketball} alt=""/>
        <p className='legend'>Basketball</p>
      </div>
      <div>
        <img src={Chess} alt=""/>
        <p className='legend'>Chess</p>
      </div>
      <div>
        <img src={TableTennis} alt=""/>
        <p className='legend'>Table Tennis</p>
      </div>
    </Carousel>
  )
};

export default HomeSlider

