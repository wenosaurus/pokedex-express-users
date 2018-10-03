var React = require("react");

class Show extends React.Component {
  render() {

    let pokemonList = this.props.relationship.map(item => {
        return <li className={item.id}><a href="/artist/{item.id}">{item.name}</a></li>;
    })
    //console.log( this.props.banana)
    return (
      <html>
        <head />
        <body>
          <div>
            <ul>
                {pokemonList}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;
