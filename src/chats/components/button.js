import React from 'react';
import styled from 'styled-components'

export default styled.button`
  position: relative;
  text-align: center;
  margin-bottom: 0.1rem;
  width: 100%;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  vertical-align: middle;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0;
  cursor: pointer;
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
  &:focus {
    outline: 0;
  }
`;