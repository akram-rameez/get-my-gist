import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash/debounce";
import RequestHandler from "../../utils/requestHandler";

const fetchOptions = debounce(async (inputValue, callback) => {
  if (inputValue === "") return callback([]);

  const response = await RequestHandler.fetch(
    "/search/users",
    { method: "GET" },
    { q: inputValue }
  );

  const { items } = response;
  if (!items) return callback([]);

  return callback(items);
}, 300);

const SearchUser = (props) => {
  const { onSelect } = props;

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    fetchOptions(inputValue, setOptions);
  }, [inputValue]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}
      getOptionLabel={(option) => option.login}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      freeSolo
      // includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        const { login } = newValue;
        onSelect(login);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter Username"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(option) => <div>{option.login}</div>}
    />
  );
};

SearchUser.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SearchUser;
