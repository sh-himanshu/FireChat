import Fab from '@material-ui/core/Fab';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import * as React from 'react';

export default function SendButton(props) {
    return (
        <Fab
            color="secondary"
            aria-label="send"
            type="submit"
            disabled={props.disabled}
            style={{ float: 'right' }}
        >
            <SendRoundedIcon />
        </Fab>
    );
}
