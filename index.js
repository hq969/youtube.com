// Fetch search results from YouTube API
const search = async () => {
    try {
        const query = document.getElementById("query").value.trim();
        if (!query) return; // Prevent empty searches

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyA5GDTr2JVtyk7iqVuasbhlEkMFr-l74n8`;

        const res = await fetch(url);
        const data = await res.json();

        const searchArr = data.items
            .filter((elem) => elem.id.videoId) // Ensure videoId exists
            .map((elem) => ({
                id: elem.id.videoId,
                snippet: {
                    publishedAt: elem.snippet.publishedAt,
                    channelTitle: elem.snippet.channelTitle,
                    title: elem.snippet.title,
                    thumbnails: {
                        medium: {
                            url: elem.snippet.thumbnails?.medium?.url || "", // Handle missing thumbnails
                        },
                    },
                },
            }));

        display(searchArr);
    } catch (error) {
        console.error("Error fetching search results:", error);
        alert("Failed to fetch search results. Please try again.");
    }
};

// Fetch trending videos from YouTube API
const trending = async () => {
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=AIzaSyDVk2mh02wxr_2df0e76Vbb2EZAMDml67E`;

        const res = await fetch(url);
        const data = await res.json();

        await display(data.items);
    } catch (error) {
        console.error("Error fetching trending videos:", error);
        alert("Failed to fetch trending videos. Please try again.");
    }
};

// Display video thumbnails and details
const display = (data) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = ""; // Clear previous content

    data.forEach(({ id, snippet: { publishedAt, channelTitle, title, thumbnails } }) => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "video-card";

        // Video thumbnail
        const imageDiv = document.createElement("div");
        const image = document.createElement("img");
        image.src = thumbnails?.medium?.url || "default-thumbnail.jpg"; // Use default image if missing
        image.alt = title;

        imageDiv.append(image);
        imageDiv.className = "thumbnail";
        imageDiv.addEventListener("click", () => playVideo(id, title));

        // Video details
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "video-details";

        const titleEl = document.createElement("h3");
        titleEl.textContent = title;

        const channelName = document.createElement("p");
        channelName.textContent = channelTitle;

        const timePara = document.createElement("p");
        timePara.textContent = `Uploaded ${timeConverter(publishedAt)}`;

        detailsDiv.append(titleEl, channelName, timePara);
        parentDiv.append(imageDiv, detailsDiv);

        videoContainer.append(parentDiv);
    });
};

// Convert published date to human-readable format
const timeConverter = (dstring) => {
    const d1 = new Date(dstring);
    const d2 = new Date();

    const diffDays = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    
    return `${Math.floor(diffDays / 365)} years ago`;
};

// Save video details and navigate to video page
const playVideo = (id, title) => {
    const videoData = { id, title };
    localStorage.setItem("videoDetails", JSON.stringify(videoData));
    window.location.href = "video.html";
};

// Load trending videos on page load
trending();
