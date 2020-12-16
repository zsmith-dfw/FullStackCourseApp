import React, { Component } from "react";
import Form from "./Form";

// decided to make this so that users don't inadvertantly delete courses they don't mean to

export default class DeleteCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        id: this.props.match.params.id,
        errors: [],
      };

  render() {
    const {  errors } = this.state;
    return (
      <div className="bounds">
        <h1>Are you sure you want to delete this course?</h1>

        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Delete Course"
          elements={() => (
            <p>This action cannot be reversed!</p>
          )}

        />
      </div>
    );
  }

  submit = () => {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id,
    } = this.state;
    
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const userId = context.authenticatedUser.userId;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id,
      userId,
    };

    context.data
      .DeleteCourse(course, emailAddress, password, id)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  };
}
