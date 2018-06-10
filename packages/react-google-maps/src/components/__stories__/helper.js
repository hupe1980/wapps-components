import React from 'react';

import GoogleMaps from '../GoogleMaps';

const apiKey = process.env.REACT_GOOGLE_MAPS_API_KEY;

const styles = {
  removeRestorePanel: {
    position: 'absolute',
    top: '10px',
    left: '25%',
    zIndex: '5',
    backgroundColor: '#fff',
    padding: '5px',
    border: '1px solid #999',
    textAlign: 'center',
    fontFamily: 'Roboto,sans-serif',
    lineHeight: '30px',
    paddingLeft: '10px',
  },
};

export const Api = ({ children }) => (
  <GoogleMaps api={{ key: apiKey }}>{children}</GoogleMaps>
);

export const Container = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
    }}
  >
    {children}
  </div>
);

export const RemoveRestorePanel = ({ onRemoveClick, onRestoreClick }) => (
  <div style={styles.removeRestorePanel}>
    <input onClick={onRemoveClick} type="button" value="Remove overlay" />
    <input onClick={onRestoreClick} type="button" value="Restore overlay" />
  </div>
);
