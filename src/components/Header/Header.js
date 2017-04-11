import React from 'react'
import Isvg from 'react-inlinesvg'

const Header = () => (
  <header className="header">
    <Isvg
      className="logo-black"
      src={`${process.env.PUBLIC_URL}/img/syncano-logo.svg`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/img/syncano-logo.svg`}
        alt="Syncano-logo"
      />
    </Isvg>
  </header>
);

export default Header;