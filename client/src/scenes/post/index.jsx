import * as React from 'react';
import {useEffect} from "react";
import {useCallback} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useState} from "react";
import './index.scss';
import {Loader} from "../../components/loader";
import {useContext} from "react";
import {AuthContext} from "../../context/auth.context";

export const PostScene = props => {

  const auth = useContext(AuthContext);

  const [postDetails, setPostDetails] = useState(null);
  const {request, loading} = useHttp();

  const getPostDetails = useCallback(async () => {
    const id = props.match.params.id;
    const fetched = await request(`/api/posts/${id}`, 'GET', null);
    setPostDetails(fetched.post)
  }, [request]);

  useEffect(() => {
    getPostDetails()
  }, [getPostDetails]);

  const confirmDelete = async () => {
    const isConfirm = window.confirm('Are you sure for delete');
    if (isConfirm) {
      const id = props.match.params.id;
      const fetched = await request(`/api/posts/${id}`, 'DELETE', null);
      props.history.goBack();
    }
  };

  const onEdit = () => {
    const id = props.match.params.id;
    props.history.push(`/edit/${id}`);
  };

  return (
    <div className='post-main'>
      {!postDetails ?
        <div style={{display: 'flex', margin: '100px auto'}}>
          <Loader/>
        </div>
        :
        <>
          <span className='title'>{postDetails && postDetails.title}</span>
          <div className='about-block'>
            <img src={`http://localhost:5000/` + postDetails.imageUrl} alt=""/>
            <div className='right-side'>
              <span className='date'>{new Date(Date.parse(postDetails.date)).toUTCString().replace('GMT', '')}</span>
              <span
                className='description'>{postDetails.description}</span>
            </div>
            {auth.isAuth &&
            <div className='actions'>
              <button className='delete' onClick={confirmDelete}>Delete</button>
              <button className='edit' onClick={onEdit}>Edit</button>
            </div>
            }
          </div>
        </>
      }
    </div>
  );

};