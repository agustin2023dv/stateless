import React from 'react';

function Header() {
  return (
    <header>
      <h1>Stateless</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/sign-up">Sign up</a></li>
          <li><a href="/sign-up">Sign in</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
