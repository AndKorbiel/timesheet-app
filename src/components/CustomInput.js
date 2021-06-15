import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function CustomInput(props) {
    return (
        <form autoComplete={"off"}>
            {props.inputs.map(el => {
                return (
                    <TextField
                        variant={"outlined"}
                        helperText={el.validation ? "Incorrect entry" : ''}
                        error={el.validation}
                        label={el.name}
                        key={el.name}
                        onChange={(e)=> props.actionOnChange(e)} />
                )}
            )}
            <Button variant="contained" color="primary" onClick={props.actionOnSubmit}>
                Submit
            </Button>
        </form>
    )
}