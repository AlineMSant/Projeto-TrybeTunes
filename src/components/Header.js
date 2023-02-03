import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
        <header>
          <h3 data-testid="header-user-name">{ name }</h3>
        </header>
      </div>
    );
  }
}

export default Header;
