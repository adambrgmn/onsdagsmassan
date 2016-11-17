import React from 'react';
import { responsiveImg } from '../../styles/shared';

export default (props) => (<img {...props} className={`${responsiveImg} ${props.className}`} />);
