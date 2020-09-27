import React from 'react';
import stringFile from '../../assets/stringsEnglish.json';
import './Header.css';
function Header() {
  return (
    <h3 className="header">
      {stringFile.game_title}
    </h3>
  );
}

export default Header;