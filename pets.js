const fs = require('fs'); // add this to the top of your js file
let crudOperation = process.argv[2]; // this variable is set to the second item in the file
let index = process.argv[3]; // this variable is set to the third item in the file
console.log(crudOperation)
if(crudOperation == 'create'){
    fs.readFile('pets.json','utf8',(error, data) =>{ // read file method
        if(error){ // if statement saying if there is nothing in the file throw an error
            throw error;
        } else {
            // else pets = json parse the data
            let pets = JSON.parse(data); // this parses into a javascript item
            if(!index){ // if it is not the index
                console.error("Usage: node pets.js create AGE KIND NAME");
                process.exit(1);
            }else{
                if(!process.argv[4]){
                    console.error("Usage: node pets.js create AGE KIND NAME");
                    process.exit(1);
                }else{
                    if(!process.argv[5]){
                        console.error("Usage: node pets.js create AGE KIND NAME");
                        process.exit(1);
                    }else{
                            pets.push({age: parseInt(process.argv[3]),
                            kind: process.argv[4],
                            name: process.argv[5]
                            });
                            var json = JSON.stringify(pets, null); //converting it back to json
                            // console.log(json);
                            fs.writeFile("./pets.json", json, "utf8", (err) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  console.log("Done");
                                }
                              });
                            //adding the data
    var json = JSON.stringify(pets, null, 2); //converting it back to json
    console.log(json);
                }
            }
        }
    }});
}else if(crudOperation === undefined || crudOperation === null){
    console.error("Usage: node pets.js [read | create | update | destroy]");
    process.exit(1);
}else if(crudOperation.toLowerCase() === 'read' && process.argv[3]){
        fs.readFile('pets.json','utf8',(error, data) =>{
            if(error){
                throw error;
            } else {
                let pets = JSON.parse(data);
                if( index > pets.length - 1){
                    console.error("Usage: node pets.js read " + index);
                    process.exit(1);
                }else if(parseInt(index) < 0){
                    console.error("Usage: node pets.js read INDEX");
                    process.exit(1);
                }else if(index === NaN){
                    console.error("Usage: node pets.js read 'Not a Number'");
                    process.exit(1);
                }else{
                    console.log(pets[index]);
                }
        }});
}else if(crudOperation.toLowerCase() === 'read'){
    fs.readFile('pets.json','utf8',(error, data) =>{
        if(error){
            throw error;
        } else {
            let pets = JSON.parse(data);
            console.log(pets);
        }
    });
}












