import React, { useCallback } from "react";
import { Button, Icon, Drawer, Alert } from "rsuite";
import Dashboard from ".";
import { useMediaQuery, useModalState } from "../../misc/custom-hook";
import { auth } from "../../misc/firebase";


const DashboardToggle = () => {

    const { isOpen, close, open } = useModalState();
    const isMobile = useMediaQuery(`(max-widht: 992px)`);

    const onSignOut = useCallback(() => {
        auth.signOut();
        Alert.info('Signed out', 4000);
        close();
    }, [close])


    return (
        <>
           <Button block appearance="primary" color="blue" onClick={open}>
               <Icon icon="dashboard"></Icon> Dashboard
           </Button>
           <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
            <Dashboard onSignOut={onSignOut}></Dashboard>
           </Drawer>
        </>
    )
}

export default DashboardToggle;