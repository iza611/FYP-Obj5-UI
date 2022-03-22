const EventEmitter = require('events');
const { PythonShell } = require('python-shell');
const isDev = require('electron-is-dev');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const { execFile } = require('child_process');

const runWithExe = false
const runWithScript = !runWithExe

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

function startExpressServer() {
    const app = express();
    app.use(bodyParser.text()); // req.body
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors()); // setHeader("Access-Control-Allow-Origin", "*") for everything, for every origin

    let noQueries = 0;

    app.post('/start-training', (req, res) => {
        const parsedReq = JSON.parse(req.body)
        const imagesDirectory = parsedReq.imagesDirectory;
        const labelsDirectory = parsedReq.labelsDirectory;
        // const speciesReceived = parsedReq.species;
        const queries = parsedReq.noQueries;
        const saveDirectory = parsedReq.saveDirectory;

        app.use(express.static(imagesDirectory));
        // species = speciesReceived;
        noQueries = queries;
        saveDir = saveDirectory;

        const stage = "start";
        const encoderDirectory = __dirname + '/../scripts/encoder';

        if(runWithScript) {
            const script = new ActiveLearning();
            script.on('completed', (results) => {
                res.send("start");
            });

            script.runPythonScript(imagesDirectory, labelsDirectory, stage, noQueries, encoderDirectory);
        }

        if(runWithExe) {
            const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/exec_file/dist/main'
            execFile(path, [imagesDirectory, labelsDirectory, stage, noQueries, encoderDirectory], function (err, data) {
                if (err) throw err;
                res.send("start");
            })
        }

    });

    app.get('/continue-training', (req, res) => {
        const stage = "continue";

        if(runWithScript) {
            const script = new ActiveLearning();
            script.on('completed', (results) => {
                res.send("continue");
            });
    
            script.runPythonScript('null', 'null', stage, noQueries, 'null');    
        }

        if(runWithExe) {
            const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/exec_file/dist/main'
            execFile(path, ['null', 'null', stage, noQueries, 'null'], function (err, data) {
                if (err) throw err;
                res.send("continue");
            })
        }

    });

    app.get('/finish-training', (req, res) => {
        const stage = "finish";

        if(runWithScript) {
            const script = new ActiveLearning();
            script.on('completed', (results) => {
                const resultsPath = saveDir + "/metrics";
                app.use(express.static(resultsPath));
                res.send("finish");
            });
        
            script.runPythonScript('null', 'null', stage, noQueries, 'null');
        }
        
        if(runWithExe) {
            const path = '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/scripts/exec_file/dist/main'
            execFile(path, ['null', 'null', stage, noQueries, 'null'], function (err, data) {
                if (err) throw err;
                const resultsPath = saveDir + "/metrics";
                app.use(express.static(resultsPath));
                res.send("finish");
            })
        }
    })


    // <------ PYTHON ------> \\

    // save directory
    let saveDir = '';
    
    app.get('/save/directory', (req, res) => {
        res.send(saveDir);
    });


    // queries
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

    app.listen(8000);
}

module.exports.startExpressServer = startExpressServer;