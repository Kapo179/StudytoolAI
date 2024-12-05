import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button> Database </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  button {
    --green: #1BFD9C;
    font-size: 14px; /* Resize the button text */
    padding: 0.5em 2em; /* Resize the button padding */
    letter-spacing: 0.06em;
    position: relative;
    font-family: inherit;
    border-radius: 0.6em;
    overflow: hidden;
    transition: all 0.3s;
    line-height: 1.4em;
    border: 2px solid var(--green);
    background: linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%, transparent 60%, rgba(27, 253, 156, 0.1) 100%);
    color: var(--green);
    box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1);
  }

  button:hover {
    color: #82ffc9;
    box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 9px 3px rgba(27, 253, 156, 0.2);
  }

  button:before {
    content: "";
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform .4s ease-in-out;
    background: linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%, rgba(27, 253, 156, 0.1) 60%, transparent 100%);
  }

  button:hover:before {
    transform: translateX(15em);
  }

  @media (max-width: 768px) {
    button {
      font-size: 12px; /* Resize the button text for mobile */
      padding: 0.4em 1.5em; /* Resize the button padding for mobile */
    }
  }

  @media (max-width: 480px) {
    button {
      font-size: 10px; /* Resize the button text for smaller mobile screens */
      padding: 0.3em 1em; /* Resize the button padding for smaller mobile screens */
    }
  }
`;

export default Button;