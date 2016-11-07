// @flow

import React, { Component } from 'react';
import classNames from 'classnames';

import s from './styles.scss';

import ScrollLink from '../ScrollLink';

type Route = {
  title: string;
  path: string;
}

type Props = {
  routes: Route[];
}

export default class Menu extends Component {
  props: Props;
  state: { showMenu: boolean };
  handleClick: () => void;

  constructor(props: Props) {
    super(props);
    this.state = { showMenu: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    const items = this.props.routes.map((route, i) => (
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
