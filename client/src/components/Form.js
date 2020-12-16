import React from 'react';

// similar in nature to the Treehouse course on React authentication, this code handles the submit / cancel buttons for creating, deleting, and updating a course. 

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  // will attempt to submit course data (new or updates) to the database but if there is any kind of validation error, it will throw those errors so the user knows what is missing. 
  // If there is any other type of error (i.e. 404 or 500) then the user is routed to the error page

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}

