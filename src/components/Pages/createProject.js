import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

const options = [
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'py', text: 'Python', value: 'python' },
  { key: 'rb', text: 'Ruby', value: 'ruby' },
  { key: 'ph', text: 'PHP', value: 'php' },
  { key: 'c#', text: 'C#', value: 'c#' },
  { key: 'jv', text: 'Java', value: 'java' },
  { key: 'go', text: 'Go', value: 'go' },
  { key: 'c+', text: 'C++', value: 'c++' },
]

class CreateProjectForm extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='First Name' placeholder='First Name' />
          <Form.Input label='Last Name' placeholder='Last Name' />
          <Form.Select label='Primary Technology' options={options} placeholder='Primary Technology' />
        </Form.Group>
        <Form.Group inline>
          <label>Timespan</label>
          <Form.Radio label='1 Week' value='1' checked={value === '1'} onChange={this.handleChange} />
          <Form.Radio label='2 Weeks' value='2' checked={value === '2'} onChange={this.handleChange} />
          <Form.Radio label='3 Weeks' value='3' checked={value === '3'} onChange={this.handleChange} />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Describe your project...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Create</Form.Button>
      </Form>
    )
  }
}

export default CreateProjectForm
