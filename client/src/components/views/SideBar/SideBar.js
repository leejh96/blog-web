import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Drawer 
              className={classes.drawer}
              variant="permanent"
              classes={{
              paper: classes.drawerPaper,
              }}
              // anchor="left"//왼쪽고정
          >
              <div className={classes.toolbar} />
              <Divider />
              
              {/* 이미지랑 메뉴가져오기 */}
              <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                  </ListItem>
              ))}
              </List>
              <Divider />
              <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                  </ListItem>
              ))}
              </List>
          </Drawer>
        </div>
    );
}

export default Sidebar