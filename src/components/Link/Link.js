import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Link({ linkClassName, activeLinkClassName, path, children, onClick }) {
  return (
    <NavLink
      onClick={onClick}
      className={`${linkClassName}`}
      activeClassName={activeLinkClassName}
      exact to={path}>{children}</NavLink>
  )
}