import React from "react";
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.75em;
  text-align: center;
  font-weight: 900;
  margin: 0;
  padding: 0.5em 0;
`;

const Link = ({ className, children }) => (
  <a href="/" className={className}>
    {children}
  </a>
)

const StyledLink = styled(Link)`
  color: #ea40dc;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: black;
  }
`;
class Header extends React.Component {
  render() {
    return <section>

      <Title><StyledLink>dulce raro</StyledLink></Title>

    </section>;
  }
}

export default Header;
