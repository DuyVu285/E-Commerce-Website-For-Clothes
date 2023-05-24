import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div>
      <StyledDashboard>
        <SideNav>
          <h3>Quick Links</h3>
          <NavLinkStyled exact to="/admin/summary" activeClassName="link-active">
            Summary
          </NavLinkStyled>
          <NavLinkStyled to="/admin/products" activeClassName="link-active">
            Products
          </NavLinkStyled>
        </SideNav>
        <Content>{children}</Content>
      </StyledDashboard>
    </div>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 14px;
  color: grey;

  &.link-active {
    color: blue;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;

export default Dashboard;