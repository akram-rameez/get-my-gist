import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar, Container } from "@material-ui/core";
import GistList from "./components/gistList";
import SearchUser from "./components/searchUser";

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

  const onClear = React.useCallback(() => {
    setUser(null);
  }, []);

  return (
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
  );
}

export default App;
