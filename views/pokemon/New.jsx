var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="pokemon-form" method="POST" action="/pokemon">
              name:<input name="name" type="text" />
            </div>
            <div className="pokemon-attribute">
              img:<input name="img" type="text" />
            </div>
            <div className="pokemon-attribute">
              height:<input name="height" type="text" />
            </div>
            <div className="pokemon-attribute">
              weight:<input name="weight" type="text" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
