import React, { useContext } from "react";

import { RiImageAddLine } from "react-icons/ri";
import { RiImageAiLine } from "react-icons/ri";
import { LuImageUp } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { DataContext, prevUser, user } from "../Context/Usercontext";
import Chat from "./Chat";
import { generateResponse } from "../gemini";
import { query } from "../Huggingface";

const Home = () => {
  const {
    start,
    setStart,
    popUp,
    setPopUP,
    input,
    setInput,
    feature,
    setFeature,
    setShowresult,
    Setprevfeature,
    setGenImgUrl,
  } = useContext(DataContext);



  async function handlesubmit(e) {
    setStart(true);
    setShowresult("");
    Setprevfeature(feature);
    setFeature("chat");
    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    prevUser.prompt = input;
    setInput("");

    let result = await generateResponse();
    
    setShowresult(result);
    console.log(result);
    // setFeature('chat')
    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
  }

  function handleimage(e) {
    setFeature("upimg");
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      let base64 = event.target.result.split(",")[1];
      user.data = base64;
      user.mime_type = file.type;
      user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
    };
    reader.readAsDataURL(file);
  }
  async function handleGenerateImg() {
    setStart(true);
    Setprevfeature(feature);
    setGenImgUrl("");
    prevUser.prompt = input;
  
    await query().then((e) => {
      let url = URL.createObjectURL(e);
      setGenImgUrl(url);
    });
  
    setInput("");
    setFeature("chat");
  }

  return (
    <div className="home">
      <nav>
        <div
          className="logo"
          onClick={() => {
            setStart(false);

            setFeature("chat");
          }}
        >
          Nex AI Bot
        </div>
      </nav>

      <input
        type="file"
        accept="image/*"
        hidden
        id="inputImg"
        onChange={handleimage}
      />

      {!start ? (
        <div className="hero">
          <span>What can i help with..?</span>
          <div className="category_section">
            <div
              className="upimg_section"
              onClick={() => document.getElementById("inputImg").click()}
            >
              <LuImageUp />
              <span>Upload image</span>
            </div>
            <div
              className="genImg_section"
              onClick={() => setFeature("genimg")}
            >
              <RiImageAiLine />
              <span>Generate image</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}
      <form
        className="input-section"
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            if (feature === "genimg") {
              handleGenerateImg();
            } else {
              handlesubmit(e);
            }
          }
        }}
      >
        {popUp ? (
          <div className="pop-up-section">
            <div
              className="select-up-section"
              onClick={() => {
                setPopUP(false);
                setFeature("chat");
                document.getElementById("inputImg").click();
              }}
            >
              <RiImageAddLine />
              <span>Upload Image</span>
            </div>
            <div
              className="select-gen-section"
              onClick={() => {
                setPopUP(false);
                setFeature("genimg");
              }}
            >
              <RiImageAiLine />
              <span>Generate Image</span>
            </div>
          </div>
        ) : null}

        <div id="add" onClick={() => setPopUP((prev) => !prev)}>
          {feature === "genImg" ? <RiImageAiLine id="genImg" /> : <FaPlus />}
        </div>
        <input
          className=""
          type=""
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {input ? (
          <button id="submit">
            <FaArrowUpLong />
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default Home;