import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import styled from '@emotion/styled';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import TagList from '../../pages/media/components/TagList';

const StyledCol = styled(Col)`
  background-color: #f7f7f7;
  border-right: 1px solid #ececec;
`;

const Container = styled.div`
  padding: 15px 0;
`;

const Controls = styled.div`
  display: flex;
  padding: 3px 0;
  > * {
    flex: 1;
  }
`;

const SideNav: FC = () => {
  const history = useHistory();
  return (
    <StyledCol xl={2} md={3}>
      <Container className="sticky-top">
        <FormControl type="text" placeholder="Search" />
        <Controls>
          <Button variant="primary" onClick={() => history.push('/new')}>
            Add
          </Button>
        </Controls>
        <TagList />
      </Container>
    </StyledCol>
  );
};

export default SideNav;
