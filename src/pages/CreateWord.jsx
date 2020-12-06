import React, { Component } from "react";
import FormWord from "../components/Forms/FormWord";

class CreateWord extends Component {
  addWord = (word) => {
    this.props.handleWord({
      word: word,
    });
  };

  render() {
    return (
      <div className="create-word">
        <FormWord handleWord={this.addWord} sentence={this.props.sentence} />
      </div>
    );
  }
}

export default CreateWord;