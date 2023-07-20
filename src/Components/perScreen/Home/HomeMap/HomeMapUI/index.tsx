import React from 'react';

import HomeMapTrackUser from './HomeMapTrackUser';
import HomeMapSettings from './HomeMapSettings';

const HomeMapUI = (props: any) => {
  const centerToUser = props.centerToUser;
  const toggleTraffic = props.toggleTraffic;
  return (
    <>
      <HomeMapTrackUser centerToUser={centerToUser} />
      <HomeMapSettings toggleTraffic={toggleTraffic} />
    </>
  );
};

export default HomeMapUI;
