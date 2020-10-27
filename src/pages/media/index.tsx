import React, { FC } from 'react';

import MainContent from '../../components/layout/MainContent';
import SideNav from '../../components/layout/SideNav';
import MediaGrid from './components/MediaGrid';

const AllMedia: FC = () => (
  <>
    <SideNav />
    <MainContent>
      <MediaGrid />
    </MainContent>
  </>
);

export default AllMedia;
