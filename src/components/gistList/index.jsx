import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import RequestHandler from "../../utils/requestHandler";

const getGists = debounce(async (username, from, callback) => {
  const response = await RequestHandler.fetch(`/users/${username}/gists`, {
    method: "GET",
  });

  callback(response);
}, 500);

const GistList = (props) => {
  const { username } = props;
  const [gists, setGists] = React.useState([]);

  const appendGists = React.useCallback((gistList) => {
    setGists((list) => [...list, ...gistList]);
  }, []);

  React.useEffect(() => {
    getGists(username, 0, appendGists);
  }, []);

  return <div>found {gists.length} gists</div>;
};

GistList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GistList;
