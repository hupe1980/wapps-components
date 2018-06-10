import React from 'react';
import State from './State';
import Store from './Store';

const withState = initialState => {
  const store = new Store(initialState);

  return storyFn => context => (
    <State store={store} storyFn={storyFn} context={{ ...context, store }} />
  );
};

export default withState;
