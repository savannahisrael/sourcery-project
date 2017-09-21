import React, { Component } from 'react';
import { Form, Label, Icon, Container } from 'semantic-ui-react';
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
      <div>
        <Navbar currentPage='create' /> 
        <Container>     
          <Form size='large' class='form'>
              <Form.Input label='Project Name' placeholder='devCircle' />
              <Form.Input label='Start Date' placeholder='Oct 1, 2017' />
              
          <Form.Input label='Project Length' placeholder='in weeks' />
            <Form.TextArea label='Project Summary' placeholder='Summarize your project...' />
            <Form.Select label='Main Technology' options={options} placeholder='e.g. JavaScript' />
            <Form.TextArea label='Other Technologies' placeholder='MySql, HTML5, CSS3' />
            <Form.TextArea label='Project Details' placeholder='Describe your project...' />
            <Form.Button>Create Project</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default CreateProjectForm
