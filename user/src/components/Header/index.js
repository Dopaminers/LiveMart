import React, { useEffect, useState } from "react";
import "./style.css";
import Geolocation from 'react-geolocation'
import LiveMartLogo from "../../images/logo/LiveMart.png";
//import goldenStar from "../../images/logo/golden-star.png";
//import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";
import {Button, Alert} from 'react-bootstrap'
/**
 * @author
 * @function Header
 **/

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypepassword, setRetypepassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  // state cart value
  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    
    const user = { firstName, lastName, email, password, retypepassword };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "",
      retypepassword === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          //{ label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <Button 
            //className="loginButton" 
            variant ="success"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </Button>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          //{ label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span style={{fontSize:"14px"}}>New Customer?</span>
            <a className="abc"
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "red" }}
            >
              Sign Up
            </a> 
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Sign Up</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
              <img src={LiveMartLogo} className="logoimage" alt="" />

            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                <Alert Alert variant = "secondary" > Please enter your details to
                continue! </Alert>
                {signup && (
                  <>
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  /></>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                
                {signup && (
                  <MaterialInput
                    type="password" style="hidden"
                    label="Confirm Password"
                    value={retypepassword}
                    onChange={(e) => setRetypepassword(e.target.value)}
                  />
                )}
                <Button Button variant = "success"
                size = "md"
                block
                  //title={signup ? "Register" : "Login"}
                  // bgColor="danger"
                  // textColor="red"
                  style={{
                    //marginLeft: "123px",
                    marginTop :"35px"
                  }}
                  onClick={userLogin}
                > {
                  signup ? "Register" : "Sign In"
                } </Button>
                {!signup && (
                //<p style={{ textAlign: "center" }}>OR</p>
              <> <Button
                  href = "http://localhost:2000/api/otpgeneration"
                  size="md" block
                  title="Request OTP" 
                  variant ="danger"
                  // bgColor="#ffffff"
                  // textColor="red"
                  style={{
                    marginTop: "29px"
                  }}
                >Request OTP Instead</Button>
                </>
                )}
              </div>
            
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="http://localhost:3000">
            <img src={LiveMartLogo} className="logoimage" alt="" />
          </a>
          {/* <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a> */}
        </div>
        {/* logo ends here */}

        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"Search for Products, Brands and More"}
            />
            <div className="searchIconContainer">
              <a href = "http://localhost:3000/One-Plus-NnIW9ZoTej?cid=607e2c69218a0932fce43476&type=undefined">
                <IoIosSearch
                style={{
                  color: "#780206", cursor: "pointer"
                }}
              /></a>
            </div>
          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              //
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
        {/* right side menu ends here */}
      </div>
    </div>
  );
};

export default Header;
