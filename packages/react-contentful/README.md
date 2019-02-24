# react-contentful

[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

> React contentful components

## Installation

```bash
npm install --save @wapps/react-contentful
```

## How to use

```js
import React from 'react';
import Contentful, { Entries } from '@wapps/react-contentful';

const App = () => (
  <Contentful space="<your sapce>" accessToken="<your aceessToken>">
    <Entries query={{ content_type: 'category', limit: 5 }}>
      {({ entries }) => (
        <ul>
          {entries.map(({ fields }, i) => (
            <li key={i}>{fields.title}</li>
          ))}
        </ul>
      )}
    </Entries>
  </Contentful>
);

export default App;
```

## Live Demo

For a demo, check out https://hupe1980.github.io/wapps-components/

## License

[MIT](../../LICENSE)
