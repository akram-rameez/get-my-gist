import React from "react";
import PropTypes from "prop-types";
// import Grid from "./datagridList";
import AccordionList from "./accordionList";
import RequestHandlerContext from "../../context/requestHandler";

// const getForksForGist = (forkURL) => {
//   const cleanURL = forkURL.replace("https://api.github.com", "");
//   return RequestHandler.fetch(cleanURL, { method: "GET" });
// };

const getGists = async (username, fetcher, callback) => {
  let page = 1;
  const perPage = 50;
  let forks = [];

  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const response = await fetcher.fetch(
      `/users/${username}/gists`,
      {
        method: "GET",
      },
      { per_page: perPage, page }
    );

    // const forkList = Promise.all(
    //   response.map((row) => {
    //     const { forks_url: forkURL } = row;
    //     return getForksForGist(forkURL);
    //   })
    // );

    if (!response) {
      return callback(forks);
    }

    forks = [...forks, ...response];
    // forks = [...forks, ...response.map((row) => ({ ...row, forkList }))];

    if (response.length < 50) {
      break;
    } else {
      page += 1;
    }
  }

  return callback(forks);
};

const GistList = (props) => {
  const { username } = props;
  // eslint-disable-next-line no-unused-vars
  const [gists, setGists] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [gistForkMap, updateGistForksMap] = React.useReducer(
    (state, action) => {
      const { id, data } = action;
      return { ...state, [id]: data };
    },
    {}
  );

  const requestHandler = React.useContext(RequestHandlerContext);

  React.useEffect(() => {
    getGists(username, requestHandler, setGists);
    setLoading(false);

    return () => {
      setGists(null);
      setLoading(true);
    };
  }, [username]);

  // return <Grid gists={gists} loading={loading} />;
  return (
    <AccordionList
      gists={gists}
      loading={loading}
      gistForkMap={gistForkMap}
      updateGistForksMap={updateGistForksMap}
    />
  );
};

GistList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GistList;
