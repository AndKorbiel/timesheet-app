import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function CustomInput() {
    return (
        <form noValidate autoComplete={"off"}>
            <TextField variant={"outlined"} label="Project name" />
            <TextField variant={"outlined"} label="Hours" />
            <TextField variant={"outlined"} label="Pages" />
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </form>
    )
}