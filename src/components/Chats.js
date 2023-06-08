import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { SlLogout } from "react-icons/sl";
import { BsChatDots } from "react-icons/bs";

const Chats = () => {
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      history.push("/");
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

  if (!user || loading) return "...loading";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          <BsChatDots />
        </div>
        <div className="logout-tab" onClick={handleLogout}>
          <SlLogout />
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        userName={user.email}
        userSecret={user.uid}
        projectID={process.env.REACT_APP_CHAT_ID}
      ></ChatEngine>
    </div>
  );
};

export default Chats;
