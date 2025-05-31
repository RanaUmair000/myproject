import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const handleDummyClick = (e) => {
    e.preventDefault();
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleDummyClick}
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><button className="dropdown-item" onClick={handleDummyClick}>Action</button></li>
                <li><button className="dropdown-item" onClick={handleDummyClick}>Another action</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleDummyClick}>Something else here</button></li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled" aria-disabled="true">Disabled</span>
            </li>
          </ul>

          {props.isDark && (
            <div className="d-flex align-items-center gap-2 mx-3">
              <div
                className="bg-danger rounded-circle"
                onClick={() => props.showModeColor('#dc3545')}
                style={{ height: '25px', width: '25px', cursor: 'pointer' }}
              ></div>
              <div
                className="bg-success rounded-circle"
                onClick={() => props.showModeColor('#198754')}
                style={{ height: '25px', width: '25px', cursor: 'pointer' }}
              ></div>
              <div
                className="bg-warning rounded-circle"
                onClick={() => props.showModeColor('#ffc107')}
                style={{ height: '25px', width: '25px', cursor: 'pointer' }}
              ></div>
            </div>
          )}

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={props.toggleMode}
              id="flexSwitchCheckDefault"
            />
            <label
              className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'}`}
              htmlFor="flexSwitchCheckDefault"
            >
              {props.modeText}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
  modeText: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
  showModeColor: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'Mineing',
};
