var React = require("react");

class Show extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <ul className="user-list">
              <li className="user-attribute">
                id: {this.props.users.id}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;
