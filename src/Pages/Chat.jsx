import React, { useContext } from "react";
import { DataContext, prevUser } from "../Context/Usercontext";

const Chat = () => {
  const {
    showResult,
    prevfeature,
    genImgurl
  } = useContext(DataContext);

  return (
    <div className="chat-page-section">
      <div className="user-section">
        {prevfeature === "upimg" ? (
          <>
            {" "}
            <img src={prevUser.imgUrl} alt="" />
            <span>{prevUser.prompt}</span>
          </>
        ) : (
          <span>{prevUser.prompt}</span>
        )}
      </div>
      <div className="AI-section">
        {prevfeature === "genimg" ? (
          <>
            {!genImgurl ? (
              <span>Generating Image......</span>
            ) : (
              <img src={genImgurl} alt="" />
            )}
          </>
        ) : !showResult ? (
          <span>Loading......</span>
        ) : (
          <span>{showResult}</span>
        )}
      </div>
    </div>
  );
};

export default Chat;
