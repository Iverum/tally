import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';

interface MainContentProps {
  className?: string;
}

const MainContent: FC<MainContentProps> = ({ children, className }) => (
  <Col className={className}>
    {children}
  </Col>
);

export default MainContent;
