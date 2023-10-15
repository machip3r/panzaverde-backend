const app = require("./app");
const http = require("http").Server(app);
const PORT = process.env.PORT || 3003;

http.listen(PORT, (error) =>
  error
    ? console.log("Error Running Server")
    : console.log(`The API is on: http://localhost:${PORT}/`)
);
