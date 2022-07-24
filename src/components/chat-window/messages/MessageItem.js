import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import ProfileAvatar from "../../dashboard/ProfileAvatar";
import PresenceDot from '../../PresenceDot';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import {useCurrentRoom} from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';


const MessageItem = ({ message, handleAdmin }) => {

    const { author, createdAt, text } = message;

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthor = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  return (
    <li className='padded mb-1'>
        <div className='d-flex align-items-center font-bolder mb-1'>
            <PresenceDot uid={author.uid} />

            <ProfileAvatar 
               src={author.avatar} 
               name={author.name}
               className="ml-1"
               size="xs" 
            />
            <ProfileInfoBtnModal profile={author} appearance="link" className="p-0 block text-black">
                {canGrantAdmin &&
                 <Button block onClick={() => handleAdmin(author.uid)} color="blue">
                    {isMsgAuthor ? 
                       'Remove admin permission' : 
                       'Give admin in this room'
                    }
                 </Button> }
            </ProfileInfoBtnModal>
            <TimeAgo 
                datetime= {createdAt}
                className="font-normal text-black-45 ml-2"
            />
        </div>
        <div>
            <span className='word-breal-all'>{text}</span>
        </div>
    </li>
  )
}

export default memo(MessageItem);