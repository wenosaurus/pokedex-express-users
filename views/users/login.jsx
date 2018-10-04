var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>User Login</h1>
          <form method="POST" action="/login">
            <div>
            <p>
              ID:<input name="id" type="text" /></p>
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

module.exports = Login;