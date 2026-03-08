export default async function handler(req, res) {

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

let videoMatch = html.match(/"video_url":"([^"]+)"/);
let imageMatch = html.match(/"display_url":"([^"]+)"/);

let download = null;

if(videoMatch){
download = videoMatch[1].replace(/\\u0026/g,"&");
}

if(!download && imageMatch){
download = imageMatch[1].replace(/\\u0026/g,"&");
}

res.status(200).json({
success:true,
url:url,
download:download
});

}catch(error){

res.status(500).json({
success:false,
error:error.toString()
});

}

}
