import React, { Component } from 'react';
import { Form, Label, Icon } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import './createProject.css';

const options = [
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'py', text: 'Python', value: 'python' },
  { key: 'rb', text: 'Ruby', value: 'ruby' },
  { key: 'ph', text: 'PHP', value: 'php' },
  { key: 'c#', text: 'C#', value: 'c#' },
  { key: 'jv', text: 'Java', value: 'java' },
  { key: 'go', text: 'Go', value: 'go' },
  { key: 'c++', text: 'C++', value: 'c++' },
  { key: 'sw', text: 'Swift', value: 'swift' },
  { key: 'hc', text: 'HTML/CSS', value: 'html+css' },
]

class CreateProjectForm extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
        <Form size='large' class='form'>
          <Form.Group>
            <Form.Input label='Project Title' placeholder='Title' />
            <Form.Input label='Start Date' placeholder='Date' />
          </Form.Group>
          <Form.Input label='Duration' placeholder='Duration' />
          <Form.Group inline>
            <Form.Radio label='Days' value='days' checked={value === 'days'} onChange={this.handleChange} />
            <Form.Radio label='Weeks' value='weeks' checked={value === 'weeks'} onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea label='Project Summary' placeholder='Summarize your project...' />
          <Form.Select label='Primary Technology' options={options} placeholder='Primary Technology' />
          <Form.TextArea label='Secondary Technologies' placeholder='Secondary Technologies' />
          <Form.TextArea label='Project Details' placeholder='Describe your project...' />
          <Form.Button>Create</Form.Button>
        </Form>
    )
  }
}

export default CreateProjectForm
