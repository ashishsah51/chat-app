import React, { memo, useEffect, useState, useCallback } from "react";
import { Alert } from "rsuite";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";
import { transformToArrayWithId } from "../../../misc/helper"
import MessageItem from "./MessageItem";

//import { useCurrentRoom } from "../../../context/current-room.context";

const Messages = () => {
    //const messages = useCurrentRoom(v => v.description);
    const { chatId } = useParams();
    const [messages, setMessages] = useState(null);

    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;

    useEffect(() => {
        const messagesRef = database.ref('/messages');

        messagesRef.orderByChild('roomId').equalTo(chatId).on('value', (snap) => {
            
            const data = transformToArrayWithId(snap.val());

            setMessages(data);
        })

        return () => {
            messagesRef.off('value');
        }

    }, [chatId]);

    const handleAdmin = useCallback(
      async (uid) => {
        const adminsRef = database.ref(`/rooms/${chatId}/admins`);

        let alertMsg;
        await adminsRef.transaction(admins => {
            if(admins) {
                if(admins[uid]) {
                    admins[uid] = null;
                    alertMsg = 'Admin permissin removed';
                } else {
                    admins[uid] = true;
                    alertMsg = 'Admin permissin granted';
                }
            }
            return admins;
        });

        Alert.info(alertMsg, 4000);

      },
      [chatId],
    )
    

    return (
        <ul className="msg-list custom-scroll">
            {isChatEmpty && <li>No message yet</li>}
            {canShowMessages && messages.map(msg => <MessageItem 
               key={msg.id} 
               message={msg} 
               handleAdmin={handleAdmin} 
            />)}
        </ul>
    )
}

export default memo(Messages);