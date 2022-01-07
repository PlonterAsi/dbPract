window.NewRestaurant = React.createClass({
  getInitialState: function () {
    return {
      branches: [],
    };
  },
  init: function (branches) {
    if (!branches.length) this.addNewBranch();
  },
  render: function () {
    let branches = this.state.branches;
    this.init(branches);

    return (
      <form onSubmit={this.handleSubmit}>
        <div id="branch_item" required>
          <div id="branch_item">
            <label for="new_rest_name">name: </label>
            <input
              type="text"
              className="inline"
              placeholder="New restaurant name"
              ref="new_rest_name"
              id="new_rest_name"
              required
            />
          </div>

          <div id="branch_item">
            <label for="new_rest_phone">phone number: </label>
            <input
              type="text"
              className="inline"
              placeholder="New restaurant phone number"
              ref="new_rest_phone"
              id="new_rest_phone"
              required
            />
          </div>
        </div>

        <div>
          <ul ref="branches" id="branches">
            {branches}
          </ul>
          <button type="button" onClick={this.addNewBranch}>
            Add new branch
          </button>
        </div>

        <button type="submit">Submit new restaurant</button>
      </form>
    );
  },
  addNewBranch: function () {
    const branches = this.state.branches;
    branches.push(
      <li key={branches.length} id="branches_li">
        <window.NewRestaurantBranch />
      </li>
    );
    this.setState({ branches: branches });
  },
  handleBranches: function () {
    const branchList = [];
    const listElements = this.refs.branches.querySelectorAll("#branches_li");

    listElements.forEach((value) => {
      branchList.push({
        location_info: {
          city: value.children.branch_from.querySelectorAll(
            ".new_rest_branch_city"
          )[0].value,
          street: [
            value.children.branch_from.querySelectorAll(
              ".new_rest_branch_street"
            )[0].value,
            value.children.branch_from.querySelectorAll(
              ".new_rest_branch_street_number"
            )[0].value,
          ].join(" "),
          location: {
            type: "Point",
            coordinates: generateRandomLatLng(),
          },
        },
        phone: value.children.branch_from.querySelectorAll(
          ".new_rest_branch_phone_number"
        )[0].value,
      });
    });
    return branchList;
  },
  handleSubmit: async function (event) {
    event.preventDefault();
    const body = {
      name: this.refs.new_rest_name.value,
      phone: this.refs.new_rest_phone.value,
      branches: await this.handleBranches(),
      available: Math.random() < 0.5,
    };
    console.log(JSON.stringify(body, null, 2));
    fetch(`/api/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        document.querySelector(".list").click();
        document.querySelector("#find_restaurants").click();
        return data.json();
      })
      .then((json) => {
        console.log(json);
      });
  },
});

function generateRandomLatLng() {
  return [
    Math.floor(Math.random() * 10) + 80,
    Math.floor(Math.random() * 10) + 80,
  ];
}
