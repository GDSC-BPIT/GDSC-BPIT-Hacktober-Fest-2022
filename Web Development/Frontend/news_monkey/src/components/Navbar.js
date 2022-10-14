import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "./favpng_chimpanzee-logo-monkey-ape.png";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link class="navbar-brand" to="#">
              <img src={logo} alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/>
            </Link>
            <Link className="navbar-brand" to="/">NewsMonkey</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className='nav-item'><Link className="nav-link" aria-current="page" to="/business">Business</Link></li>
                <li className='nav-item'><Link className="nav-link" aria-current="page" to="/entertainment">Entertainment</Link></li>
                <li className='nav-item'><Link className="nav-link" aria-current="page" to="/health">Health</Link></li>
                <li className='nav-item'><Link className="nav-link" aria-current="page" to="/science">Science</Link></li>
                <li className='nav-item'><Link className="nav-link" aria-current="page" to="/sports">Sports</Link></li>
                <li className='nav-item'><Link className="nav-link" aria-current="page" to="/technology">Technology</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
