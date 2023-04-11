const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, pages){

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normUrl = normalizeURL(currentURL)

    if(pages[normUrl] > 0){
        pages[normUrl]++
        return pages
    }

    pages[normUrl] = 1

    // fetch and parse
   let htmlBody = ''
    try {
        const response = await fetch(currentURL)
        if(response.status > 399){
            console.log(`error at ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`Not a html document: ${contentType}`)
            return pages
        }
        htmlBody = await response.text()

    } catch(err){
        console.log(err)
    }

    const nextURLs = getUrlsFromHtml(htmlBody, baseURL)
    for(const nextURL of nextURLs){
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
    
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
