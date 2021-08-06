import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import * as React from 'react';

export default function AppBarButtons() {
    return (
        <>
            <IconButton size="large" aria-label="search" color="inherit">
                <SearchRoundedIcon />
            </IconButton>
            <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
            >
                <MoreVertIcon />
            </IconButton>
        </>
    );
}
