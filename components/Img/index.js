import React from 'react';
import { merge } from 'next/css';
import { responsiveImg } from '../../styles/shared';

const cloudinaryBaseUrl = 'http://res.cloudinary.com/adambrgmn/image/upload/w_auto:100:600/onsdagsmassan/';

export default ({ src, className, ...other }) => (
  <img
    sizes="50vw"
    src={`${cloudinaryBaseUrl}${src}`}
    {...other}
    {...merge(responsiveImg, className)}
  />
);
