import * as React from 'react';
import './index.scss';
import {TextField, TextareaAutosize} from '@material-ui/core';
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import ImageUploader from 'react-images-upload';
import 'react-datepicker/dist/react-datepicker.css';
import Button from "@material-ui/core/Button";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {SPORT_CATEGORIES} from '../../__mock/categories';

const DEFAULT_FORM = {title: '', description: '', date: new Date(), image: null};

export const CreateScene = () => {

  const [form, setForm] = useState({...DEFAULT_FORM});
  const {loading} = useHttp();
  const message = useMessage();

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  const onDrop = (img) => {
    setForm({...form, image: img})
  };

  const onSelectType = type => {
    setForm({...form, type})
  };

  const onCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('description', form.description);
      formData.append('image', form.image[0]);
      formData.append('title', form.title);
      formData.append('date', form.date);
      formData.append('type', form.type);
      await fetch('/api/posts/create', {method: 'POST', body: formData});
      message('Created');
      setForm({...DEFAULT_FORM});
    } catch (e) {
    }
  };

  return (
    <div className='create-scene'>
      <h3>Create Post</h3>
      <div className='type-picker item'>
        <div className="dropdown">
          <TextField
            variant='outlined'
            required
            className='item'
            name='title'
            onChange={changeHandler}
            value={form.type || `Choose Type`}
            label='Post type'>
          </TextField>
          <div className="dropdown-content">
            {SPORT_CATEGORIES.map(item => (
              <span key={item.id} onClick={() => onSelectType(item.code)}>{item.code}</span>
            ))}
          </div>
        </div>
      </div>
      <TextField
        variant='outlined'
        required
        className='item'
        name='title'
        onChange={changeHandler}
        value={form.title}
        label='Title'>
      </TextField>
      <TextareaAutosize
        variant='outlined'
        rowsMin={8}
        required
        className='item'
        name='description'
        placeholder='Description'
        onChange={changeHandler}
        value={form.description}>
      </TextareaAutosize>
      <div className='date-picker'>
        <span>Post Date</span>
        <DatePicker
          selected={form.date}
          onChange={date => setForm({...form, date})}
        />
      </div>
      <div className='image-uploader'>
        <ImageUploader
          withIcon={true}
          buttonText='Choose image'
          onChange={onDrop}
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
        />
      </div>
      <Button disabled={!form.type || !form.title || !form.image || loading} onClick={onCreate} variant="outlined"
              color="primary">
        Create
      </Button>
    </div>
  )
};
