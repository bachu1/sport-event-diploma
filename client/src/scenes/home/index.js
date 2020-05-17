import {SPORT_CATEGORIES} from '../../__mock/categories';
import HomeSlider from "../../components/home-slider";
import * as React from 'react';
import './index.scss';
import {useEffect} from "react";
import {useCallback} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useState} from "react";
import {Link} from 'react-router-dom';
import {Loader} from "../../components/loader";

const HomeScene = (props) => {

  const [postList, setPostList] = useState([]);

  const {request, loading} = useHttp();

  const getPostList = useCallback(async () => {
    const fetched = await request('/api/posts/list', 'GET', null);
    setPostList(fetched.list)
  }, [request]);

  useEffect(() => {
    getPostList()
  }, [getPostList]);

  return (
    <>
      <div className='home-page'>
        <HomeSlider/>
        <h1 className='title'>LAST NEWS AND EVENTS</h1>
        <div className='list-wrapper'>
          {
            !loading ? postList.map(item => (
                <div key={item._id} className='event-elem'>
                  <Link to={`/post/${item._id}`} className='router'>
                    <img src={`http://localhost:5000/` + item.imageUrl} alt=""/>
                    <span className='category-description'>{item.description}</span>
                  </Link>
                </div>
              ))
              :
              <div style={{display: 'flex', margin: 'auto'}}>
                <Loader/>
              </div>
          }
        </div>
      </div>
    </>
  );
};

export default HomeScene