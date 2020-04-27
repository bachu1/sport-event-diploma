import * as React from "react";
import {CHESS_EVENTS} from "../../../__mock/categories";

export const Chess = () => {
  return (
    <div className='main-basketball'>
      <h1 className='title'>Chess Events and News</h1>
      <div className='list'>
        {CHESS_EVENTS.map(item => (
          <div key={item.id} className='item-block'>
            <img src={item.img} alt=""/>
            <span className='item-description'>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
};
