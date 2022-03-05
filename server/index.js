// const fs = require('fs');
// function tryUsingFs() {
//     const path = '/Users/ozogiz01/OneDrive - StepStone Group/Desktop/Metadata (non-human images only).json';
//     const result = fs.existsSync(path);
//     console.log(result);
//     console.log('yes,youre in');
// }

// function hello() {
//     console.log("heloł hał ar ju");
// }
// module.exports.hello = hello;
// module.exports.tryUsingFs = tryUsingFs;

//server

// const http = require('http');

// function startServer() {
//     const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         res.write('[{"message":"this is a message from the server!!"}]');
//         res.end();
//     }
//     });

//     server.listen(8000);
// }

// module.exports.startServer = startServer;

//independent port 

// const portfinder = require('portfinder');
const EventEmitter = require('events');

// class Server extends EventEmitter {

//     findPort() {
//         portfinder.getPort((err, port) => {
//             this.emit('portEstablished', port);
//         })
//     }

//     startServer(port) {
//         const server = http.createServer((req, res) => {
//             if (req.url === '/') {
//                 res.setHeader("Access-Control-Allow-Origin", "*");
//                 res.write('[{"message":"this is a message from the server!!"}]');
//                 res.end();
//             }
//             });

//             server.listen(port);
//     }
// }

// module.exports.Server = Server;

//python

const { PythonShell } = require('python-shell');
const isDev = require('electron-is-dev');
const path = require('path');

// class PythonScript extends EventEmitter {

//     runPythonScript() {
//         let options = {
//             mode: 'text',
//             pythonOptions: ['-u'], // get print results in real-time
//             scriptPath: isDev ? __dirname + '/../scripts' : __dirname + '/../scripts'
//         };

//         PythonShell.run('hello.py', options, (err, result) => {
//             if (err) throw err;
//             this.emit('scriptCompleted', result.toString());
//         });
//     }
// }

// module.exports.PythonScript = PythonScript;

class ActiveLearning extends EventEmitter {

    runPythonScript(imgDirectory, lablDirectory, stage, noQueries, encoderDirectory) {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: isDev ? __dirname + '/../scripts/active_learning/' : __dirname + '/../scripts/active_learning/',
            args: [imgDirectory, lablDirectory, stage, noQueries, encoderDirectory]
        };

        PythonShell.run('main.py', options, (err, result) => {
            if (err) throw err;
            console.log('result: ', result);
            this.emit('completed', result.toString());
        })
    }
}

//using express

const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

