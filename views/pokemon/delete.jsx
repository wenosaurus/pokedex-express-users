var React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>Delete a Pokemon</h1>
          <form className="delete-pokemon-form" method="POST" action={"/pokemon/"+ this.props.pokemon.id + "?_method=delete"}>
            <input type="submit" value="Submit Delete" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
