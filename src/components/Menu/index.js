// @flow

import React, { Component } from 'react';
import classNames from 'classnames';

import s from './styles.scss';

import ScrollLink from '../ScrollLink';

type Route = {
  title: string;
  path: string;
}

export default class Menu extends Component {
  props: { routes: Route[] };
  state: { showMenu: boolean };

  constructor(props: { routes: Route[] }) {
    super(props);
    this.state = { showMenu: false };
  }

  handleClick = (): void => this.setState({ showMenu: !this.state.showMenu });

  render() {
    const { routes } = this.props;
    const items = routes.map((route, i) => (
      <li className={s.menuItem} key={i}>
        <ScrollLink
          className={s.menuItemLink}
          to={route.path}
          onClick={this.handleClick}
        >
          {route.title}
        </ScrollLink>
      </li>
    ));

    const cx = {
      [s.menu]: true,
      [s.show]: this.state.showMenu,
    };

    return (
      <nav className={classNames(cx)}>
        <ul className={s.menuContainer}>
          {items}
        </ul>
        <div className={s.showMenuContainer}>
          <button className={s.showMenu} onClick={this.handleClick}>
            <div className={s.menuIcon} />
          </button>
        </div>
      </nav>
    );
  }
}
