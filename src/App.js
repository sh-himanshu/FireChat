import '@fontsource/roboto';
import { Toolbar } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import GoogleIcon from '@material-ui/icons/Google';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './App.css';
import ResponsiveDrawer from './components/base-drawer/BaseDrawer';
import ContextMenu from './components/context-menu/ContextMenu';
import FacebookCircularProgress from './components/progress/Spinner';
import SendButton from './components/send-button/SendButton';
import InputTextField from './components/text-input/TextInput';
import AvatarTooltips from './components/user-info/UserInfo';
import ParseDate from './utils/date';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyDNd2ux5wyRogGYk66x8T4UGubXjU8wpFU',
        authDomain: 'fir-fire-58527.firebaseapp.com',
        projectId: 'fir-fire-58527',
        storageBucket: 'fir-fire-58527.appspot.com',
        messagingSenderId: '667216765023',
        appId: '1:667216765023:web:5641e38a3631d35109fbea',
        measurementId: 'G-YFXP4D80DS',
    });
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
    const [user, loading, error] = useAuthState(auth);

    const main = error ? (
        <h3> Error: {error}</h3>
    ) : loading ? (
        <FacebookCircularProgress />
    ) : (
        <div className="App">
            <header></header>
            <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
    );
    return <ResponsiveDrawer main={main} auth={auth} />;
}

const SignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{
                my: '150px',
            }}
        >
            <Button
                className="sign-in"
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={() => auth.signInWithPopup(provider)}
            >
                Sign in with Google
            </Button>

            <Alert variant="outlined" severity="info">
                Do not violate the community guidelines or you will be banned
                for life!
            </Alert>
        </Stack>
    );
};

const maxCharLength = 4096;
const drawerWidth = 240;

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages, loading, error] = useCollectionData(query, {
        idField: 'id',
    });
    const [formValue, setFormValue] = useState('');
    if (error) {
        console.error(error);
        return;
    }
    if (loading) {
        return <FacebookCircularProgress />;
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (isEmpty(formValue)) {
            return;
        }
        const { uid, photoURL, displayName } = auth.currentUser;
        await messagesRef.add({
            text: formValue.trim().slice(0, maxCharLength),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
        });
        setFormValue('');
        dummy.current.scrollIntoView({ behaviour: 'smooth' });
    };
    return (
        <>
            <div id="message-box">
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                <div ref={dummy}></div>
            </div>
            <AppBar
                position="fixed"
                color="inherit"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    top: 'auto',
                    bottom: 0,
                }}
            >
                <Toolbar sx={{ py: 1.5, mb: 0 }}>
                    <form onSubmit={(e) => sendMessage(e)} id="botton-form">
                        <SendButton disabled={isEmpty(formValue)} />
                        <div id="text-field-control">
                            <InputTextField
                                id="reddit-input"
                                label="Write a message..."
                                multiline
                                maxRows={7}
                                value={formValue}
                                onChange={(e) => {
                                    setFormValue(e.target.value);
                                }}
                                variant="filled"
                                error={
                                    formValue &&
                                    formValue.length > maxCharLength
                                        ? true
                                        : false
                                }
                                helperText={
                                    formValue &&
                                    formValue.trim().length > maxCharLength
                                        ? 'Message must be under ' +
                                          maxCharLength +
                                          ' characters.'
                                        : ''
                                }
                                fullWidth
                            />
                        </div>
                    </form>
                </Toolbar>
            </AppBar>
        </>
    );
}

function ChatMessage(props) {
    const { text, uid, photoURL, createdAt, displayName } = props.message;
    const dateTime = createdAt ? ParseDate(createdAt.toDate()) : '...';
    if (uid === auth.currentUser.uid) {
        const msgBody = (
            <Paper
                sx={{
                    maxWidth: 400,
                    my: 1,
                    mx: 0,
                    p: 1.5,
                }}
                style={{ borderRadius: '20px' }}
            >
                <Grid
                    container
                    wrap="nowrap"
                    spacing={1}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Typography sx={{ fontSize: '.9rem' }}>
                            {text}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{ fontSize: '0.7rem' }}
                            color="text.secondary"
                        >
                            {dateTime}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-end"
            >
                <ContextMenu msgBody={msgBody} />
            </Stack>
        );
    } else {
        const msgBody = (
            <Paper
                sx={{ maxWidth: 400, my: 1, mx: 0, p: 1.5 }}
                style={{ borderRadius: '20px' }}
            >
                <Grid
                    container
                    wrap="nowrap"
                    spacing={1}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Typography sx={{ fontSize: '.9rem' }}>
                            {text}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{ fontSize: '0.7rem' }}
                            color="text.secondary"
                        >
                            {dateTime}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                sx={{ py: 0 }}
            >
                <AvatarTooltips photoURL={photoURL} displayName={displayName} />
                <ContextMenu msgBody={msgBody} />
            </Stack>
        );
    }
}

function isEmpty(text) {
    return text === null || text.trim() === '' ? true : false;
}

export default App;
