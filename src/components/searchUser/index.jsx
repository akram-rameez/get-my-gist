import React from "react";
import PropTypes from "prop-types";
import RequestHandler from "../../utils/requestHandler";

const SearchUser = (props) => {
  const { onSuccessfulSearch } = props;
  const [error, setError] = React.useState("");

  const onFormSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const username = formData.get("username");

      const searchResult = await RequestHandler.fetch(
        "/search/users",
        { method: "GET" },
        { q: username }
      );

      const { total_count: totalCount, items } = searchResult;
      if (totalCount === 1) {
        setError("");

        const [{ login }] = items;
        onSuccessfulSearch(login);
      } else if (totalCount > 0) {
        setError("multiple users found");
      } else {
        setError("no user found");
      }
    },
    [onSuccessfulSearch]
  );

  return (
    <form onSubmit={onFormSubmit}>
      <input type="string" required name="username" />
      <button type="submit">Search</button>
      <div>{error}</div>
    </form>
  );
};

SearchUser.propTypes = {
  onSuccessfulSearch: PropTypes.func,
};

SearchUser.defaultProps = {
  onSuccessfulSearch: (...args) => console.log(args),
};

export default SearchUser;
