import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem,
//   MDBBtn
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux"

import { setLogout } from "../redux/features/authSlice";

const Header = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const { user } = useSelector((state) => ({ ...state.auth }))

    // handle logout
    const handleLogout = () => {
        dispatch(setLogout())
    }

    return (
        <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
            <MDBContainer>

                {/* logo */}
                <MDBNavbarBrand href="/" style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>Touropedia</MDBNavbarBrand>

                {/* hamburger icon */}
                <MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toogle navigation" onClick={() => setShow(!show)} style={{ color: "#606080" }}><MDBIcon icon="bars" fas /></MDBNavbarToggler>

                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        
                        { user?.result?._id && (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="#"><p className="header-text">Hi! {user?.result?.name}</p></MDBNavbarLink>
                            </MDBNavbarItem>
                        )}

                        {/* home */}
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/"><p className="header-text">Home</p></MDBNavbarLink>
                        </MDBNavbarItem>

                        {/* page links */}
                        {/* {user?.result?._id && (
                            <>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/addTour">
                                <p className="header-text">Add Tour</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/dashboard">
                                <p className="header-text">Dashboard</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            </>
                        )} */}

                        {/* login / logout */}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login"><p className="header-text" onClick={() => handleLogout()}>Logout</p></MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login"><p className="header-text">Login</p></MDBNavbarLink>
                            </MDBNavbarItem>
                        )}

                        {/* <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link'>Dropdown</MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link>Action</MDBDropdownItem>
                                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem> */}


                    </MDBNavbarNav>

                    {/* search */}
                    {/* <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Tour"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                        <MDBIcon fas icon="search" />
                    </div>
                    </form> */}

                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header