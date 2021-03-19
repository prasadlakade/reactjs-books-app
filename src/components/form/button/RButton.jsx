import React from 'react';
import Button from 'react-bootstrap/Button';

const RButton = (props) => {
  return (
    <>
      <Button
        type={props.type}
        className={props.className}
        variant={props.variant}
        size={props.size}
        onClick={props.handleClick}>
        {props.value}
      </Button>
    </>
  );
};

export default RButton;
