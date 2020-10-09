import React, { FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import styled from '@emotion/styled';

const Container = styled.section`
  padding: 15px 0;
`;

const Header = styled.h1`
  font-size: 1rem;
`;

const TagWrapper = styled(Nav.Item)`
  font-size: 0.875rem;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface TagProps {
  name: string;
  count: number;
}

const Tag: FC<TagProps> = ({ name, count }) => (
  <TagWrapper>
    {name}
    {' '}
    <Badge pill variant="secondary">{count}</Badge>
  </TagWrapper>
);

const TagList: FC = () => (
  <Container>
    <Header>Tags</Header>
    <Nav className="flex-column">
      <Tag name="tag1" count={247} />
      <Tag name="tag2" count={193} />
      <Tag name="tag3" count={78} />
    </Nav>
  </Container>
);

export default TagList;