function startExpressServer() {
    const app = express();
    app.use(bodyParser.text()); // req.body
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors()); // setHeader("Access-Control-Allow-Origin", "*") for everything, for every origin

    // TESTING 

    // app.get('/message', (req, res) => {
    //     res.send('[{"message":"this is a message from the server!!"}]');
    // });

    // app.get('/test', (req, res) => {
    //     res.send('test');
    // });

    // app.post('/posting',function(req,res) {
    //     const dir = {
    //         what: "folder with images",
    //         where: req.body
    //     };
    //     directories.push(dir);
    //     res.send(directories);
    // });

    // app.put('/posting', function (req, res) {
    //     const dir = directories.find(d => d.what === "folder with images");
    //     dir.where = req.body;
    //     res.send(directories);
    // });

    // app.get('/run/python/script', (req, res) => {
    //     const pythonScript = new PythonScript();
    //     pythonScript.on('scriptCompleted', (results) => {
    //         res.send(results);
    //     });
    //     pythonScript.runPythonScript();
    // });

    // app.get('/module/dir', (req, res) => {
    //     res.send(__dirname);
    //     // res.send(`file://${path.join(__dirname, '/../scripts')}`)
    //     // const path = __dirname + '/../scripts';
    //     // fs.readdir((path), (err, files) => {
    //     //     let list = [];
    //     //     files.forEach(file => {
    //     //         list.push(file)
    //     //     });
    //     //     res.send(list);
    //     // });

    // })

    // ACTIVE LEARNING

    
    // save directory
    let saveDir = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/save tmp';
    app.get('/save/directory', (req, res) => {
        res.send(saveDir);
    });


    // queries
    // let queriesIds = [ [ 1, 4, 5 ] ];
    // let queriesAnnotations= [ ['0a0b939d-1dfb-11ea-86a0-5cf370671a19',
    // '0a1cbe59-1dfb-11ea-a66a-5cf370671a19','0a1ec362-1dfa-11ea-b5c6-5cf370671a19'] ];
    let queriesIds = [];
    let queriesAnnotations = [];

    app.post('/queries/annotations', (req, res) => {
        let { queries } = req.body;
        queriesAnnotations.push(queries);
        res.send("received & saved queries annotatons");
    });

    app.get('/queries/annotations/:round', (req, res) => {
        const round = parseInt(req.params.round) - 1;
        const mockedIds = queriesAnnotations[round];
        res.send(mockedIds);
    });

    app.post('/queries/ids', (req, res) => {
        let { queries } = req.body;
        queries = queries.map((i) => Number(i));
        queriesIds.push(queries);
        res.send("received & saved queries ids");
    });

    app.get('/queries/ids', (req, res) => {
        res.send(queriesIds);
    });


    // species
    // let speciesNames = ['Virginia Opossum', 'American Black Bear'];
    // let speciesIds = [6, 22];
    let speciesNames = [];
    let speciesIds = [];
    let speciesDict = {}
    app.post('/species', (req, res) => {
        let { species_names, species_ids } = req.body;
        speciesNames = species_names;
        speciesIds = species_ids;

        speciesNames.forEach((item, index) => {
            speciesDict[item] = speciesIds[index]
        })

        res.send("received & saved species names and ids");
    });

    app.get('/species/names', (req, res) => {
        res.send(speciesNames);
    });

    app.get('/species/ids', (req, res) => {
        res.send(speciesIds);
    });

    // labels
    // let labelsIds = [22, 22, 6];
    let labelsNames = [];
    let labelsIds = [];
    app.post('/label', (req, res) => {
        const label = req.body;
        labelsNames.push(label);
        labelsIds.push(parseInt(speciesDict[label]))
        res.send("server received labels");
    });

    app.get('/labels', (req, res) => {
        res.send(labelsIds);
    });

    // test active learning script

    app.get('/start/active/learning', (req, res) => {
        const script = new ActiveLearning();
        script.on('completed', (results) => {
            res.send(results);
        });

        const imgDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/ena24';
        const lablDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/Metadata (non-human images only).json';
        const stage = "finish";
        const noQueries = 3;
        const encoderDirectory = __dirname + '/../scripts/encoder';
        script.runPythonScript(imgDirectory, lablDirectory, stage, noQueries, encoderDirectory);
    })

    // test exe file

    const execFile = require('child_process').execFile;
    app.get('/run/exe', (req, res) => {
        const imgDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/ena24';
        const lablDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/Metadata (non-human images only).json';
        const stage = "continue";
        const noQueries = 3;
        const encoderDirectory = __dirname + '/../scripts/encoder';

        const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/active_learning/dist/main'
        execFile(path, [imgDirectory, lablDirectory, stage, noQueries, encoderDirectory], function (err, data) {
            if (err) throw err;
            console.log('result: ', data);
            res.send(data);
        })
    })

    // React API

    // variables
    // let imgDirectory = '';
    // let lablDirectory = '';
    let noQueries = 0;
    // let species = [];

    app.post('/start-training', (req, res) => {
        const parsedReq = JSON.parse(req.body)

        const imagesDirectory = parsedReq.imagesDirectory;
        const labelsDirectory = parsedReq.labelsDirectory;
        const queries = parsedReq.noQueries;
        // const speciesReceived = parsedReq.species;
        const saveDirectory = parsedReq.saveDirectory;

        // imgDirectory = imagesDirectory;
        // lablDirectory = labelsDirectory;
        noQueries = queries;
        // species = speciesReceived;
        saveDir = saveDirectory;

        app.use(express.static(imagesDirectory));

        // const script = new ActiveLearning();
        // script.on('completed', (results) => {
        //     res.send("start");
        // });

        const stage = "start";
        const encoderDirectory = __dirname + '/../scripts/encoder';
        // script.runPythonScript(imagesDirectory, labelsDirectory, stage, noQueries, encoderDirectory);

        //exe
        const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/active_learning/dist/main'
        execFile(path, [imagesDirectory, labelsDirectory, stage, noQueries, encoderDirectory], function (err, data) {
            if (err) throw err;
            res.send("start");
        })
        // setTimeout((() => res.send("start")), 1000);
    });

    app.get('/continue-training', (req, res) => {
        
        // const script = new ActiveLearning();
        // script.on('completed', (results) => {
        //     res.send("continue");
        // });

        const stage = "continue";
        // script.runPythonScript('null', 'null', stage, noQueries, 'null');

        //exe
        const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/active_learning/dist/main'
        execFile(path, ['null', 'null', stage, noQueries, 'null'], function (err, data) {
            if (err) throw err;
            res.send("continue");
        })
    });

    app.get('/finish-training', (req, res) => {
        // const script = new ActiveLearning();
        // script.on('completed', (results) => {
            // const resultsPath = saveDir + "/metrics";
            // app.use(express.static(resultsPath));
        //     res.send("finish");
        // });

        const stage = "finish";
        // script.runPythonScript('null', 'null', stage, noQueries, 'null');

        //exe
        const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/active_learning/dist/main'
        execFile(path, ['null', 'null', stage, noQueries, 'null'], function (err, data) {
            if (err) throw err;
            const resultsPath = saveDir + "/metrics";
            app.use(express.static(resultsPath));
            res.send("finish");
        })
    })

    app.listen(8000);
}

module.exports.startExpressServer = startExpressServer;