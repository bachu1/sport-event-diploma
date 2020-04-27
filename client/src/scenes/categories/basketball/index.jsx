import * as React from "react";
import {BASKETBALL_EVENTS} from '../../../__mock/categories'
import './index.scss'

export const Basketball = () => {
  return (
    <div className='main-basketball'>
      <h1 className='title'>Basketball Events and News</h1>
      <div className='list'>
        {BASKETBALL_EVENTS.map(item => (
          <div key={item.id} className='item-block'>
            <img src={item.img} alt=""/>
            <span className='item-description'>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
