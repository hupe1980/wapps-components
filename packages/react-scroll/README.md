# react-scroll

[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

> React scroll compoment

## Installation

```bash
npm install --save @wapps/react-scroll
```

## How to use

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

## License

[MIT](../../LICENSE)
