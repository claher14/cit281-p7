// Fetch and display the first 20 photo titles
fetch("/photos")
  .then(res => res.json())
  .then(photos => {
    const list = document.getElementById("photo-list");
    photos.forEach(photo => {
      const li = document.createElement("li");
      li.textContent = photo.title;
      li.addEventListener("click", () => loadPhotoDetails(photo.id));
      list.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Failed to fetch photos:", err.message);
  });

function loadPhotoDetails(id) {
  fetch(`/photos/${id}`)
    .then(res => res.json())
    .then(photo => {
      const details = document.getElementById("photo-details");
      details.innerHTML = `
        <h2>Photo Details</h2>
        <p><strong>ID:</strong> ${photo.id}</p>
        <p><strong>Title:</strong> ${photo.title}</p>
        <p><strong>Album ID:</strong> ${photo.albumId}</p>
        <p><strong>URL:</strong> ${photo.url}</p>
        <p><strong>Thumbnail:</strong> ${photo.thumbnailUrl}</p>
      `;
    })
    .catch(err => {
      console.error("Failed to fetch photo:", err.message);
    });
}
