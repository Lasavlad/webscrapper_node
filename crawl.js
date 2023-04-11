const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL){
    const response = await fetch(baseURL)
    try {
        if(response.status > 399){
            console.log(`error at ${response.status}`)
            return
        }
        const contentType = response.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`Not a html document`)
            return
        }
        console.log(await response.text())

    } catch(err){
        console.log(err)
    }
    
}

function getUrlsFromHtml(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for( const aElement of aElements){
        if(aElement.href.slice(0, 1) === '/'){
            try {
                urls.push(new URL(aElement.href, baseURL).href)
            } catch(err){
                console.log(`${err.message}: ${aElement.href}`)
            }
        }else {
            try{
                urls.push(new URL(aElement.href).href)
            } catch(err){
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
    }
    return urls

}
function normalizeURL(url){
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if(fullPath.length > 0 && fullPath[fullPath.length - 1] === '/'){
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

module.exports = {
    normalizeURL,
    getUrlsFromHtml,
    crawlPage,
}
