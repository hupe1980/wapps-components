# react-lex
This is a React Amazon Lex interface. It provides a chatbot UI component that can be integrated in your website. The interface allows to interact with a Lex bot directly from a browser using text.

## Installation
- `npm install --save @wapps/react-lex`

## Getting Started
```js
import React, { Component } from 'react';
import LexChat from '@wapps/react-lex';

class App extends Component {
  render() {
    return (
      <LexChat
        botName="BookTrip"
        identityPoolId="your pool id"
        initialText="Hello, what can I help you with?"
      />
    );
  }
}

export default App;
```

## Prerequisite
You must set up an AWS Cognito Federated Identity Pool and pass the IdentityPoolId as prop to the component. Make sure that access to unauthenticated identities is enabled and change the IAM roles to allow access to Amazon Lex by appending the AmazonLexRunBotsOnly and AmazonPollyReadOnlyAccess policies.

## Live Demo
For a demo, check out https://hupe1980.github.io/wapps-components/
