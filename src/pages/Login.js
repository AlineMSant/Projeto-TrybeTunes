import { PropTypes } from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import Logo from '../components/Logo';
import '../App.css';

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
    } else {
      this.setState({
        isEnterButtonDisabled: true,
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
      <div data-testid="page-login" className="container-login">
        <div className="login">
          <Logo />

          <label htmlFor="name">
            <input
              id="name"
              type="text"
              data-testid="login-name-input"
              placeholder="qual é o seu nome?"
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
