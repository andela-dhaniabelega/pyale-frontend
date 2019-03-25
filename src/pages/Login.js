import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

import {login} from '../redux/actions/authActions';
import Aux from '../hoc/Aux_';
import {FormErrors} from "../components/FormErrors";


class Login extends React.Component {
  state = {
    email: "",
    password: "",
    formErrors: {authError: ''},
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state).then(() => {
      if (this.props.authError) {
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            authError: 'Invalid Login Credentials. Please try again.'
          }
        }))
      } else {
        this.props.history.push('/portal')
      }
    })
  };

  render() {
    return (
      <Aux>
        {/*<div className="account-home-btn d-none d-sm-block">*/}
        {/*<Link to="home-one" className="text-white"><i className="mdi mdi-home h1"></i></Link>*/}
        {/*</div>*/}
        <div className="account-home-btn d-none d-sm-block">
          <Link to="/" className="text-white forgot-password-logo">PYALE PROPERTIES</Link>
        </div>

        <section className="bg-account-pages height-100vh">
          <div className="display-table">
            <div className="display-table-cell">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card account-card">
                      <div className="card-body">
                        <div className="text-center mt-3">
                          <h3 className="font-weight-bold">
                            <Link
                              to="home-one"
                              className="text-dark text-uppercase account-pages-logo"
                            >Pyale Properties
                            </Link>
                          </h3>
                          <p className="text-muted">Sign in to continue to Tenant Portal.</p>
                          <FormErrors formErrors={this.state.formErrors}/>
                        </div>
                        <div className="p-3">
                          <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                onChange={this.handleChange}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                onChange={this.handleChange}
                              />
                            </div>

                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input"
                                     id="customControlInline"/>
                            </div>

                            <div className="mt-3">
                              <button type="submit"
                                      className="btn btn-custom btn-block">Log In
                              </button>
                            </div>

                            <div className="mt-4 mb-0 text-center">
                              <Link to="forgot_password" className="text-dark">
                                <i className="mdi mdi-lock"></i> Forgot your password?
                              </Link>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));