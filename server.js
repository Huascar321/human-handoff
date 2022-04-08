const express = require("express");
const axios = require("axios");
const app = express();
const options = {
  cors: true,
  origins: ["http://localhost:3000/", "http://localhost:5000/"],
};
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const io = require("socket.io")(server, options);

// Urls
const botURL = "http://localhost:5005/webhooks/rest/webhook";
const handoffURL = "http://localhost:8888";
let handoff = false; //hacer algo con este handoff
let url = botURL;

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/", (req, res) => {
  res.sendFile('D:/Proyectos/Rasa/handoff-side/handoff.html');
  //res.sendFile(
  // "/home/huascar321/Documents/Projects/University/ThesisProject/handoff-side/handoff.html"
  //);
});

const sendMessage = async (data, socket) => {
  if (handoff === false) {
    try {
      const response = await axios.post(url, data);
      console.log("response data: ");
      console.log(response.data);
      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].hasOwnProperty("custom")) {
            if (response.data[i].custom.hasOwnProperty("handoff_host")) {
              // Human handoff
              if (url !== handoffURL) {
                handoff = true;
              }
            }
          }
          if (!response.data[i].hasOwnProperty("custom")) {
            socket.emit("message", {
            text: response.data[i].text,
            });
          }
        }
      } else {
        socket.emit("message", {
          text: response.data[0].text,
        });
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    if (data.hasOwnProperty("isHandoff")) {
      io.emit("message", {
        text: data.message,
      });
    }
  }
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

io.on("connection", (socket) => {
  console.log("new user connected");
  //socket.emit("connection", null); 

  // Receiving messages
  socket.on("message-admin", (msg) => {
    if (msg === "/stop") {
      handoff = false;
    } else {
      socket.emit("message-admin", msg);
      let data = {
        sender: "test_user",
        isHandoff: true,
        message: msg,
      };
      sendMessage(data, socket);
    } 
  });
  socket.on("message", (msg) => {
    console.log("message: " + msg.text);
    socket.emit("message", {
      id: getRandomInt(200),
      user: "client",
      text: msg.text,
    });
    let data = {
      sender: "test_user",
      message: msg.text,
    };
    console.log(`handoff: ${handoff}`);
    if (handoff === true) {
      console.log("entrando a handoff");
      io.emit("message-admin", msg.text);
    }
    sendMessage(data, socket);
  });
});
