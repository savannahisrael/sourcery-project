import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const SignUpForm = () => (
  <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='signup'>Sign Up</Button>
  </Form>
)

export default SignUpForm