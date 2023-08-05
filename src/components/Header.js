import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Logo from './Logo';
import '../Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };

    this.renderUser = this.renderUser.bind(this);
  }

  componentDidMount() {
    this.renderUser();
  }

  async renderUser() {
    this.setState({
      loading: true,
    });

    const user = await getUser();

    this.setState({
      name: user.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;

    if (loading === true) return <Loading />;
    return (
      <div data-testid="header-component">
        <header className="header-container">
          <Logo />

          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>

          <h3 data-testid="header-user-name">{ name }</h3>
        </header>
      </div>
    );
  }
}

export default Header;
