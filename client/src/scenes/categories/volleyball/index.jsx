import * as React from "react";
import {VOLLEYBALL_EVENTS} from "../../../__mock/categories";

export const Volleyball = () => {
  return (
    <div className='main-basketball'>
      <h1 className='title'>Volleyball Events and News</h1>
      <div className='list'>
        {VOLLEYBALL_EVENTS.map(item => (
          <div key={item.id} className='item-block'>
            <img src={item.img} alt=""/>
            <span className='item-description'>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
};
