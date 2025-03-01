let video = JSON.parse(localStorage.getItem("videoDetails"));

document.querySelector("title").textContent = video.title;

let append = () => {
    let container = document.getElementById("results");
    container.innerHTML = null;

    // Create iframe for video
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.allowFullscreen = true; // Allow fullscreen mode
    iframe.id = "videoFrame";

    // Create title
    let h2 = document.createElement("h2");
    h2.textContent = video.title;

    // Create fullscreen button
    let fullscreenButton = document.createElement("button");
    fullscreenButton.innerText = "Fullscreen";
    fullscreenButton.classList.add("fullscreen-btn");

    // Fullscreen toggle function
    fullscreenButton.addEventListener("click", function () {
        let videoFrame = document.getElementById("videoFrame");
        if (videoFrame.requestFullscreen) {
            videoFrame.requestFullscreen();
        } else if (videoFrame.mozRequestFullScreen) { // Firefox
            videoFrame.mozRequestFullScreen();
        } else if (videoFrame.webkitRequestFullscreen) { // Chrome, Safari, Opera
            videoFrame.webkitRequestFullscreen();
        } else if (videoFrame.msRequestFullscreen) { // IE/Edge
            videoFrame.msRequestFullscreen();
        }
    });

    container.append(iframe, h2, fullscreenButton);
};

append();

// Redirect to homepage on clicking logo
document.querySelector(".youtubeLogo").addEventListener("click", () => {
    window.location.href = "index.html";
});
