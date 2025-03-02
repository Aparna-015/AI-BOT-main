import React, { createContext, useState } from "react";

export const DataContext = createContext();

export let user = {
  data: null,
  mime_type: null,
  imgUrl: null,
};

export let prevUser = {
  data: null,
  mime_type: null,
  prompt: null,
  imgUrl: null,
};

const UserContext = ({ children }) => {
  const [start, setStart] = useState(false);
  const [popUp, setPopUP] = useState(false);
  const [input, setInput] = useState("");
  const [feature, setFeature] = useState("chat");
  const [showResult, setShowresult] = useState("");
  const [prevfeature, Setprevfeature] = useState("chat");
  const [genImgurl, setGenImgUrl] = useState("");

  const value = {
    start,
    setStart,
    popUp,
    setPopUP,
    input,
    setInput,
    feature,
    setFeature,
    showResult,
    setShowresult,
    prevfeature,
    Setprevfeature,
    genImgurl,
    setGenImgUrl,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default UserContext;
