import { useState, useEffect } from 'react';
import Message from './components/message/message.component.tsx';
import Input from './components/input/input.component.tsx';
import './App.css';

const socket = new WebSocket('ws://localhost:5001');

const App = () => {
  const [chat, setChat] = useState([])

  const [messageValue, setMessageValue] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameInput, setUserNameInput] = useState('');

  socket.addEventListener('open', (e) => {
    console.log('open')
  })

  socket.addEventListener('close', (e) => {
    console.log('close')
  })

  socket.addEventListener('message', (e) => {
    console.log(e.data)
    if(JSON.parse(e.data).type == 'messages'){
      setChat([...JSON.parse(JSON.parse(e.data).data)]);
    }else if(JSON.parse(e.data).type == 'new_message'){
      console.log(JSON.parse(e.data).data)
      setChat([...chat, JSON.parse(e.data).data])
    }


  })

  const inputHandler = (e) => {
    setMessageValue(e.target.value);
  }

  const nameInputHandler = (e) => {
    setUserNameInput(e.target.value);
  }

  const submitHandler = (type) => {
    
    if(type == 'Name'){
      setUserName(userNameInput);
      socket.send(
        JSON.stringify({
          type: 'init'
        })
      );
    }else{
      const now = new Date();
      
      socket.send(
        JSON.stringify({
          type: 'message',
          name: userName,
          text: messageValue,
          hours: now.getHours(),
          minutes: now.getMinutes()
        })
      )


    }
  }

  if(userName != ''){ 
    return (
      <div className="App">
          <div className='messages_container'>
            {
              chat.map(({name, text, hours, minutes}) => {
                return <Message messageName={name} messageText={text} messageHours={hours} messageMinutes={minutes} ownMessage={userName == name} key={name+text+hours+minutes}/>

              })
            }
          </div>
          <div className='input_container'>
            <Input messageValue={messageValue} inputHandler={inputHandler} submitHandler={(e) => {e.preventDefault(); submitHandler('Message')}}  placeHolder='Message'/>
          </div>
      </div>
    )  
  }else{
    return (
      <div className="App">
        <div className='input_container'>
          <Input messageValue={messageValue} inputHandler={nameInputHandler} submitHandler={(e) => {e.preventDefault(); submitHandler('Name')}} placeHolder='Name'/>
        </div>
      </div>
    )
  }
}

export default App;
