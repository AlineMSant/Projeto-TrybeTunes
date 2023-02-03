import { PropTypes } from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isEnterButtonDisabled: true,
      name: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const characters = 3;

    if (event.target.value.length >= characters) {
      this.setState({
        isEnterButtonDisabled: false,
        name: event.target.value,
      });
    }
  }

  async handleClick() {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name });

    this.setState({
      loading: false,
    });

    history.push('/search');
  }

  render() {
    const { isEnterButtonDisabled, loading } = this.state;

    if (loading === true) return <Loading />;
    return (
      <div data-testid="page-login">

        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isEnterButtonDisabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
