import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Logotype from '../components/Logotype';

storiesOf('Logotype', module)
  .add('plain', () => (
    <Logotype />
  ))
  .add('in container', () => (
    <div style={{ width: 200, margin: '0 auto'}}>
      <Logotype />
    </div>
  ));
