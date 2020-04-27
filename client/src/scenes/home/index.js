import {SPORT_CATEGORIES} from '../../__mock/categories';
import HomeSlider from "../../components/home-slider";
import * as React from 'react';
import './index.scss';
import {useEffect} from "react";
import {useCallback} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useState} from "react";

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

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <>
      <div className='home-page'>
        <HomeSlider/>
        <h1 className='title'>NEWS AND EVENTS</h1>
        {SPORT_CATEGORIES.map(item => (
          <div className='category-main' key={item.id}>
            <h3 className='category-name'>{item.name}</h3>
            <div className='category-wrapper'>
              {postList.map(category => (
                <div style={{display: 'flex'}} key={category._id}>
                  {category.type === item.code &&
                  <div key={category._id} className='category-block'>
                    <img src={`http://localhost:5000/` + category.imageUrl} alt=""/>
                    <span className='category-description'>{category.description}</span>
                  </div>
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScene