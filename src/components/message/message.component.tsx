import React, {FC} from 'react';
import './message.style.css'

type MessageProps = {
    messageName: string,
    messageText: string,
    messageHours: number,
    messageMinutes: number,
    ownMessage: boolean
}

const Message: FC<MessageProps> = ({ messageName, messageText, messageHours, messageMinutes, ownMessage }) => {
    return (
        <div className={ownMessage ? 'own_message_wrapper' : 'not_own_message_wrapper'}>
            <div className={`message_container ${ownMessage ? 'own_message_bg' : 'not_own_message_bg'}`}>
                <div className="message_name">
                    <p>{messageName}</p>
                </div>
                <p className='message_text'>{messageText}</p>
                <p className='message_time'>{messageHours}:{messageMinutes}</p>
            </div>
        </div>
    )
}

export default Message;