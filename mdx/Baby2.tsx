import React from "react";
import { Button, Textarea, Center, Badge } from '@mantine/core';
import { useState, useEffect } from 'react';

import { chatStream } from 'store/chat';

let global_timmer = 1;
export default function Baby2({ prompt, image }: any) {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI3LCJleHAiOjE3NDEzNjI5OTl9.WbmI1f7d2m_Qkqx6vq5tDWQCvPjRXEDmAnU7blpkTfY';
    const [content, setContent] = useState('');
    const getStory = (userInput: string) => {
        try {
           
            let _content = '';
            chatStream({
                version: 'v1',
                messages: [{
                    role: 'user',
                    content: userInput
                }],
                config: {
                    stream: true,
                    max_tokens: 1024
                },
                onFinish: (msg) => {

                },
                onUpdate: (responseText: string, delta: string) => {
                    _content += delta;
                    setContent(_content);
                }
            }, token);

        } catch (e) {

        }
    };


    useEffect(() => {
        if(global_timmer === 1) {
            global_timmer++;
            getStory(prompt);   
        }
    }, []);

    return (
        <div>
            <Center mb={12}> 
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>{prompt}</Badge>
            </Center>
            <div >
                <Textarea
                    minRows={18}
                    maxRows={20}
                    value={content}
                    onChange={(event) => setContent(event.currentTarget.value)} />
            </div>
            <Center mt={12}>
                <Button mr={16}>进入绘图制作</Button>
                <Button
                    onClick={() => { 
                        setContent('');
                        getStory(prompt); 
                     }}>重新制作</Button>
            </Center>
        </div>
    );
}
