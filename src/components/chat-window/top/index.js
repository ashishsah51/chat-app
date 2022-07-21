import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { ButtonToolbar, Icon } from "rsuite";
import { Link } from "react-router-dom";
import { useMediaQuery } from '../../../misc/custom-hook';
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {

    const name = useCurrentRoom(v => v.name);
    const isMobile = useMediaQuery('(max-width: 992px)');
    //console.log(isMobile);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">

                <h4 className="text-appear d-flex align-items-center">
                    {isMobile &&
                        <Icon componentClass={Link}
                            to='/'
                            icon="arrow-circle-left"
                            size="2x"
                            className='d-inline-block p-0 mr-2 text-blue link-unstyled'
                        />
                    }
                    <span>{name}</span>
                </h4>

                <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <span>todo</span>
                <RoomInfoBtnModal />
            </div>
        </div>
    )
}

export default memo(Top);