import React, { Component } from 'react'
import Input from "./input";
const Joi = require('@hapi/joi');

class LoginForm extends Component {
  // userName = React.createRef()
  state = {
    account: { username: '', password: '' },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.account, this.schema, options)
    if (!error) return null;

    const errors = {}

    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
    // const { account } = this.state
    // const errors = {}
    // if (account.username.trim() === '')
    //   errors.username = 'Username is required'

    // if (account.password.trim() === '')
    //   errors.password = 'Password is required.'

    // return Object.keys(errors).length === 0 ? null : errors
  }
  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate()
    console.log(errors);
    this.setState({ errors: errors || {} })
    if (errors) {
      return
    }
    // const username = this.userName.current.value
    console.log('submitted')
  }

  validateProperty = ({ value, name }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema)
    return error ? error.details[0].message : null
    // if (name === 'username') {
    //   if (value.trim() === '') return 'username is required'
    // }
    // if (name === 'password') {
    //   if (value.trim() === '') return 'Password is required'
    // }
  }

  handleChange = ({ currentTarget: input }) => {
    const { account, errors } = { ...this.state }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]
    account[input.name] = input.value
    this.setState({ account, errors })
  }
  render() {
    const { account, errors } = this.state
    return (
      <div className="row">
        <div className="col-md-8">
          <h1 className="mb-4">login form</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              value={account.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              label="username"
              id="username"
              error={errors.username}
            />
            <Input
              value={account.password}
              onChange={this.handleChange}
              label="password"
              name="password"
              id="password"
              type="password"
              error={errors.password}
            />
            <button disabled={this.validate()} className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
