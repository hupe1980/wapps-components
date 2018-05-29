# react-scroll
React scroll compoment

## Example
```js
import React from 'react';
import Scroll from '@wapps/react-scroll';

const App = messages => (
  <div style={{ overflow: 'scroll' }}>
    {messages.map((message, index) => (
      <Scroll key={index} behavior="smooth">
        {message}
      </Scroll>
    ))}
  </div>
);

export default App;
```

## Live Demo
For a demo, check out https://hupe1980.github.io/wapps-components/

## Installation
- `npm install --save @wapps/react-scroll`
