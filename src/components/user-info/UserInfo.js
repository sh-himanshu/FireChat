import * as React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Avatar from '@material-ui/core/Avatar';

export default function AvatarTooltips(props) {
    const [open, setOpen] = React.useState(false);
    const [photoURL, displayName] = props;
    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={displayName || 'None'}
                >
                    <Avatar
                        alt="avatar"
                        src={photoURL || 'https://i.stack.imgur.com/34AD2.jpg'}
                        sx={{ width: 40, height: 40, mt: '10px' }}
                        onClick={handleTooltipOpen}
                    />
                </Tooltip>
            </div>
        </ClickAwayListener>
    );
}
