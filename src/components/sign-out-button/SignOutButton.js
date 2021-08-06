import Fab from '@material-ui/core/Fab';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import * as React from 'react';

export default function SignOutButton(props) {
    return (
        <Fab color="secondary" aria-label="sign out" onClick={props.onClick}>
            <ExitToAppRoundedIcon />
        </Fab>
    );
}
