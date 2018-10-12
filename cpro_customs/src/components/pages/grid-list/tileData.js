import alcohol from 'assets/categories/alcohol.png';
import logo from 'assets/categories/logo.png';
import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import CategoryButton from "../categories/CategoryButton";

export const tileData = [
    {
      img: alcohol,
      title: 'Alcohol',
      author: 'maria',
      cols: 2
    },
   {
       img: logo,
       title: 'Logo',
       author: 'maria',
       cols: 2
   },
];
