import HomeScene from "./scenes/home";
import Categories from "./scenes/categories";
import Football from "./scenes/categories/football";
import {Volleyball} from "./scenes/categories/volleyball";
import {Chess} from "./scenes/categories/chess";
import {TableTennis} from "./scenes/categories/table-tennis";
import {Basketball} from "./scenes/categories/basketball";
import ApplicationScene from "./scenes/application";
import {LoginScene} from "./scenes/login";
import React from "react";
import {Redirect} from "react-router-dom";
import {CreateScene} from "./scenes/create";

export const ROUTES = [
  {
    path: '/',
    component: HomeScene,
    exact: true
  },
  {
    check: (isLogged) => !isLogged,
    path: '/login',
    component: LoginScene,
    exact: true
  },
  {
    check: (isLogged) => isLogged,
    path: '/create',
    component: CreateScene,
    exact: true
  },
  {
    path: '/categories',
    component: Categories,
    routes: [
      {
        path: '/categories/football',
        component: Football,
        exact: true
      },
      {
        path: '/categories/volleyball',
        component: Volleyball,
        exact: true
      },
      {
        path: '/categories/chess',
        component: Chess,
        exact: true
      },
      {
        path: '/categories/table-tennis',
        component: TableTennis,
        exact: true
      },
      {
        path: '/categories/basketball',
        component: Basketball,
        exact: true
      }
    ]
  },
  {
    path: '/application-submit',
    component: ApplicationScene,
    exact: true
  },
  {
    path: '*',
    component: () => <Redirect to='/'/>
  }
];
