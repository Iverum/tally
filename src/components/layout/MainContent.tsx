import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';

const MainContent: FC = ({ children }) => (
  <Col>
    {children}
  </Col>
);

export default MainContent;
