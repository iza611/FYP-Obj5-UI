const fs = require('fs');
function tryUsingFs() {
    const path = '/Users/ozogiz01/OneDrive - StepStone Group/Desktop/Metadata (non-human images only).json';
    result = fs.existsSync(path);
    console.log(result);
    console.log('yes,youre in');
}

function hello() {
    console.log("heloł hał ar ju");
}
module.exports.hello = hello;
module.exports.tryUsingFs = tryUsingFs;

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

class PythonScript extends EventEmitter {

    runPythonScript() {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: isDev ? __dirname + '/../scripts' : __dirname + '/../scripts'
        };

        PythonShell.run('hello.py', options, (err, result) => {
            if (err) throw err;
            this.emit('scriptCompleted', result.toString());
        });
    }
}

module.exports.PythonScript = PythonScript;

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
    app.use(cors()); // setHeader("Access-Control-Allow-Origin", "*") for everything, for every origin

    // TESTING 

    app.get('/message', (req, res) => {
        res.send('[{"message":"this is a message from the server!!"}]');
    });

    app.get('/test', (req, res) => {
        res.send('test');
    });

    // app.post('/posting',function(req,res) {
    //     const dir = {
    //         what: "folder with images",
    //         where: req.body
    //     };
    //     directories.push(dir);
    //     res.send(directories);
    // });

    app.put('/posting', function (req, res) {
        const dir = directories.find(d => d.what === "folder with images");
        dir.where = req.body;
        res.send(directories);
    });

    app.get('/run/python/script', (req, res) => {
        const pythonScript = new PythonScript();
        pythonScript.on('scriptCompleted', (results) => {
            res.send(results);
        });
        pythonScript.runPythonScript();
    });

    app.get('/module/dir', (req, res) => {
        res.send(__dirname);
        // res.send(`file://${path.join(__dirname, '/../scripts')}`)
        // const path = __dirname + '/../scripts';
        // fs.readdir((path), (err, files) => {
        //     let list = [];
        //     files.forEach(file => {
        //         list.push(file)
        //     });
        //     res.send(list);
        // });

    })

    // ACTIVE LEARNING

    const saveDir = ''

    let queriesAnnotations = []
    let queriesIds = []

    const speciesDictionary = {}
    let labels = []

    app.get('/start/active/learning', (req, res) => {
        const script = new ActiveLearning();
        script.on('completed', (results) => {
            res.send(results);
        });

        const imgDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/ena24';
        const lablDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/Metadata (non-human images only).json';
        const stage = "start";
        const noQueries = 3;
        const encoderDirectory = __dirname + '/../scripts/encoder';
        script.runPythonScript(imgDirectory, lablDirectory, stage, noQueries, encoderDirectory);
    })

    const execFile = require('child_process').execFile;
    app.get('/run/exe', (req, res) => {
        const imgDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/ena24';
        const lablDirectory = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/Metadata (non-human images only).json';
        const stage = "start";
        const noQueries = 3;
        const encoderDirectory = __dirname + '/../scripts/encoder';

        const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/active_learning/dist/main'
        execFile(path, [imgDirectory, lablDirectory, stage, noQueries, encoderDirectory], function (err, data) {
            if (err) throw err;
            console.log('result: ', data);
            res.send(data);
        })
    })

    // MOCKING 

    const resultsPath = "/Users/ozogiz01/OneDrive\ -\ StepStone\ Group/Desktop/ELA\ demo/results";
    app.use(express.static(resultsPath));

    // variables
    let imgDirectory = '';
    let lablDirectory = '';
    let noQueries = 0;
    let species = [];

    app.post('/start-training', (req, res) => {
        const parsedReq = JSON.parse(req.body)

        const imagesDirectory = parsedReq.imagesDirectory;
        const labelsDirectory = parsedReq.labelsDirectory;
        const queries = parsedReq.noQueries;
        const speciesReceived = parsedReq.species;

        imgDirectory = imagesDirectory;
        lablDirectory = labelsDirectory;
        noQueries = queries;
        species = speciesReceived;

        app.use(express.static(imagesDirectory));

        // run python scripts
        //  prep data
        //  prep embeddings
        //  query for active learning
        // save query ids on server and send later

        setTimeout((() => res.send("start")), 1000);
    });

    app.post('/continue-training', (req, res) => {
        const parsedReq = JSON.parse(req.body);
        // run python scripts
        // select another portion of queries
        setTimeout((() => res.send("start")), 1000);
    });

    app.get('/query-ids/:round', (req, res) => {
        let mockedIds = [];
        if (req.params.round === '1') {
            mockedIds = ['0a0b939c-1dfb-11ea-bbbb-5cf370671a19',
                '0a0b939d-1dfb-11ea-86a0-5cf370671a19',
                '0a0cd642-1dfa-11ea-ab99-5cf370671a19']
        }
        if (req.params.round === '2') {
            mockedIds = ['0a1cbe58-1dfb-11ea-847d-5cf370671a19',
                '0a1cbe59-1dfb-11ea-a66a-5cf370671a19',
                '0a1ec362-1dfa-11ea-b5c6-5cf370671a19']
        }
        if (req.params.round === '3') {
            mockedIds = ['0a2a9cd2-1dfa-11ea-aaa2-5cf370671a19',
                '0a3af9ae-1dfb-11ea-888c-5cf370671a19',
                '0a3af9af-1dfb-11ea-9aaa-5cf370671a19']
        }
        // mockedIds = [
        //     '0a3fbac0-1dfa-11ea-8af6-5cf370671a19',
        //     '0a04bd82-1dfb-11ea-8718-5cf370671a19'
        // ];
        res.send(mockedIds);
    });

    app.get('/species', (req, res) => {
        res.send(species);
    });

    let labels0 = []

    app.post('/label/:round/:query', (req, res) => {
        label = req.body;
        labels0.push(label);
        res.send("server received labels");
    });

    app.get('/testlbl', (req, res) => {
        res.send(labels0);
    })

    app.get('/finish-training', (req, res) => {
        const parsedReq = JSON.parse(req.body);
        // run python scripts
        // save results in directory
        // res will have results
        setTimeout((() => res.send("finish")), 1000);
    })

    app.listen(8000);
}

module.exports.startExpressServer = startExpressServer;

function getMockedQueryIds() {
    return [1, 2, 3];
}