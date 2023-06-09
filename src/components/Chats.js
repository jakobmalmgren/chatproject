import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { SlLogout } from "react-icons/sl";
import { BsChatDots } from "react-icons/bs";
import styled from "styled-components";

const Chats = () => {
  const history = useNavigate();
  const handleLogout = async () => {
    await auth.signOut();
    history("/");
  };
  const { user } = useAuth();
  console.log(user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      history("/");
      return;
    }
    const getFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    };

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_KEY,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, history]);

  if (!user || loading) return "...Loading";
  return (
    <Container>
      <Navbar>
        <Logo>
          <BsChatDots />
        </Logo>
        <LogoLogout onClick={handleLogout}>
          <SlLogout />
        </LogoLogout>
      </Navbar>

      <ChatEngine
        height="calc(100vh-66px)"
        userName={user.email}
        userSecret={user.uid}
        projectID={process.env.REACT_APP_CHAT_ID}
      ></ChatEngine>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
`;
const Navbar = styled.div`
  width: 100%;
  height: 66px;
  background-color: #002766;
`;
const Logo = styled.div`
  position: absolute;
  left: 22px;
  top: 12px;
  font-size: 32px;
  font-weight: 700;
  color: white;
`;
const LogoLogout = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  color: white;
  cursor: pointer;
`;

export default Chats;
