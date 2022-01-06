window.MenuButtons = React.createClass({
  render: function () {
    return (
      <div id="menu">
        <span>
          <button className="add" onClick={this.addView}>
            Add Restaurant
          </button>
        </span>
        <span>
          <button className="edit">Edit Restaurant</button>
        </span>
        <span>
          <button className="delete">Delete Restaurant</button>
        </span>
        <span>
          <button className="list" onClick={this.listView}>
            List Restaurants
          </button>
        </span>
      </div>
    );
  },
  addView: function () {
    ReactDOM.render(<window.NewRestaurant />, document.getElementById("main"));
  },
  //   editView: () => {
  //     ReactDOM.render(
  //       <window.NewRestaurant />,
  //       document.getElementById("mainButtons")
  //     );
  //   },
  listView: function () {
    ReactDOM.render(<window.Restaurants />, document.getElementById("main"));
  },
  //   deleteView: () => {
  //     ReactDOM.render(
  //       <window.NewRestaurant />,
  //       document.getElementById("mainButtons")
  //     );
  //   },
});
ReactDOM.render(<window.MenuButtons />, document.getElementById("mainButtons"));
