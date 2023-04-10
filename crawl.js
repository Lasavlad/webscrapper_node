function normalizeURL(url){
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if(fullPath.length > 0 && fullPath[fullPath.length - 1] === '/'){
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

module.exports = {
    normalizeURL
}
