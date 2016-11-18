import React from 'react';
import { merge } from 'next/css';
import { responsiveImg } from '../../styles/shared';

export default (props) => (<img {...props} {...merge(responsiveImg, props.className)} />);
