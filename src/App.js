import "./App.css";
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0,
  }
  apiKey = process.env.REACT_APP_NEWS_API;
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="general"
                  pageSize={9}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/business"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="business"
                  pageSize={9}
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="entertainment"
                  pageSize={9}
                  country="in"
                  category="entertainment"
                />
              }
            ></Route><Route
              path="/general"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="general"
                  pageSize={9}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="health"
                  pageSize={9}
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/science"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="science"
                  pageSize={9}
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              path="/sports"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="sports"
                  pageSize={9}
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/technology"
              element={
                <News setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="technology"
                  pageSize={9}
                  country="in"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
