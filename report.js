function printReport(pages){
    console.log('REPORT IS BEING PREPARED ...')
    console.log(`==== Start ====`)
    const pagesSorted = sorting(pages)
    for(const item in pagesSorted){
        console.log(`Found ${pagesSorted[item]} internal links to ${item}`)
    }
    console.log(`==== End ====`)
}

function sorting(pages){
   const pagesArr = Object.entries(pages)
   const sortedPagesArr = pagesArr.sort((a, b)=>b[1] - a[1])
   const sortedObj = Object.fromEntries(sortedPagesArr)

   return sortedObj

}

module.exports = {
    printReport,
    sorting,
}