import React, { useCallback, useState } from 'react';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';
import { Alert } from 'rsuite'; 


import { Icon, InputGroup } from 'rsuite'

const AudioMsgBtn = ({ afterUpload }) => {

    const { chatId } = useParams();

    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const onClick = useCallback(() => {
        setIsRecording(p => !p);
    }, []);

    const onUpload = useCallback(async (data) => {
        setIsUploading(true);
        try {
            const snap = await storage.ref(`/chat/${chatId}`)
                .child(`audio_${Date.now()}.mp3`)
                .put(data.blob, {
                    cacheControl: `public, max-age=${3600 * 24 * 3}`,
                });

            const file = {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                url: await snap.ref.getDownloadURL()
            }
            setIsUploading(false);
            afterUpload([file]);
            
        } catch (err) {
            setIsUploading(false);
            Alert.error(err.message, 4000);
        }
    },  [afterUpload, chatId]
    )
    return (
        <div>
            <InputGroup.Button 
               onClick={onClick}
               disabled={isUploading}
               className={isRecording ? 'animate-blink' : ''}
            >
                <Icon icon="microphone"></Icon>
                <ReactMic
                    record={isRecording}
                    className="d-none"
                    onStop={onUpload}
                    mimeType="audio/mp3"
                />
            </InputGroup.Button>
        </div>
    )
}

export default AudioMsgBtn