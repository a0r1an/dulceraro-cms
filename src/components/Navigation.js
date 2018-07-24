import React from "react";
import styled from 'styled-components';

const Header = styled.header`
  background: black;
`;

const List = ({ className, children }) => (
  <ul className={className}>
    {children}
  </ul>
)

const Anchor = styled.a`
  color: white;
  text-decoration: none;
  font-size: .875em;
  flex: 1 1 100%;
  text-align: center;
  padding: 10px 0;
  &:hover {
    background: #ea40dc;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex: 1 1 100%;
`;

const StyledList = styled(List)`
  display: flex;
  list-style: none;
`;

class Navigation extends React.Component {
  render() {
    return <Header>
      <StyledList>
        {/* <ListItem><Anchor href="/videos">MINIS</Anchor></ListItem> */}
        <ListItem><Anchor href="/ficton">FICTION</Anchor></ListItem>
        <ListItem><Anchor href="/blog ">SPORTS</Anchor></ListItem>
        <ListItem><Anchor href="/podcasts">PODCAST</Anchor></ListItem>
        <ListItem><Anchor href="/store">STORE</Anchor></ListItem>
      </StyledList>
    </Header>;
  }
}

export default Navigation;
