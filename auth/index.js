// code away!
const server = require("./server.js")

let port = 5000;


server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})
