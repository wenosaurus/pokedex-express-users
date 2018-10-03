var React = require("react");

class Relationship extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>Which pokemon did you catch?</h1>
          <form method="POST" action="/caught">
            <div>
              <p>User ID:<input name="user_id" type="text" /></p>
              <p>Pokemon ID:<input name="pokemon_id" type="text" /></p>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Relationship;