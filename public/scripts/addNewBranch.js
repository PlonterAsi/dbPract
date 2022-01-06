window.NewRestaurantBranch = new React.createClass({
  render: function () {
    return (
      <div id="branch_from">
        <div id="branch-inside-right">
          <div id="branch_item">
            <label for="new_rest_branch_city">city: </label>
            <input
              type="text"
              placeholder="New branch city location"
              ref="new_rest_branch_city"
              id="info_item"
              className="new_rest_branch_city"
              required
            ></input>
          </div>

          <div id="branch_item">
            <label for="new_rest_branch_street">street: </label>
            <input
              type="text"
              placeholder="New branch street location"
              ref="new_rest_branch_street"
              id="info_item"
              className="new_rest_branch_street"
              required
            ></input>
          </div>
        </div>

        <div id="branch-inside-left">
          <div id="branch_item">
            <label id="insdie_branch_from" for="new_rest_branch_street_number">
              street number:{" "}
            </label>
            <input
              type="text"
              placeholder="New branch street number"
              ref="new_rest_branch_street_number"
              id="info_item"
              className="new_rest_branch_street_number"
              required
            ></input>
          </div>

          <div id="branch_item">
            <label id="insdie_branch_from" for="new_rest_branch_phone_number">
              phone number:{" "}
            </label>
            <input
              type="text"
              placeholder="New branch phone number"
              ref="new_rest_branch_phone_number"
              id="info_item"
              className="new_rest_branch_phone_number"
              required
            ></input>
          </div>
        </div>
        <div id="delete_branch_div">
          <button
            type="button"
            id="delete_branch_btn"
            onClick={this.removeBranch}
          >
            x
          </button>
        </div>
      </div>
    );
  },
  removeBranch: function (e) {
    e.currentTarget.parentNode.parentNode.parentNode.remove();
  },
});
