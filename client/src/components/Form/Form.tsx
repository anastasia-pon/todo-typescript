import React from 'react';

const Form = () => (
  <form className="form">
    <h2>Register New ToDos</h2>
    <input type="text" className="form__input" id="title" name="title" placeholder="Add a title..." required />
    <textarea className="form__input" id="note" name="note" placeholder="Add a note..." />
    <input type="submit" className="form__button" value="Add ToDo" />
  </form>
);

export default Form;
