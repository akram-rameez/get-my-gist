import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash/debounce";
import RequestHandlerContext from "../../context/requestHandler";

const fetchOptions = debounce(async (inputValue, callback, requestHandler) => {
  if (inputValue === "") return callback([]);

  const response = await requestHandler.fetch(
    "/search/users",
    { method: "GET" },
    { q: inputValue }
  );

  const { items } = response || {};
  if (!items) return callback([]);

  return callback(items);
}, 300);

const SearchUser = (props) => {
  const { onSelect, onClear } = props;

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const requestHandler = React.useContext(RequestHandlerContext);

  React.useEffect(() => {
    if (!inputValue) onClear(null);

    fetchOptions(inputValue, setOptions, requestHandler);
  }, [inputValue]);

  return (
    <Autocomplete
      className="autocomplete"
      getOptionLabel={(option) => {
        if (!option.login) return option;
        return option.login;
      }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      freeSolo
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        if (!newValue) return;
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
  onClear: PropTypes.func,
};

SearchUser.defaultProps = {
  onClear: () => {},
};

export default SearchUser;
