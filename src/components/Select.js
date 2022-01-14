import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BasicSelect(props) {
  const [age, setAge] = React.useState(props.defaultValue);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width: 120 }} {...props.style}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {props.items.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
