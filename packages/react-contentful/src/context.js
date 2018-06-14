import React from 'react';

export const ContentfulContext = React.createContext(null);

export const withContentfulContext = Component => props => (
  <ContentfulContext.Consumer>
    {client => <Component client={client} {...props} />}
  </ContentfulContext.Consumer>
);
