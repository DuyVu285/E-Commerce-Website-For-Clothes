import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { setLoggedIn, setUsername } from "../features/authSlice";

const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    history.push(`/search/${searchTerm}`);
  };

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    dispatch(setUsername(null));
  };

  return (
    <nav className="nav-bar">
      <RightLinks>
        <Link to="/">
          <h2>OnlineShop</h2>
        </Link>
        <Link to="/category">
          <h3>Category</h3>
        </Link>
        <Link to="/category/NewArrivals">
          <h3>New Arrivals</h3>
        </Link>
      </RightLinks>
      <LeftLinks>
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput type="text" name="search" placeholder="Search" />
            <SearchButton type="submit">Search</SearchButton>
          </form>
        </SearchContainer>
        <Link to="/cart">
          <div className="nav-bag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <span className="bag-quantity">
              <span>{cartTotalQuantity}</span>
            </span>
          </div>
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="">{username}</Link>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </LeftLinks>
    </nav>
  );
};

export default NavBar;

const LeftLinks = styled.div`
  display: flex;
  align-items: center;

  .auth-links {
    margin-left: auto;
  }

  a {
    margin-left: 2rem;
  }
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;

  .auth-links {
    margin-right: auto;
  }

  a {
    margin-right: 2rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  form {
    margin-right: 1rem;
  }
`;
