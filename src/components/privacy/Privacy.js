import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stack from '@material-ui/core/Stack';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PrivacyTipRoundedIcon from '@material-ui/icons/PrivacyTipRounded';
import * as React from 'react';

export default function PrivacyPopUp() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Stack
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ pt: '2rem' }}
            >
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    startIcon={<PrivacyTipRoundedIcon />}
                >
                    Privacy Mode
                </Button>
            </Stack>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Allow Google's location service to spy on you ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Privacy in today's world is 100% a myth.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus size="large">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
