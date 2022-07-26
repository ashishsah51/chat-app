import React, { memo, useEffect, useState, useCallback } from "react";
import { Alert } from "rsuite";
import { useParams } from "react-router";
import { database, storage } from "../../../misc/firebase";
import { transformToArrayWithId, groupBy } from "../../../misc/helper"
import MessageItem from "./MessageItem";
import { auth } from "../../../misc/firebase";

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
                if (admins) {
                    if (admins[uid]) {
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

    const handleLike = useCallback(async (msgId) => {

        const { uid } = auth.currentUser;
        const messageRef = database.ref(`/messages/${msgId}`);

        let alertMsg;
        await messageRef.transaction(msg => {
            if (msg) {
                if (msg.likes && msg.likes[uid]) {
                    msg.likeCount -= 1;
                    msg.likes[uid] = null;
                    alertMsg = 'Like removed';
                } else {
                    msg.likeCount += 1;
                    if (!msg.likes) {
                        msg.likes = {};
                    }
                    msg.likes[uid] = true;
                    alertMsg = 'Like added';
                }
            }
            return msg;
        });

        Alert.info(alertMsg, 4000);
    }, [])

    const handleDelete = useCallback(async (msgId, file) => {

        if (!window.confirm('Delete this message?')) {
            return;
        }

        const isLast = messages[messages.length - 1].id === msgId;
        const updates = {};

        updates[`/messages/${msgId}`] = null;

        if (isLast && messages.length > 1) {
            updates[`/rooms/${chatId}/lastMessage`] = {
                ...messages[messages.length - 2],
                msgId: messages[messages.length - 2].id,
            };
        }

        if (isLast && messages.length === 1) {
            updates[`/rooms/${chatId}/lastMessage`] = null;
        }

        try {
            await database.ref().update(updates);
            Alert.info('Messages has been deleted', 4000);
        } catch (err) {
            return Alert.error(err.message, 4000);
        }

        if (file) {
            try {
                const fileRef = storage.refFromURL(file.url);
                await fileRef.delete();
            } catch (err) {
                Alert.error(err.message, 4000);
            }
        }

    }, [chatId, messages]);


    const renderMessage = () => {
        const groups = groupBy(messages,
            (item) => new Date(item.createdAt).toDateString()
        );
        let items = [];

        Object.keys(groups).forEach((date) => {

            items.push(
                <li key={date} className="text-center mb-1 padded" >
                    {date}
                </li>
            );

            const msgs = groups[date].map(msg => (
                <MessageItem
                    key={msg.id}
                    message={msg}
                    handleAdmin={handleAdmin}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
            ));
            items.push(...msgs);
        })
        return items;
    }

    return (
        <ul className="msg-list custom-scroll">
            {isChatEmpty && <li>No message yet</li>}
            {canShowMessages && renderMessage()}
        </ul>
    )
}

export default memo(Messages);