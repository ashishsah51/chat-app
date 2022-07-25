import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import ProfileAvatar from "../../dashboard/ProfileAvatar";
import PresenceDot from '../../PresenceDot';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/custom-hook';
import IconBtnContorl from './IconBtnContorl';


const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {

    const { author, createdAt, text, likes, likeCount } = message;

    const [selfRef, isHovered] = useHover();
    const isMobile = useMediaQuery((`(max-width: 992px)`));

    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);

    const isMsgAuthor = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;

    const canShowIcons = isMobile || isHovered;
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
    return (
        <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`} ref={selfRef}>
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
                        </Button>}
                </ProfileInfoBtnModal>
                <TimeAgo
                    datetime={createdAt}
                    className="font-normal text-black-45 ml-2"
                />

                <IconBtnContorl
                    {...(isLiked ? { color: 'red' } : {})}
                    isVisible={canShowIcons}
                    iconName='heart'
                    tooltip="Like this message"
                    onClick={() => handleLike(message.id)}
                    badgeContent={likeCount}
                />
                {isAuthor &&
                    <IconBtnContorl
                        isVisible={canShowIcons}
                        iconName='close'
                        tooltip="Delete this message"
                        onClick={() => handleDelete(message.id)}
                    />

                }
            </div>
            <div>
                <span className='word-breal-all'>{text}</span>
            </div>
        </li>
    )
}

export default memo(MessageItem);