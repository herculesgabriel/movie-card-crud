import styled from 'styled-components';

const Button = styled.button`
  background-color: #0984e3;
  border-style: none;
  border-radius: 5px;
  margin: 4px 10px;
  padding: 8px;

  & ${'a'} {
    color: white;
    font-family: Ubuntu, sans-serif;
    font-size: 16px;
    text-decoration: none;
  }  
`;

export default Button;
