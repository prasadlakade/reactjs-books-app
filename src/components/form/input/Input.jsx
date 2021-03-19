import React from 'react';
import { Col, Form } from 'react-bootstrap';

const Input = (props) => {
  return (
    <Form.Group as={Col} md={4} controlId={props.controlId}>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleChange}
      />
    </Form.Group>
  );
};

export default Input;
