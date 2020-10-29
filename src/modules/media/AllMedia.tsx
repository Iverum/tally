import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import MainContent from '../../components/layout/MainContent';
import SideNav from '../../components/layout/SideNav';
import { MediaAttributes } from "../../db";
import { RootState } from '../../store';
import MediaGrid from './components/MediaGrid';
import {
  fetchMedia,
  selectAllMedia,
  selectTotalMedia,
} from "./slice";

const AllMedia: FC = () => {
  const count = useSelector(selectTotalMedia);
  const media: MediaAttributes[] = useSelector(selectAllMedia) as MediaAttributes[];
  const mediaLoading = useSelector((state: RootState) => state.media.loading);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchMedia()) }, [])

  return (
    <>
      <SideNav />
      <MainContent>
        <MediaGrid media={media} />
      </MainContent>
    </>
  )
};

export default AllMedia;
