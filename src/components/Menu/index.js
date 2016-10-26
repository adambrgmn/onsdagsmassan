import React, { Component } from 'react';
import classNames from 'classnames';

import s from './styles.scss';
import bg from '../../img/bg.jpg';

import ScrollLink from '../ScrollLink';

export default class Menu extends Component {
  constructor(props) {
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
    const routes = [
      { path: '', title: 'Hem' },
      { path: 'aktuellt', title: 'Aktuellt' },
      { path: 'information', title: 'information' },
      { path: 'musik', title: 'Musik' },
    ];

    const items = routes.map((item, i) => (
      <li className={s.menuItem} key={i}>
        <ScrollLink
          className={s.menuItemLink}
          to={item.path}
          onClick={this.handleClick}
        >
          {item.title}
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
