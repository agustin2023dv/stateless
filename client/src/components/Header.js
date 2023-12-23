import React from 'react';

function Header() {
  return (
    <header>
      <h1>Stateless</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/sign-up">Sign up</a></li>
          <li><a href="/sign-in">Sign in</a></li>

        </ul>
      </nav>
    </header>
  );
}

export default Header;
