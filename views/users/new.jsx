var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>Add New User</h1>
          <form method="POST" action="/users">
            <div>
            <p>
              name:<input name="name" type="text" /></p>
              <p>
              password:<input name="password" type="text" /></p>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
