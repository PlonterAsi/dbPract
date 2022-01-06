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
        location: {
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
          getometry: {
            type: "Point",
            coordinates: [generateRandomLatLng(), generateRandomLatLng()],
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
      branches: this.handleBranches(),
      available: true,
    };

    fetch(`/api/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      document.querySelector(".list").click();
      document.querySelector("#find_restaurants").click();
    });
  },
});

function generateRandomLatLng() {
  var num = Math.random() * 180;
  var posorneg = Math.floor(Math.random());
  if (posorneg == 0) {
    num = num * -1;
  }
  return num.toFixed(4);
}
