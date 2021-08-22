import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Chip,
  LinearProgress,
  Avatar,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import RequestHandlerContext from "../../context/requestHandler";

// eslint-disable-next-line no-unused-vars
const getForksForGist = async (forkURL, fetcher, callback) => {
  const cleanURL = forkURL.replace("https://api.github.com", "");
  const response = await fetcher.fetch(
    cleanURL,
    { method: "GET" },
    {
      per_page: 3,
      // sort: "created-at-asc",
    }
  );

  return callback(response);
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "70%",
    flexShrink: 0,
  },
  secondaryHeading: {
    flexBasis: "30%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ForkContainer = (props) => {
  const { data, onMount } = props;

  React.useEffect(() => {
    onMount();
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      {!data && <LinearProgress />}
      {!!data && (
        <div>
          {data.map((d) => {
            const {
              html_url: url,
              owner: { avatar_url: image, id, node_id: nodeId, login } = {},
              updated_at: updatedAt,
            } = d;

            return (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                key={`${id}-${nodeId}__${updatedAt}`}
              >
                <Chip
                  avatar={<Avatar alt={login} src={image} />}
                  label={login}
                  color="primary"
                  variant="outlined"
                  style={{ marginRight: 10 }}
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

ForkContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      id: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
      }),
    })
  ),
  onMount: PropTypes.func,
};

ForkContainer.defaultProps = {
  data: null,
  onMount: () => {},
};

const AccordionList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { gists, loading, gistForkMap, updateGistForksMap } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const requestHandler = React.useContext(RequestHandlerContext);

  if (loading) return <LinearProgress />;

  return (
    <div className={classes.root}>
      {(gists || []).map((gist) => {
        const {
          id,
          html_url: url,
          forks_url: forksURL,
          files,
          description,
        } = gist;

        const fileNames = Object.keys(files);
        const fileTypes = [
          ...new Set(fileNames.map((x) => files[x].language)),
        ].filter(Boolean);

        return (
          <Accordion
            key={id}
            expanded={expanded === id}
            onChange={handleChange(id)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading} key="heading">
                {description}
                {!description && (
                  <span style={{ color: "#eaeaea", fontSize: 10 }}>
                    No Description Available
                  </span>
                )}
              </Typography>
              <Typography className={classes.secondaryHeading} key="id">
                <a href={url} target="_blank" rel="noreferrer">
                  {id}
                </a>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography key="file-types">
                <div className="filetypes-badges">
                  {(fileTypes || []).map((label) => (
                    <Chip style={{ marginRight: 10 }} label={label} />
                  ))}
                </div>
                <ForkContainer
                  data={gistForkMap[id]}
                  onMount={() => {
                    if (!gistForkMap[id])
                      getForksForGist(forksURL, requestHandler, (data) =>
                        updateGistForksMap({ id, data })
                      );
                  }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

AccordionList.propTypes = {
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
  gistForkMap: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      url: PropTypes.string,
      id: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
      }),
    }),
  }),
  updateGistForksMap: PropTypes.func,
};

AccordionList.defaultProps = {
  loading: true,
  gists: null,
  gistForkMap: {},
  updateGistForksMap: () => {},
};

export default AccordionList;
