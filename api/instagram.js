import fetch from "node-fetch";
import cheerio from "cheerio";

export default async function handler(req, res){

const { url } = req.query;

if(!url){
return res.status(400).json({
success:false,
message:"Instagram URL required"
});
}

try{

const response = await fetch(url,{
headers:{
"user-agent":"Mozilla/5.0"
}
});

const html = await response.text();

const $ = cheerio.load(html);

let video = $('meta[property="og:video"]').attr("content");
let image = $('meta[property="og:image"]').attr("content");

let media = [];

if(video){
media.push({
type:"video",
url:video
});
}

if(image){
media.push({
type:"image",
url:image
});
}

let type="post";

if(url.includes("/reel/")) type="reel";
if(url.includes("/stories/")) type="story";

res.status(200).json({
success:true,
type:type,
thumbnail:image,
media:media
});

}catch(err){

res.status(500).json({
success:false,
error:err.message
});

}

}
