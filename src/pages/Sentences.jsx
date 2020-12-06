import React, { Component } from "react";
import apiHandler from "../api/apiHandler.js";
import { Link } from "react-router-dom";

class WordList extends Component {
  state = {
    sentences: [],
    searchSentences: [],
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/sentences")
      .then((apiRes) => {
        this.setState({ sentences: apiRes.data, searchSentences: apiRes.data });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  render() {
    if (!this.state.sentences) {
      return <div>Loading</div>;
    }

    return (
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
            {this.state.searchSentences.map((sentence) => (
              <tr key={sentence._id}>
                <td scope="row" data-label="Arabic">
                  <Link to={`/sentences/${sentence._id}/`}>
                    {sentence.arabic}
                  </Link>
                </td>
                <td data-label="Google">
                  <Link to={`/sentences/${sentence._id}/`}>
                    {sentence.google}
                  </Link>
                </td>
                <td data-label="French">
                  <Link to={`/sentences/${sentence._id}/`}>
                    {sentence.french}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WordList;
