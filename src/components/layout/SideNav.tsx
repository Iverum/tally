import styled from '@emotion/styled';
import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { useHistory } from 'react-router-dom';

import TagList from '../../modules/media/components/TagList';

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
    <StyledCol md={3} xl={2}>
      <Container className="sticky-top">
        <FormControl placeholder="Search" type="text" />
        <Controls>
          <Button onClick={() => history.push('/new')} variant="primary">
            Add
          </Button>
        </Controls>
        <TagList />
      </Container>
    </StyledCol>
  );
};

export default SideNav;
