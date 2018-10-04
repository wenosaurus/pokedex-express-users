var React = require("react");

class Show extends React.Component {
  render() {

    let pokemonList = this.props.relationship.map(item => {
        return <li className="{item.id}"><a href={`/pokemon/${item.id}`}>{item.name}</a></li>;
    })
    //console.log( this.props.banana)
    return (
      <html>
      <head>
        </head>
        <body>
          <div>
            {pokemonList}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;
