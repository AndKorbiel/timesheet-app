import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CustomDialog({
  cancelOption,
  description,
  handleCancel,
  handleClose,
  open,
  title,
  translations,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {cancelOption && (
          <Button onClick={handleCancel} color="default" autoFocus>
            {translations.dialog_cancel}
          </Button>
        )}

        <Button onClick={handleClose} color="primary">
          {translations.dialog_accept}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
