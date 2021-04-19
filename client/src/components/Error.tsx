import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Error = (props: {
  setError: (err: boolean) => void;
  errorMessage: string;
  }) => {
  const { setError, errorMessage } = props;

  return (
    <div>
      <button type="button" onClick={() => setError(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;
