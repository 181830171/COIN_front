var fs=require('fs')

function writeJson(params){
    fs.readFile('../../public/data.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var node=data.toString();
        node=JSON.parse(node);
    })
}

export {writeJson}