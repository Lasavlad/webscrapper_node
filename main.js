const { crawlPage } = require('./crawl.js')

function main(){
    if(process.argv.length < 3){
        console.log('no website provided') 
        return
    }
    if(process.argv.length > 3){
        console.log('too many arguments')
        return
    }

    const baseURL = process.argv[2]
    console.log(`Using crawl on: ${baseURL}`)
    crawlPage(baseURL, {})
}

main()