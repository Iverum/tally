import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';

const HeaderRow = styled(Row)`
  background-color: #f7f7f7;
  border-bottom: 1px solid #ececec;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  > h1 {
    margin: 0
  }
  > button {
    font-size: 0.8rem;
    margin-right: 6px;
  }
`;

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: FC<HeaderProps> = ({ title, onBack }) => (
  <HeaderRow>
    {onBack && <Button variant="secondary" onClick={onBack}><i className="fas fa-chevron-left" /></Button>}
    <h1>{title}</h1>
  </HeaderRow>
);

export default Header;
