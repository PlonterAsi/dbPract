window.Restaurants = React.createClass({
  getInitialState: function () {
    return {
      restaurants: [],
    };
  },
  render: function () {
    let restaurants = this.state.restaurants;

    restaurants = restaurants.map((restaurant, index) => {
      return (
        <li
          key={index}
          className={restaurant.available ? "available" : "notAvailable"}
        >
          <div id="left">
            <span className={restaurant.available}></span>
          </div>
          <div id="right">
            <span
              id="list-entry"
              className="name"
            >{`name: ${restaurant.name}`}</span>
            <span
              id="list-entry"
              className="phone"
            >{`phone: ${restaurant.phone}`}</span>
            <span id="list-entry" className="city">{`nummber of brances: ${
              restaurant.branches.length + 1
            }`}</span>
            <span
              id="list-entry"
              className="branch_cities"
            >{`cities: ${this.getAllBranchesCities(restaurant)}`}</span>
          </div>
        </li>
      );
    });
    return (
      <div id="rest-container">
        <form id="search" onSubmit={this.handleSubmit}>
          <label for="">
            Enter the number of the latest restaurants opened
          </label>
          <input
            type="text"
            ref="restNumb"
            placeholder="Number of restaurants to display"
          />
          <input type="submit" value="Find restaurants" id="find_restaurants" />
          <ul>{restaurants}</ul>
        </form>
      </div>
    );
  },
  getAllBranchesCities: (restaurant) => {
    const cities = [];
    restaurant.branches.forEach((branch) => {
      cities.push(branch.location.city);
    });
    return cities.join(", ");
  },
  handleSubmit: function (event) {
    event.preventDefault();
    let restNumb = this.refs.restNumb.value;

    fetch(`/api/restaurants?limit=${restNumb}`)
      .then(function (data) {
        return data.json();
      })
      .then((json) => {
        this.setState({ restaurants: json });
      });
  },
});
