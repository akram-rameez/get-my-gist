import React from "react";
import PropTypes from "prop-types";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { Chip, LinearProgress } from "@material-ui/core";
// import RequestHandler from "../../utils/requestHandler";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

// const getForksForGist = (forkURL) => {
//   const cleanURL = forkURL.replace("https://api.github.com", "");
//   return RequestHandler.fetch(cleanURL, { method: "GET" });
// };

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

const Grid = (props) => {
  const { gists, loading } = props;
  // eslint-disable-next-line no-unused-vars

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        className="data-grid"
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        loading={loading}
        rows={gists || []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
};

Grid.propTypes = {
  gists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      forks_url: PropTypes.string,
      files: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
          filename: PropTypes.string,
          language: PropTypes.string,
        }),
      }),
    })
  ),
  loading: PropTypes.bool,
};

Grid.defaultProps = {
  loading: true,
  gists: null,
};

export default Grid;
