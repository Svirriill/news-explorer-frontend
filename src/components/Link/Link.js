import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Link({ linkClassName, activeLinkClassName, path, children }) {
  return (
    <NavLink
      className={`${linkClassName}`}
      activeClassName={activeLinkClassName}
      exact to={path}>{children}</NavLink>
  )
}