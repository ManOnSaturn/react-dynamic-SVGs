import React, { Component, useRef } from 'react';
import { FC } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Icon } from './Icon';
const roles = require('./roles.svg');
const schema = require('./schema.svg');

export const App: FC = () => {
  const reference = useRef(null);
  return (
    <div>
      <div className="icons" ref={reference}>
        <Icon
          src={roles}
          size="200px"
          colors={{
            active: { first: 'green', second: 'white' },
            hover: { first: 'red', second: 'yellow' },
          }}
        />
        {/* <Icon
          src={schema}
          colors={{
            active: { first: 'green', second: 'white' },
            hover: { first: 'red', second: 'yellow' },
          }}
          trigger={reference}
        /> */}
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
