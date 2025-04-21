import React from "react";

function Footer() {
  const year: number = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright by Chthollyⓒ {year}</p>
    </footer>
  );
}

export default Footer;
