import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import GistList from "./components/gistList";
import SearchUser from "./components/searchUser";
import getRequestHandler from "./utils/requestHandler";
import { RequestHandlerProvider } from "./context/requestHandler";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [user, setUser] = React.useState(null);
  const classes = useStyles();

  const [error, setError] = React.useState(null);

  const requestHandler = React.useMemo(
    () =>
      getRequestHandler((e) => {
        switch (e.message) {
          case "RateLimitExceeded":
            setError(
              "You have reached API rate limits for the project. Please reload the page and try again after sometime"
            );
            break;
          default:
            setError("Unknown Error experienced");
        }
      }),
    []
  );

  const onClear = React.useCallback(() => {
    setUser(null);
  }, []);

  const clearErrorMessage = React.useCallback(() => {
    setError(null);
  }, []);

  return (
    <RequestHandlerProvider value={requestHandler}>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={clearErrorMessage}
      >
        <Alert onClose={clearErrorMessage} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Git my Gist
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className="app-root" height="100%">
          {<SearchUser onSelect={setUser} onClear={onClear} />}
          {!!user && <GistList key={user} username={user} />}
        </Container>
      </div>
    </RequestHandlerProvider>
  );
}

export default App;
