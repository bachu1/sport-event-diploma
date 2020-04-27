import {renderRoutes} from 'react-router-config';
import * as React from 'react';
import './index.scss'

const Categories = (props) => {
  return (
    <div className='categories-main'>
      {renderRoutes(props.route.routes)}
    </div>
  );
};

export default Categories
