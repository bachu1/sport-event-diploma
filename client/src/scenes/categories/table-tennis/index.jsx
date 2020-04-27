import * as React from "react";
import {TABLE_TENNIS_EVENTS} from "../../../__mock/categories";

export const TableTennis = () => {
  return (
    <div className='main-basketball'>
      <h1 className='title'>Table Tennis Events and News</h1>
      <div className='list'>
        {TABLE_TENNIS_EVENTS.map(item => (
          <div key={item.id} className='item-block'>
            <img src={item.img} alt=""/>
            <span className='item-description'>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
};
