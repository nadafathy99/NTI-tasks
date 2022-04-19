const https = require("https")
const apiURL = "https://jsonplaceholder.typicode.com/photos?_limit=10"
// const req = https.request(apiURL, (res)=>{
//     let allRes = ""
//     res.on('data', (d)=> allRes += d.toString())
//     res.on('end', ()=> console.log(JSON.parse(allRes)))
// })
// req.on('error', (err)=> console.log(err))
// req.end()

const fetch = require('node-fetch');
const x = async(url,callback)=>{
    // const response = await fetch(apiURL);
    try{
        const data = await (await fetch(url)).json();
        callback(data, null);    
    }
    catch(e){
        callback(null, e.message)
    }
}
module.exports = x
