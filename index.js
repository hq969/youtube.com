
let search =async() =>{

    let query=document.getElementById("query").value
    // console.log(query)
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyDVk2mh02wxr_2df0e76Vbb2EZAMDml67E`
    let res= await fetch(url)
    let data=await res.json()
    // console.log(data.items)
    data1=data.items
 
    let searchArr=[]
    
    data1.map((elem)=>{
        
        
        
        

        let obj={

            id:elem.id.videoId,
            snippet: {
                publishedAt:elem.snippet.publishedAt,
                channelTitle:elem.snippet.channelTitle,
                title:elem.snippet.title,
                thumbnails: { medium :{
                    url:elem.snippet.thumbnails.medium.url

                }
             }
                
            },
            

        }
       
        searchArr.push(obj)


    })
    

    display(searchArr)


}



let trending = async() =>{

    let url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=AIzaSyDVk2mh02wxr_2df0e76Vbb2EZAMDml67E`
    let res= await fetch(url)
    let data=await res.json()
    display(data.items)

}

let display = async(data) =>{

        document.getElementById("videos").innerHTML=null;

        data.map((  { id,snippet:{publishedAt,channelTitle,title,thumbnails:{medium:{url}}} }  )=>{

            let parentDiv=document.createElement("div")
            parentDiv.setAttribute("id","parentDiv")

            let imageDiv=document.createElement("div")
            let image=document.createElement("img")
            image.src=url
            imageDiv.append(image)
            imageDiv.setAttribute("id","imageDiv")

            imageDiv.addEventListener("click",()=>{
                playVideo(id,title);
            })




        
            let detailsDiv=document.createElement("div")
            detailsDiv.setAttribute("id","detailsDiv")

            let title1=document.createElement("h2")
            title1.textContent=title;

            let viewTimeDiv=document.createElement("div")


            let timePara=document.createElement("p")
            let time=timeConverter(publishedAt)
            timePara.innerText=`Uploaded ${time}`

            viewTimeDiv.append(timePara)

            let channelName=document.createElement("p")
            channelName.innerText=channelTitle

            detailsDiv.append(title1,viewTimeDiv,channelName)
            parentDiv.append(imageDiv,detailsDiv)

            document.getElementById("videos").append(parentDiv)

        })


}

trending()


let timeConverter=(dstring) =>{

 var date = new Date(dstring);
 date=(date.toISOString().substring(0, 10))
 

var DateDiff = {
 
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return Math.floor((t2-t1)/(24*3600*1000));
    },
 
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return parseInt((t2-t1)/(24*3600*1000*7));
    },
 
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
 
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
 
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}
 

 
var d1 = new Date(date);
var d2 = new Date();

let inDay=DateDiff.inDays(d1, d2);

    if(inDay<=30){
        if(inDay==0)
            return "Today"
        else if(inDay==1)
            return `${inDay} Day Ago`
        else
            return `${inDay} Days Ago`
    }
    else if(inDay<=365){

        let month=Math.ceil(inDay/30)

        if(month>1)
            return`${month} Months ago`
        else    
            return `${month} Month ago`

    }
    else{
        let year=Math.floor(inDay/365)
        return `${year} Year`
    }


}


let playVideo=(id,title)=>{

    let obj={
        id:id,
        title:title
    }

    localStorage.setItem("videoDetails",JSON.stringify(obj))
    window.location.href="video.html"

}
