import TextField from '@mui/material/TextField'
import SellIcon from '@mui/icons-material/Sell';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { InputAdornment } from '@mui/material';

type TagFieldType = {
    handleChangeTagField: any
    addTag: any
    value: any
}

const TagField = (props: TagFieldType) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginBottom: "0%" }}>
        <TextField 
            value={props.value}
            type={'text'}
            required = {false}
            name="tags"
            onChange={props.handleChangeTagField}
            placeholder="Tag"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SellIcon />
                    </InputAdornment>
                )
            }}
        />
        <IconButton aria-label="delete" color='success' size='large' onClick={props.addTag}>
            <AddCircleRoundedIcon />
        </IconButton>
    </div>
  )
}

export default TagField