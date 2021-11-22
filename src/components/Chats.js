import React, {useRef, useState, useEffect, useContext} from "react";
import axios from 'axios';
import {Redirect, useHistory} from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../contexts/AuthContext"
import styled from "styled-components";
import {connect} from "react-redux";




const Chats = () => {

const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
 const  {user}  = useAuth()
  const history = useHistory()


  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/chats")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)

          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (




<Container>
    {!user && <Redirect to = '/' />}
      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />

</Container>
  )
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps)(Chats);
//export default Chats;
