import * as React from "react";
import {FOOTBALL_EVENTS} from "../../../__mock/categories";
import './index.scss';

const Football = () => {
  return (
    <div className='main-basketball'>
      <h1 className='title'>Football Events and News</h1>
      <div className='list'>
        {FOOTBALL_EVENTS.map(item => (
          <div key={item.id} className='item-block'>
            <img src={item.img} alt=""/>
            <span className='item-description'>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Football
