import React from "react";
import { Table, Button } from '@mantine/core';






export default function Baby({ prompt }: any) {

    
    return (
       <div style={{border: '1px solid red' ,padding: 10}} >用户问题：{prompt}  <Button>继续</Button></div>
    );
}
