import * as React from "react";
import {FOOTBALL_EVENTS} from "../../../__mock/categories";
import './index.scss';
import {useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {useCallback} from "react";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {Loader} from "../../../components/loader";

const Football = props => {

  const [postList, setPostList] = useState([]);
  const {request, loading} = useHttp();

  const getPostList = useCallback(async () => {
    const routeList = props.location.pathname.split('/');
    const type = routeList[routeList.length - 1];
    const fetched = await request(`/api/posts/by-type/${type}`, 'GET', null);
    setPostList(fetched.list)
  }, [request]);

  useEffect(() => {
    getPostList()
  }, []);

  return (
    <div className='main-basketball'>
      <h1 className='title'>Football Events and News</h1>
      <div className='list-wrapper'>
        {
          !loading ? postList.map(item => (
              <div key={item._id} className='event-elem'>
                <Link to={`/post/${item._id}`} className='router'>
                  <img src={`http://localhost:5000/` + item.imageUrl} alt=""/>
                  <span className='category-description'>{item.title}</span>
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
  )
};

export default Football
