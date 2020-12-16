import React, { Component } from "react";
import Course from "./Course";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";

// takes each course button component and renders them into a grid

export default class Courses extends Component {
  constructor() {
    super();

    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    this.returnCourses();
  }

  returnCourses = () => {
    axios
      .get(`${config.apiBaseUrl}/courses`)
      .then((response) => {
        this.setState({
          courses: response.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    const results = this.state.courses;
    let courses;
    if (results && results.length > 0) {
      courses = results.map((course) => (
        <Course title={course.title} key={course.id} id={course.id} />
      ));
    }

    return (
      <div className="bounds">
        {courses}
        <div className="grid-33">
          <Link className="course--module course--add--module" to="/create">
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
