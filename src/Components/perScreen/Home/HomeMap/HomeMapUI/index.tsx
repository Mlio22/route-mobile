import React from 'react';

import HomeMapTrackUser from './HomeMapTrackUser';
import HomeMapSettings from './HomeMapSettings';

const HomeMapUI = (props: any) => {
  const centerToUser = props.centerToUser;
  return (
    <>
      <HomeMapTrackUser centerToUser={centerToUser} />
      <HomeMapSettings />
    </>
  );
};

export default HomeMapUI;
