import React, { useMemo } from "react";
import { Table, Button } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import MDXContainer from 'components/MDXContainer';
import { chatStream } from 'store/chat';
import { MessageType, ChatMessage } from 'types/chat';
import styles from 'styles/chat.module.scss';


const Generate = React.memo(
    function ChatA({ prompt }: any) {
        let token = '';
        const [userInput, setUserInput] = useState(prompt);
        const [loading, setLoading] = useState(false);
        const [messages, setMessages] = useState<ChatMessage[]>([
        ]);

        const messageListRef = useRef(null);
        useEffect(() => {
            const messageList: any = messageListRef.current;
            messageList.scrollTop = messageList.scrollHeight;
        }, [messages]);

        const getStory = () => {
            const currentMessage: ChatMessage[] = [
                ...messages,
                {
                    message: userInput,
                    type: MessageType.USER,
                    sourceIdx: -1,
                    showFeedback: false,
                    liked: false,
                    disLiked: false,
                },
            ];
            setLoading(true);
            setMessages(currentMessage);
            try {
                const _preMessages = JSON.parse(JSON.stringify(currentMessage));
                const newMessage = {
                    message: "",
                    type: "assistant",
                    sourceIdx: -1,
                    showFeedback: false,
                    liked: false,
                    disLiked: false,
                };
                setUserInput("");
                const requestMessage = currentMessage.map((item) => {
                    return {
                        role: item.type,
                        content: item.message
                    }
                })
                chatStream({
                    version: 'v1',
                    messages: requestMessage,
                    config: {
                        stream: true,
                        max_tokens: 1024
                    },
                    onFinish: (msg) => {
                        setLoading(false);
                    },
                    onUpdate: (responseText: string, delta: string) => {
                        newMessage.message += delta;
                        setMessages([..._preMessages, newMessage]);
                    }
                }, token);

            } catch (e) {

            }
        };
        const userResponseWithUI = (assistant: string) => {
            const currentMessage: ChatMessage[] = [
                ...messages,
                {
                    message: assistant,
                    type: MessageType.USER,
                    sourceIdx: -1,
                    showFeedback: false,
                    liked: false,
                    disLiked: false,
                },
            ];
            setLoading(true);
            setMessages(currentMessage);
            try {
                const _preMessages = JSON.parse(JSON.stringify(currentMessage));
                const newMessage = {
                    message: "",
                    type: "assistant",
                    sourceIdx: -1,
                    showFeedback: false,
                    liked: false,
                    disLiked: false,
                };
                setUserInput("");
                chatStream({
                    version: 'v1',
                    messages: [{
                        role: 'user',
                        content: assistant
                    }],
                    config: {
                        stream: true,
                        max_tokens: 1024
                    },
                    onFinish: (msg) => {
                        setLoading(false);
                    },
                    onUpdate: (responseText: string, delta: string) => {
                        newMessage.message += delta;
                        setMessages([..._preMessages, newMessage]);
                    }
                }, token);

            } catch (e) {

            }
        }

        useEffect(() => {
            getStory();
        }, []);

        return (
            <>
                <div className={styles.main}>
                    <div className={styles.cloud}>
                        <div ref={messageListRef} className={styles.messagelist}>
                            {messages.map((message: ChatMessage, index: number) => {
                                if (message.type === MessageType.USER) {
                                    return null
                                }
                                return (
                                    <div
                                        key={index}
                                        className={

                                            loading
                                                ? styles.usermessagewaiting
                                                : styles.apimessage
                                        }
                                    >

                                        <div className={styles.markdownanswer}>
                                            <MDXContainer content={message.message} scope={{ userResponseWithUI }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    });


export default function Baby2({ prompt, image }: any) {

    const generate = useMemo(() => <Generate prompt={prompt} />, [prompt]);
    return (
        <div>
            <div>您绘制的主题: {prompt}</div>

            <div>
                {generate}
            </div>
            <Button>进入绘图制作</Button>
        </div>
    );
}
