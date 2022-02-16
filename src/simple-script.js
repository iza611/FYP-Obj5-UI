

function accessFile(filename){
   let fs = require('fs')

    //Check if file exists
   if(fs.existsSync(filename)) {
    let data = fs.readFileSync(filename, 'utf8').split('\n')
    
    console.log(typeof(data))
 
 } else {
    console.log("File Doesn't Exist. Creating new file.")
    fs.writeFile(filename, '', (err) => {
       if(err)
          console.log(err)
    })
 }
}

const filename = '/Users/ozogiz01/OneDrive - StepStone Group/Desktop/Metadata (non-human images only).json'
accessFile(filename)