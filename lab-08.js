const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const HOST = 'localhost';
app.use(express.static(path.join(process.cwd(), "public")));

// #3: TODO:
// Serve static files from public subfolder using .use(), express.static(), and path.join().
// Rather than __dirname, use process.cwd()

app.get("/photos", (request, response) => {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res => res.json())
    .then(data => {
      const first20 = data.slice(0, 20);
      response.status(200).json(first20);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});


app.get("/photos/:id", (request, response) => {
  const id = request.params.id;
  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(res => res.json())
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});



// Handle 404 for unknown routes
app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('Working directory:', process.cwd());
  console.log(`Server running at http://${HOST}:${PORT}`);
});
