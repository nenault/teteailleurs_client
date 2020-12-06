import React, { Component } from "react";
import apiHandler from "../../api/apiHandler.js";

class FormWord extends Component {
  state = {
    arabic: "",
    google: "",
    latin: "",
    french: "",
    type: "Mot",
    sentence: this.props.sentence,
    isVerb: false,
  };

  componentDidMount() {
    if (this.props.action === "edit") {
      apiHandler
        .getOne("/api/calls/", this.props.id)
        .then((apiRes) => {
          const word = apiRes.data;
          this.setState({
            arabic: word.arabic,
            google: word.google,
            latin: word.latin,
            french: word.french,
            type: word.type,
            sentence: word.sentence,
            isVerb: word.isVerb,
          });
        })
        .catch((apiErr) => {
          console.log(apiErr);
        });
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleChangeCheckbox = () => {
    this.setState({
      isVerb: !this.state.isVerb,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.action === "edit") {
      this.updateWord();
    } else {
      this.createWord();
    }
  };

  createWord() {
    apiHandler
      .createOne("/api/words", this.state)
      .then((apiRes) => {
        this.props.handleWord(apiRes.data);
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  }

  updateWord = () => {
    apiHandler
      .updateOne("/api/words/" + this.props.id, this.state)
      .then((apiRes) =>  this.props.handleWord(apiRes.data))
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="ItemForm-container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className="label" htmlFor="arabic">
                arabic
              </label>
              <br />
              <input
                className="compte-rendu"
                id="arabic"
                type="text"
                name="arabic"
                value={this.state.arabic}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="google">
                google
              </label>
              <br />
              <input
                id="google"
                type="text"
                name="google"
                value={this.state.google}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="latin">
                latin
              </label>
              <br />
              <input
                id="latin"
                type="text"
                name="latin"
                value={this.state.latin}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="french">
                french
              </label>
              <br />
              <input
                id="french"
                type="text"
                name="french"
                value={this.state.french}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="type">
                type
              </label>

              <select
                id="type"
                value={this.state.type}
                name="type"
                onChange={this.handleChange}
              >
                <option value="Mot">Mot</option>
                <option value="Expression">Expression</option>
              </select>
            </div>

            <div>
              <input
                style={{ padding: "8px" }}
                id="isVerb"
                type="checkbox"
                name="isVerb"
                value={this.state.isVerb}
                onChange={this.handleChangeCheckbox}
              />
              <label
                style={{ marginLeft: "4px" }}
                className="label"
                htmlFor="isVerb"
              >
                verbe
              </label>
            </div>

            <button className="btn small" style={{ marginTop: "10px" }}>
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormWord;
