import React, { Component } from "react";
import apiHandler from "../api/apiHandler.js";
import CreateWord from "./CreateWord";

class OneSentence extends Component {
  state = {
    sentence: null,
    isDone: "",
    addWord: "",
    words: [],
  };

  componentDidMount() {
    apiHandler
      .getOne("/api/sentences/", this.props.match.params.id)
      .then((apiRes) => {
        this.setState({ sentence: apiRes.data, isDone: apiRes.data.isDone });
        this.buildWords(apiRes.data.words);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buildWords = (data) => {
    for (const [index, item] of data.entries()) {
      apiHandler
        .getOne("/api/words/", item.word)
        .then((apiRes) => {
          const copyWords = [...this.state.words];
          copyWords.unshift(apiRes.data);

          this.setState({ words: copyWords });
        })
        .catch((apiErr) => {
          console.log(apiErr);
        });
    }
  };

  done = (event) => {
    this.setState(
      {
        isDone: !this.state.isDone,
      },
      () =>
        apiHandler
          .updateOne("/api/sentences/" + this.props.match.params.id, {
            isDone: this.state.isDone,
          })
          .then((apiRes) => {})

          .catch((apiErr) => console.log(apiErr))
    );
  };

  handleWord = (word) => {
    apiHandler
      .updateOne("/api/sentences/" + this.props.match.params.id, {
        $push: { words: { word: word.word._id } },
      })
      .then((apiRes) => {})

      .catch((apiErr) => console.log(apiErr));
  };

  addWord = (event) => {
    this.setState({
      addWord: (
        <CreateWord
          handleWord={this.handleWord}
          sentence={this.props.match.params.id}
        />
      ),
    });
  };

  render() {
    if (!this.state.sentence) {
      return <div>Loading</div>;
    }

    return (
      <div className="container">
        <h1 className="arabic">{this.state.sentence.arabic}</h1>
        <br />
        <span>Google : {this.state.sentence.google}</span>
        <span>Roman : {this.state.sentence.latin}</span>
        <span>Roman : {this.state.sentence.latin2}</span>
        <h4>French : {this.state.sentence.french}</h4>

        <div style={{ marginTop: "20px" }}>
          Phrase traitée
          <label className="switch">
            <input
              type="checkbox"
              checked={this.state.isDone === true}
              onChange={this.done}
            />
            <span onClick={() => this.done} className="slider round"></span>
          </label>
        </div>
        <div style={{ marginTop: "40px" }}>
          <span className="btn red" onClick={() => this.addWord()}>
            {" "}
            Ajouter un mot
          </span>
          <div>{this.state.addWord}</div>

          <div>
            {this.state.words &&
              this.state.words.map((word) => (
                <div key={word._id}>
                  <p>{word.arabic}</p>
                  <p>{word.french}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OneSentence;
