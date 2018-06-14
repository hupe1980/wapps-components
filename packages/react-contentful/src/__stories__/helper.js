import React from 'react';
import Contentful from '../Contentful';

const accessToken = process.env.REACT_CONTENTFUL_ACCESS_TOKEN;
const space = process.env.REACT_CONTENTFUL_SPACE;

export const Api = ({ children }) => (
  <Contentful space={space} accessToken={accessToken}>
    {children}
  </Contentful>
);
