const express = require("express");
const axios = require("axios");
const app = express();
const options = {
  cors: true,
  origins: ["http://localhost:3000/"],
};
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const io = require("socket.io")(server, options);

// Urls
const botURL = "http://localhost:5005/webhooks/rest/webhook";
const handoffURL = "http://localhost:8888";
let url = botURL;

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

const sendMessage = async (data, socket) => {
  try {
    const response = await axios.post(url, data);
    console.log("response data: ");
    console.log(response.data);
    if (response.data.length > 0) {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].hasOwnProperty("custom")) {
          if (response.data[i].custom.hasOwnProperty("handoff_host")) {
            // Human handoff
            if (url != handoffURL) {
              url = handoffURL;
            }
          }
        }
        socket.emit("message", {
          text: response.data[i].text,
        });
      }
    } else {
      socket.emit("message", {
        text: response.data[0].text,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

io.on("connection", (socket) => {
  console.log("new user connected");
  socket.emit("connection", null);
  socket.emit("message", {
    text: "Welcome, testing",
  });

  // Receiving messages
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
    sendMessage(data, socket);
  });
});
