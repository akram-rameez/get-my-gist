import React from "react";
import PropTypes from "prop-types";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { Chip, LinearProgress } from "@material-ui/core";
import RequestHandler from "../../utils/requestHandler";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const getForksForGist = (forkURL) => {
  const cleanURL = forkURL.replace("https://api.github.com", "");
  return RequestHandler.fetch(cleanURL, { method: "GET" });
};

const getGists = async (username, from, callback) => {
  let page = 1;
  const perPage = 50;
  let forks = [];

  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const response = await RequestHandler.fetch(
      `/users/${username}/gists`,
      {
        method: "GET",
      },
      { per_page: perPage, page }
    );

    const forkList = Promise.all(
      response.map((row) => {
        const { forks_url: forkURL } = row;
        return getForksForGist(forkURL);
      })
    );

    forks = [...forks, ...response.map((row) => ({ ...row, forkList }))];

    if (response.length < 50) {
      break;
    } else {
      page += 1;
    }
  }

  callback(forks);
};

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "description",
    headerName: "Description",
    editable: false,
    flex: 1,
    minWidth: 200,
  },
  {
    field: "fileTypes",
    headerName: "File Types",
    valueGetter: (params) => {
      const { row: { files = {} } = {} } = params;

      const fileNames = Object.keys(files);
      return fileNames.map((x) => files[x].language).filter(Boolean);
    },
    renderCell: (params) => {
      const { value } = params;

      return value.map((label) => (
        <Chip style={{ marginRight: 10 }} label={label} />
      ));
    },
    flex: 1,
    minWidth: 200,
  },
];

const GistList = (props) => {
  const { username } = props;
  // eslint-disable-next-line no-unused-vars
  const [gists, setGists] = React.useState([]);

  React.useEffect(() => {
    getGists(username, 0, setGists);
    return () => {
      setGists(null);
    };
  }, [username]);

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        className="data-grid"
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        loading={!gists}
        rows={gists}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
};

GistList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GistList;
