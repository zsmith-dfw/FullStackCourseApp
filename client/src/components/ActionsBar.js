import React from "react";
import { Link } from "react-router-dom";

export default class ActionsBar extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    // Just has the links at the top to update, delete, or cancel. Split into its own component for modularity

    return (
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {authUser && authUser.userId === this.props.userId ? (
              <React.Fragment>
                <span>
                  <Link
                    className="button"
                    to={`/courses/${this.props.id}/update`}
                  >
                    Update Course
                  </Link>
                  <Link
                    className="button"
                    to={`/courses/${this.props.id}/delete`}
                  >
                    Delete Course
                  </Link>
                </span>
                <Link className="button button-secondary" to="/">
                  Return to List
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="button button-secondary" to="/">
                  Return to List
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
