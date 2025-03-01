// API Key (Keep it secure and consider using environment variables in production)
const API_KEY = "AIzaSyA5GDTr2JVtyk7iqVuasbhlEkMFr-l74n8";

// Search YouTube Videos
const search = async () => {
    try {
        const query = document.getElementById("query").value.trim();
        if (!query) return; // Prevent empty searches

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&key=${API_KEY}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch search results.");

        const data = await res.json();
        const searchArr = data.items
            .filter((item) => item.id.videoId) // Ensure videoId exists
            .map((item) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails?.medium?.url || "default-thumbnail.jpg",
            }));

        displayVideos(searchArr);
    } catch (error) {
        console.error("Error fetching search results:", error);
        alert("Failed to fetch search results. Please try again.");
    }
};

// Fetch Trending Videos
const trending = async () => {
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch trending videos.");

        const data = await res.json();
        const trendingVideos = data.items.map((item) => ({
            id: item.id,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails?.medium?.url || "default-thumbnail.jpg",
        }));

        displayVideos(trendingVideos);
    } catch (error) {
        console.error("Error fetching trending videos:", error);
        alert("Failed to fetch trending videos. Please try again.");
    }
};

// Display Videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = ""; // Clear previous content

    videos.forEach(({ id, title, channelTitle, publishedAt, thumbnail }) => {
        const videoCard = document.createElement("div");
        videoCard.className = "video-card";

        // Thumbnail
        const img = document.createElement("img");
        img.src = thumbnail;
        img.alt = title;
        img.className = "thumbnail";
        img.addEventListener("click", () => playVideo(id, title));

        // Video Details
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "video-details";

        const titleEl = document.createElement("h3");
        titleEl.textContent = title;

        const channelEl = document.createElement("p");
        channelEl.textContent = channelTitle;
        channelEl.className = "channel-name";

        const timeEl = document.createElement("p");
        timeEl.textContent = formatTime(publishedAt);
        timeEl.className = "video-time";

        detailsDiv.append(titleEl, channelEl, timeEl);
        videoCard.append(img, detailsDiv);

        videoContainer.append(videoCard);
    });
};

// Convert published date to human-readable format
const formatTime = (dateStr) => {
    const publishedDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now - publishedDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

    return `${Math.floor(diffDays / 365)} years ago`;
};

// Save Video Data and Navigate to Video Page
const playVideo = (id, title) => {
    localStorage.setItem("videoDetails", JSON.stringify({ id, title }));
    window.location.href = "video.html";
};

// Auto-load trending videos on page load
trending();
