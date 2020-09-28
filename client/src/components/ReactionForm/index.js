import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {ADD_REACTION} from '../../utils/mutations';

const [characterCount, setCharacterCount] = useState(0);
const [reactionBody, setBody] = useState('');

const [addReaction,{thoughtId} ] = useMutation(ADD_REACTION);

const handleChange = event => {
  if (event.target.value.length <= 280) {
    setBody(event.target.value);
    setCharacterCount(event.target.value.length);
  }
};

const handleFormSubmit = async event => {
  event.preventDefault();
  setBody('');
  setCharacterCount(0);
  await addReaction({
    variables: { reactionBody, thoughtId }
  });
};

const ReactionForm = ({ thoughtId }) => {
  
  return (
    <div>
      <p 
        className={`m-0 ${characterCount === 280}`}>
        Character Count: {characterCount}/280
      </p>
      <form 
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this thought..."
          value={reactionBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;