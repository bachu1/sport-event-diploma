import * as React from 'react';
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";
import './index.scss';
import {Button, TextField} from "@material-ui/core";

export const LoginScene = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({email: '', password: ''});

  useEffect(() => {
    message(error);
    clearError()
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      const {token, userId} = data;
      auth.login(token, userId);
    } catch (e) {
    }
  };
  return (
    <div className='login-main'>
      <h3 className='title'>Login</h3>
      <TextField
        variant="outlined"
        required
        className='item'
        name='email'
        onChange={changeHandler}
        value={form.email}
        label='Email'>
      </TextField>
      <TextField
        variant="outlined"
        required
        type='password'
        className='item'
        name='password'
        onChange={changeHandler}
        value={form.password}
        label='Password'>
      </TextField>
      <Button disabled={!form.email || !form.password || loading} onClick={loginHandler} variant="outlined" color="primary">
        Login
      </Button>
    </div>
  )
};
