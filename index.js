const fs = require("fs");
const http = require("http");

// Get the products data
const productsData = fs.readFileSync(
  `${__dirname}/data/products.json`,
  "utf-8"
);

// Get the products template
const productsTemplate = fs.readFileSync(`${__dirname}/public/products.html`);
// Get the 404 template
const pageNotFoundTemplate = fs.readFileSync(`${__dirname}/public/404.html`);

// Create the server
const server = http.createServer((req, res) => {
  // Create the url helper
  const pathName = req.url;

  // Products route
  if (pathName === "/" || pathName === "/overview") {
    res.end(productsTemplate);
  }
  // Product route
  else if (pathName === "/product") {
    res.end("This is the product");
  }
  // API route
  else if (pathName === "/api/products") {
    res.writeHead(200, {
      "content-type": "application/json",
      "my-own-header": "dummy-header",
    });
    res.end(productsData);
  }
  // 404 route
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "custom header",
    });
    res.end(pageNotFoundTemplate);
  }
});

// Start the server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on 127.0.0.1:8000");
});

// -----------------------------------------------------------------------------------------------------
// FILE SYSTEM
// const textIn = fs.readFileSync("./data/dummy.txt", "utf-8");

// const textOut = fs.writeFileSync(
//   "./data/dummy-new.txt",
//   `This line is added!\n${textIn}\nCreated on: ${Date.now()}`,
//   "utf-8"
// );

// console.log("Read Write Completed!");
