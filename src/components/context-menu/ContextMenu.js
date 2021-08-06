import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ContentCopyRoundedIcon from '@material-ui/icons/ContentCopyRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import SelectAllRoundedIcon from '@material-ui/icons/SelectAllRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import * as React from 'react';

export default function ContextMenu(props) {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX - 2,
                      mouseY: event.clientY - 4,
                  }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                  null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div
            onContextMenu={handleContextMenu}
            style={{ cursor: 'context-menu' }}
        >
            {props.msgBody}
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EditRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Edit</Typography>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ContentCopyRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Copy</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LinkRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Link</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SelectAllRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Select all</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ReplyRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Reply</Typography>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ReportRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Report</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <DeleteRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}
