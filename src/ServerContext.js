import React from 'react';

export const serverUrl =
  process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

export default React.createContext(serverUrl);
