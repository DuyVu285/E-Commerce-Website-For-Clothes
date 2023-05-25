import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterColumn>
          <h4>About Us</h4>
          <p>E-Commer Web App Project</p>
          <FooterSocialLinks>
            <li>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-pinterest"></i>
              </a>
            </li>
          </FooterSocialLinks>
        </FooterColumn>
        <FooterColumn>
          <h4>Customer Service</h4>
          <FooterLinks>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Shipping Information</a>
            </li>
            <li>
              <a href="#">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <h4>Categories</h4>
          <FooterLinks>
            <li>
              <a href="#">Clothing</a>
            </li>
            <li>
              <a href="#">Shoes</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Electronics</a>
            </li>
            <li>
              <a href="#">Home & Decor</a>
            </li>
          </FooterLinks>
        </FooterColumn>
        <FooterColumn>
          <h4>Subscribe to Our Newsletter</h4>
          <p>Stay up to date with the latest news and promotions!</p>
          <FooterForm>
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </FooterForm>
        </FooterColumn>
      </FooterContainer>
      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} Umi E-commerce Website. All rights
          reserved.
        </p>
      </FooterBottom>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: #f2f2f2;
  padding: 40px 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FooterColumn = styled.div`
  h4 {
    font-size: 18px;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    color: #777;
    margin-bottom: 20px;
  }
`;

const FooterSocialLinks = styled.ul`
  display: flex;
  gap: 10px;
  font-size: 20px;

  a {
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #777;
    }
  }
`;

const FooterLinks = styled.ul`
  li {
    margin-bottom: 10px;

    a {
      color: #333;
      transition: color 0.3s ease;

      &:hover {
        color: #777;
      }
    }
  }
`;

const FooterForm = styled.form`
  display: flex;
  gap: 10px;

  input[type="email"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  button[type="submit"] {
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
`;

const FooterBottom = styled.div`
  background-color: #e0e0e0;
  padding: 20px 0;
  text-align: center;

  p {
    font-size: 12px;
    color: #777;
    margin: 0;
  }
`;

export default Footer;
