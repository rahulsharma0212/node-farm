const http=require('http');
const url =require('url');
const fs = require('fs');
const { json } = require('stream/consumers');
var slugify = require('slugify');
const replaceTemplate=require('./module/replace-template.js');

const apitext=fs.readFileSync('./dev-data/data.json','utf-8');
const overviewtemp=fs.readFileSync('./templates/overview-template.html','utf-8');
const cardtemp=fs.readFileSync('./templates/card-template.html','utf-8');
const producttemp=fs.readFileSync('./templates/product-template.html','utf-8');
const dataObj=JSON.parse(apitext);

const slug=dataObj.map(el=>slugify(el.productName,{lower:true})) ; 
// console.log(slug);



const server=http.createServer((req,res)=>{
    // const {pathname,query}=url.parse(req.url, true );
    const { query, pathname } = url.parse(req.url, true); 
    /*console.log(url.parse(req.url, true));*/
   if(pathname=='/api'){
    res.writeHead(200,{'data-type':'application/json'});
    res.end(apitext);
   } else if(pathname=='/overview'||pathname=='/'){

    const cardsHtml = dataObj.map(el => replaceTemplate(el, cardtemp)).join('');
    const overview=overviewtemp.replace(/{%PRODUCT_CARDS%}/g,cardsHtml)
    res.writeHead(200,{'content-type':'text/html'});
    res.end(overview);
   }else if(pathname=='/product'){
       
    const dataid=query.id;
    const data=dataObj[dataid];
    const output=replaceTemplate(data,producttemp);
     res.writeHead(200,{'content-type':'text/html'});
     res.end(output);
    }else{
    res.writeHead(404,{'content-type':'text/html'});
    res.end('Bad Request <h1>Page not found</h1>');
   }
//    res.end('you are live');
});
server.listen(3000,'127.0.0.3',()=>{
    console.log('listening on port 3000 http::/127.0.0.3:3000');
})