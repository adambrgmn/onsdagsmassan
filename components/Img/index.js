import React from 'react';
import { merge } from 'next/css';
import { responsiveImg } from '../../styles/shared';

const cloudinaryBaseUrl = 'https://res.cloudinary.com/adambrgmn/image/upload/onsdagsmassan/';

export default ({ src, className, ...other }) => (
  <img
    sizes="50vw"
    src={`${cloudinaryBaseUrl}${src}`}
    {...other}
    {...merge(responsiveImg, className)}
  />
);
