import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import Dashboard from ".";
import { useModalState } from "../../misc/custom-hook";


const DashboardToggle = () => {

    const { isOpen, close, open } = useModalState();


    return (
        <>
           <Button block appearance="primary" color="blue" onClick={open}>
               <Icon icon="dashboard"></Icon> Dashboard
           </Button>
           <Drawer show={isOpen} onHide={close} placement="left">
            <Dashboard></Dashboard>
           </Drawer>
        </>
    )
}

export default DashboardToggle;