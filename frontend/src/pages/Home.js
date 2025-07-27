import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h2>To-Do App</h2>
      <nav>
        <image src="https://www.bing.com/images/search?view=detailV2&ccid=hVQUcq9d&id=BE7556EA5A8EFDAB8A7BAA9D517EF5D8D51D2CF7&thid=OIP.hVQUcq9dfIJ3fviNmS6xwAHaEJ&mediaurl=https%3a%2f%2fblog.vantagecircle.com%2fcontent%2fimages%2fsize%2fw1000%2f2019%2f09%2ffun-activities-at-work.png&exph=382&expw=681&q=to-do+activities+images+for+employees&mode=overlay&FORM=IQFRBA&ck=8D5ADA161069AAA80A0423F2AF5B88CB&selectedIndex=0&idpp=serp"/>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/todo">To-Do</Link>
      </nav>
    </header>
  );
};

export default Header;
