// Retrieve video details from local storage
const video = JSON.parse(localStorage.getItem("videoDetails"));

// Redirect if no video data is found
if (!video || !video.id) {
    alert("No video data found!");
    window.location.href = "index.html";
} else {
    document.title = video.title; // Set page title dynamically

    const appendVideo = () => {
        const videoFrame = document.getElementById("videoFrame");
        const videoTitle = document.getElementById("videoTitle");

        videoFrame.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`; // Autoplay enabled
        videoTitle.textContent = video.title;

        fetchRelatedVideos(video.id); // Fetch related videos
    };

    appendVideo();
}

// Fetch related videos based on the current video
const fetchRelatedVideos = async (videoId) => {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10&key=AIzaSyA5GDTr2JVtyk7iqVuasbhlEkMFr-l74n8`;

        const res = await fetch(url);
        const data = await res.json();

        displayRelatedVideos(data.items);
    } catch (error) {
        console.error("Error fetching related videos:", error);
    }
};

// Display related video thumbnails and titles
const displayRelatedVideos = (videos) => {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = ""; // Clear previous content

    videos.forEach(({ id, snippet }) => {
        if (!id.videoId) return; // Skip if video ID is missing

        const videoDiv = document.createElement("div");
        videoDiv.classList.add("related-video");

        const thumbnail = document.createElement("img");
        thumbnail.src = snippet.thumbnails.medium.url;
        thumbnail.alt = snippet.title;

        const title = document.createElement("p");
        title.textContent = snippet.title;

        videoDiv.addEventListener("click", () => {
            localStorage.setItem("videoDetails", JSON.stringify({ id: id.videoId, title: snippet.title }));
            window.location.href = "video.html"; // Load new video on click
        });

        videoDiv.append(thumbnail, title);
        suggestionsContainer.append(videoDiv);
    });
};

// Navigate to home page when clicking YouTube logo
document.querySelector(".youtubeLogo").addEventListener("click", () => {
    window.location.href = "index.html";
});
