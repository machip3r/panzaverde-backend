const app = require("./app");
var http = require("http").Server(app);
const PORT = process.env.PORT || 3000;

http.listen(PORT, (error) =>
  error
    ? console.log("Error Running Server")
    : console.log(`The API is on: http://localhost:${PORT}/`)
);
