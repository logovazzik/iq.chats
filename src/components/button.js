import React from 'react';
import glamorous from 'glamorous';

export default glamorous('button')({
  textAlign: 'center',
  marginBottom: '0.1rem',
  width: '100%',
  display: 'inline-block',
  fontWeight: 400,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  MsUserSelect: 'none',
  userSelect: 'none',
  border: '1px solid transparent',
  padding: '.375rem .75rem',
  fontSize: '1rem',
  lineHeight: 1.5,
  borderRadius: 0,
  cursor: 'pointer',
  color: '#fff',
  backgroundColor: '#343a40',
  borderColor: '#343a40',
  ':focus': {
    outline: 0,
  },
});