import React, { Component } from "react";
import apiHandler from "../api/apiHandler.js";
import CreateWord from "./CreateWord";
import { Link } from "react-router-dom";

class OneSentence extends Component {
  state = {
    sentence: null,
    isDone: "",
    addWord: "",
    words: [],
    allWords: [],
  };

  componentDidMount() {
    apiHandler
      .getOne("/api/sentences/", this.props.match.params.id)
      .then((apiRes) => {
        this.setState({ sentence: apiRes.data, isDone: apiRes.data.isDone });
        this.buildWords(apiRes.data.words);
        this.getWordsDB();
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

  fetchWords = (sentence) => {
    const wordsSentence = sentence.split(" ");
    // console.log(words);
    for (let [index, wordSentence] of wordsSentence.entries()) {
      // console.log(item);
      // const found = this.state.allWords.some((word) => word.arabic === item);
      // console.log(item.arabic);
      // console.log(sentence.includes(item.arabic));
      // if (item.arabic === )
      let wordPosition = wordsSentence.indexOf(wordSentence);
      // console.log(wordsSentence);
      for (const [index, wordDB] of this.state.allWords.entries()) {
        if (wordDB.arabic.includes(wordSentence)) {
          //  console.log(wordPosition);
          // wordsSentence.splice(
          //   wordPosition,
          //   0,
          //   "Nico"
          // );
          wordsSentence[wordPosition] = `${wordSentence}$`;
        }
      }
    }
    // console.log(wordsSentence);

    return wordsSentence;
  };

  cleanWords = (word) => {
  //  console.log("PLOP");
    return word.split("$")[0];
  };

  getWordsDB = () => {
    apiHandler
      .getAll("/api/words")
      .then((apiRes) => {
        this.setState({ allWords: apiRes.data });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  };

  render() {
    if (!this.state.sentence) {
      return <div>Loading</div>;
    }
    // console.log(this.state.allWords);
    return (
      <div className="container">
        <h1 className="arabic">
          {this.fetchWords(this.state.sentence.arabic).map((word) =>
            word.includes("$") ? (
              <span key={word} style={{ backgroundColor: "#FA7A55" }}>
                {this.cleanWords(word)}&nbsp;
              </span>
            ) : (
              <span key={word}>{word}&nbsp;</span>
            )
          )}
        </h1>
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
            <table>
              <thead>
                <tr>
                  <th scope="col">Arabic</th>
                  <th scope="col">Google</th>
                  <th scope="col">French</th>
                </tr>
              </thead>
              <tbody>
                {this.state.words &&
                  this.state.words.map((word) => (
                    <tr key={word._id}>
                      <td data-label="Google">
                        <Link to={`/words/${word._id}/`}>{word.arabic}</Link>
                      </td>
                      <td data-label="Google">
                        <Link to={`/words/${word._id}/`}>{word.google}</Link>
                      </td>

                      <td data-label="Google">
                        <Link to={`/words/${word._id}/`}>{word.french}</Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OneSentence;
