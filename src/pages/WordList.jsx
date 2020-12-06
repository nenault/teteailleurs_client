import React, { Component } from "react";
// import apiHandler from "../../api/apiHandler";
import Json from "./messages.json";
// import axios from "axios";

class WordList extends Component {
  state = {};

  componentDidMount() {
    // console.log(Json.conversations[0].MessageList[0]);
  }

  render() {
    return (
      <div>
        <h1>List</h1>
        {Json.conversations[0].MessageList.map((sentences) => (
          <div key={sentences.id}>
            <span>{sentences.content}</span>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default WordList;
