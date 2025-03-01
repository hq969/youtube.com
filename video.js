// Retrieve video details from local storage
const video = JSON.parse(localStorage.getItem("videoDetails"));

// Check if video data exists
if (!video || !video.id) {
    alert("No video data found!");
    window.location.href = "index.html"; // Redirect to home page if no data
} else {
    document.title = video.title; // Set page title dynamically

    const appendVideo = () => {
        const container = document.getElementById("results");
        container.innerHTML = ""; // Clear previous content

        // Create iframe for video
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${video.id}`;
        iframe.allowFullscreen = true;
        iframe.setAttribute("frameborder", "0");

        // Create title element
        const h2 = document.createElement("h2");
        h2.textContent = video.title;

        // Append elements to container
        container.append(iframe, h2);
    };

    appendVideo(); // Call function to display video
}

// Navigate to home page when clicking YouTube logo
document.querySelector(".youtubeLogo").addEventListener("click", () => {
    window.location.href = "index.html";
});
