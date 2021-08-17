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
import RequestHandler from "../../utils/requestHandler";

// eslint-disable-next-line no-unused-vars
const getForksForGist = async (forkURL, callback) => {
  const cleanURL = forkURL.replace("https://api.github.com", "");
  const response = await RequestHandler.fetch(
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
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
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
              owner: { avatar_url: image, id, login } = {},
            } = d;

            return (
              <a href={url} target="_blank" rel="noreferrer">
                <Chip
                  key={id}
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
              <Typography className={classes.heading}>
                {description}
                {!description && (
                  <span style={{ color: "#eaeaea", fontSize: 10 }}>
                    No Description Available
                  </span>
                )}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                <a href={url} target="_blank" rel="noreferrer">
                  {id}
                </a>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="filetypes-badges">
                  {(fileTypes || []).map((label) => (
                    <Chip style={{ marginRight: 10 }} label={label} />
                  ))}
                </div>
                <ForkContainer
                  data={gistForkMap[id]}
                  onMount={() => {
                    if (!gistForkMap[id])
                      getForksForGist(forksURL, (data) =>
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
