t API_KEY = "AIzaSyDVk2mh02wxr_2df0e76Vbb2EZAMDml67E";

const search = async () => {
    let query = document.getElementById("query").value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`;
    
    try {
        let res = await fetch(url);
        let data = await res.json();
        
        let searchArr = data.items.map(elem => ({
            id: elem.id.videoId,
            snippet: {
                publishedAt: elem.snippet.publishedAt,
                channelTitle: elem.snippet.channelTitle,
                title: elem.snippet.title,
                thumbnails: { medium: { url: elem.snippet.thumbnails.medium.url } }
            }
        }));
        
        display(searchArr);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};

const trending = async () => {
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY}`;
    
    try {
        let res = await fetch(url);
        let data = await res.json();
        display(data.items);
    } catch (error) {
        console.error("Error fetching trending videos:", error);
    }
};

const display = (data) => {
    let videosContainer = document.getElementById("videos");
    videosContainer.innerHTML = "";

    data.forEach(({ id, snippet: { publishedAt, channelTitle, title, thumbnails: { medium: { url } } } }) => {
        let parentDiv = document.createElement("div");
        parentDiv.classList.add("video-card");

        let imageDiv = document.createElement("div");
        let image = document.createElement("img");
        image.src = url;
        image.alt = title;
        imageDiv.appendChild(image);
        imageDiv.classList.add("imageDiv");
        imageDiv.addEventListener("click", () => playVideo(id, title));

        let detailsDiv = document.createElement("div");
        detailsDiv.classList.add("detailsDiv");

        let titleElem = document.createElement("h3");
        titleElem.textContent = title;

        let channelElem = document.createElement("p");
        channelElem.textContent = channelTitle;

        let timeElem = document.createElement("p");
        timeElem.textContent = `Uploaded ${timeConverter(publishedAt)}`;
        
        detailsDiv.append(titleElem, channelElem, timeElem);
        parentDiv.append(imageDiv, detailsDiv);
        videosContainer.appendChild(parentDiv);
    });
};

const timeConverter = (dstring) => {
    let date = new Date(dstring);
    let now = new Date();
    let diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays < 30) return `${diffDays} Days Ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} Months Ago`;
    return `${Math.floor(diffDays / 365)} Years Ago`;
};

const playVideo = (id, title) => {
    localStorage.setItem("videoDetails", JSON.stringify({ id, title }));
    window.location.href = "video.html";
};

trending();
