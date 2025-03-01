let video=JSON.parse(localStorage.getItem("videoDetails"))


document.querySelector("title").textContent=video.title

let append =() => {

    
    let container = document.getElementById("results")

         container.innerHTML=null
    
  

        
        let iframe=document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${video.id}`


        let h2 = document.createElement("h2")
        h2.textContent=video.title

      

       
       
        container.append(iframe,h2)

    



};

append();

document.querySelector(".youtubeLogo").addEventListener("click",()=>{
    window.location.href="index.html"
})
