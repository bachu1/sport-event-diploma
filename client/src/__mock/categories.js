import FirstFootball from './football/thitd.jpg'
import SecondFootball from './football/second.jpg'
import ThirdFootball from './football/thitd.jpg'

import FirstChess from './chess/first.jpeg'
import SecondChess from './chess/second.jpg'
import ThirdChess from './chess/third.jpg'

import FirstVolleyball from './volleyball/first.jpg';
import SecondVolleyball from './volleyball/second.jpg';
import ThirdVolleyball from './volleyball/third.jpg';

import FirstTableTennis from './table-tennis/first.jpg';
import SecondTableTennis from './table-tennis/second.jpg';
import ThirdTableTennis from './table-tennis/third.jpg';

import FirstBasketball from './basketball/first.jpeg';
import SecondBasketball from './basketball/second.jpg';
import ThirdBasketball from './basketball/third.png';

export const SPORT_CATEGORIES = [
  {id: 1, name: 'Football', url: '/categories/football', code: 'football'},
  {id: 2, name: 'Volleyball', url: '/categories/volleyball', code: 'volleyball'},
  {id: 3, name: 'Chess', url: '/categories/chess', code: 'chess'},
  {id: 4, name: 'Table Tennis', url: '/categories/table-tennis', code: 'table-tennis'},
  {id: 5, name: 'Basketball', url: '/categories/basketball', code: 'basketball'},
];

export const FOOTBALL_EVENTS = [
  {id: 1, img: FirstFootball, description: 'First Football Event'},
  {id: 2, img: SecondFootball, description: 'Second Football Event'},
  {id: 3, img: ThirdFootball, description: 'Third Football Event'}
];

export const CHESS_EVENTS = [
  {id: 1, img: FirstChess, description: 'First Chess Event'},
  {id: 2, img: SecondChess, description: 'Second Chess Event'},
  {id: 3, img: ThirdChess, description: 'Third Chess Event'}
];

export const VOLLEYBALL_EVENTS = [
  {id: 1, img: FirstVolleyball, description: 'First Volleyball Event'},
  {id: 2, img: SecondVolleyball, description: 'Second Volleyball Event'},
  {id: 3, img: ThirdVolleyball, description: 'Third Volleyball Event'}
];

export const TABLE_TENNIS_EVENTS = [
  {id: 1, img: FirstTableTennis, description: 'First Table Tennis Event'},
  {id: 2, img: SecondTableTennis, description: 'Second Table Tennis Event'},
  {id: 3, img: ThirdTableTennis, description: 'Third Table Tennis Event'}
];

export const BASKETBALL_EVENTS = [
  {id: 1, img: FirstBasketball, description: 'First Basketball Event'},
  {id: 2, img: SecondBasketball, description: 'Second Basketball Event'},
  {id: 3, img: ThirdBasketball, description: 'Third Basketball Event'}
];

export const EVENT_STRATEGY = (key) => {
  const obj = {
    1: FOOTBALL_EVENTS,
    2: VOLLEYBALL_EVENTS,
    3: CHESS_EVENTS,
    4: TABLE_TENNIS_EVENTS,
    5: BASKETBALL_EVENTS,
  };
  return obj[key]
};
