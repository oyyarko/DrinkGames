import React, { useState } from "react";
import { defaultRoomColor, defaultRoomName } from "../constants";
import axios from "axios";

const RoomPage = () => {
  const [flipCard, setFlipCard] = useState({ id: 0, status: false, data: "" });
  const handleClick = async (room) => {
    try {
      await axios
        .get(`https://api.truthordarebot.xyz/api/${room.api}`)
        .then((val) =>
          setFlipCard((prev) => ({
            id: room.id,
            status: true,
            data: val.data.question,
          }))
        );
    } catch (err) {
      alert(err);
    }
  };

  console.log("flipCard", flipCard);
  return (
    <div className="container">
      <div className="row">
        {defaultRoomName.map((room, i) => (
          <div
            className={`col-sm-6 col-md-3 room-section ${flipCard.status && flipCard.id === room.id ? "flip" : ""}`}
            style={{ backgroundColor: defaultRoomColor[i] }}
            onClick={() => handleClick(room)}
          >
            {flipCard.status && flipCard.id === room.id
              ? flipCard.data
              : room.label}
          </div>
        ))}
      </div>
      {flipCard.status ? (
        <div
          className="done-button"
          onClick={() => setFlipCard({ status: false })}
        >
          Done
        </div>
      ) : null}
    </div>
  );
};

export default RoomPage;
