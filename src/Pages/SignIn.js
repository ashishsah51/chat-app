import React from "react";
import firebase from 'firebase/app'
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from "rsuite";
import { auth, database } from "../misc/firebase";

const SignIn = () => {

    const signInWIthProvider = async (provider) => {
        try {
            const {additionalUserInfo, user} = await auth.signInWithPopup(provider);

            if(additionalUserInfo.isNewUser) {
                database.ref(`/Profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }

            Alert.success('Signed in ', 40000);
        } catch(err) {
            Alert.error(err.message, 4000);
        }
    }

    const onFacebookSignIn = () => {
        signInWIthProvider( new firebase.auth.FacebookAuthProvider() );
    }

    const onGoogleSignIn = () => {
        signInWIthProvider(new firebase.auth.GoogleAuthProvider() );
    }


    return (
        <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center">
                                <h2>Welcome to Chat</h2>
                                <p>Progressive chat platfrom for neophytes</p>
                            </div>
                            
                            <div className="mt-3">
                                <Button color="blue" appearance="primary" block onClick={onFacebookSignIn} >
                                   <Icon icon='facebook' />  Continue With Facebook
                                </Button>
                                <Button color="green" appearance="primary" block onClick={onGoogleSignIn} >
                                <Icon icon='google' />   Continue With Google
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
}

export default SignIn;