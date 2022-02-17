function tryUsingFs() {
    const fs = require('fs');
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

const http = require('http');

function startServer() {
    const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write('[{"message":"this is a message from the server!!"}]');
        res.end();
    }
    });

    server.listen(8000);
}

module.exports.startServer = startServer;

//independent port

const portfinder = require('portfinder');
const EventEmitter = require('events');

class Server extends EventEmitter {

    findPort() {
        portfinder.getPort((err, port) => {
            this.emit('portEstablished', port);
        })
    }

    startServer(port) {
        const server = http.createServer((req, res) => {
            if (req.url === '/') {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.write('[{"message":"this is a message from the server!!"}]');
                res.end();
            }
            });
            
            server.listen(port);
    }
}

module.exports.Server = Server;

//python

const { PythonShell } = require('python-shell');

class PythonScript extends EventEmitter {

    runPythonScript() {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: __dirname+'/../../../../../../pythonscripts', // for prod, comment for dev
            // args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
        };
    
        PythonShell.run('hello.py', options, (err, result) => {
            console.log(options.scriptPath);
            if(err) throw err;
            this.emit('scriptCompleted', result.toString());
        });
    }
}

module.exports.PythonScript = PythonScript;

//using express

const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

function startExpressServer(){
    const app = express();

    // app.use(express.json());
    // app.use(bodyParser.json()); // req.body.what
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text()); // req.body
    app.use(cors()); // setHeader("Access-Control-Allow-Origin", "*") for everything, for every origin

    const directories = [
        {
            what: "folder with images",
            where: ""
        },
        {
            what: "file with labels",
            where: ""
        }
    ]

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

    app.put('/posting', function(req, res) {
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
    })

    app.listen(8000);
}

module.exports.startExpressServer = startExpressServer;