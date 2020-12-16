import React, { Component } from "react";
import Form from "./Form";
import config from "../config";
import axios from "axios";

export default class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    id: this.props.match.params.id,
    errors: [],
  };

  componentDidMount() {
    this.returnCourseInfo();
  }

  returnCourseInfo = () => {
    const {
      match: { params },
    } = this.props;
    axios
      .get(`${config.apiBaseUrl}/courses/${params.id}`)
      .then((response) => {
        this.setState({
            title: response.data.title,
            description: response.data.description,
            estimatedTime: response.data.estimatedTime,
            materialsNeeded: response.data.materialsNeeded,
          
        }
        
        );
        console.log(this.setState)
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

    render() {
      const { errors} = this.state

      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      } = this.state;

      console.log(this.state);


    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={this.change}
                      placeholder="Course title..."
                    />
                  </div>
                </div>
                <div className="course--description">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change}
                    placeholder="Course description..."
                  />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          value={estimatedTime}
                          onChange={this.change}
                          className="course--time--input"
                          placeholder="Hours"
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          type="text"
                          value={materialsNeeded}
                          onChange={this.change}
                          placeholder="List materials..."
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

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
      .UpdateCourse(course, emailAddress, password)
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