import React, { useEffect, useState, useRef } from "react";
import { Divider } from "rsuite";
import CreateRoomBtnModal from "./dashboard/CreateRoomBtnModal";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomList from "./rooms/ChatRoomList";


const Sidebar = () => {
    const topSidebarRef = useRef();
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if(topSidebarRef.current) {
            setHeight(topSidebarRef.current.scrollHeight);
        }
    }, [])

    return (
        <div className="h-100 pt-2">
            <div ref={topSidebarRef}>
                <DashboardToggle></DashboardToggle>
                <CreateRoomBtnModal></CreateRoomBtnModal>
                <Divider>Join conversation</Divider>
            </div>
            <ChatRoomList aboveElHeight={height}></ChatRoomList>
        </div>
    )
}

export default Sidebar;