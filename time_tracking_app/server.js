const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Returns a list of all timers.
app.get('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

// Accepts a JSON body with title, project, and id attributes. Will insert a new timer object into its store.
app.post('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        const newTimer = {
            title: req.body.title,
            project: req.body.project,
            id: req.body.id,
            elapsed: 0,
            runningSince: null,
        };
        timers.push(newTimer);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(timers);
        });
    });
});

// Accepts a JSON body with the attribute id and start (a timestamp). Hunts through its store and finds the timer with the matching id. Sets its runningSince to start.
app.post('/api/timers/start', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.runningSince = req.body.start;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

// Accepts a JSON body with the attribute id and stop (a timestamp). Hunts through its store and finds the timer with the matching id. Updates elapsed according to how long the timer has been running (stop - runningSince). Sets runningSince to null.
app.post('/api/timers/stop', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                const delta = req.body.stop - timer.runningSince;
                timer.elapsed += delta;
                timer.runningSince = null;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

// Accepts a JSON body with the attributes id and title and/or project. Hunts through its store and finds the timer with the matching id. Updates title and/or project to new attributes.
app.put('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.title = req.body.title;
                timer.project = req.body.project;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

// Accepts a JSON body with the attribute id. Hunts through its store and deletes the timer with the matching id.
app.delete('/api/timers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        let timers = JSON.parse(data);
        timers = timers.reduce((memo, timer) => {
            if (timer.id === req.body.id) {
                return memo;
            } else {
                return memo.concat(timer);
            }
        }, []);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

app.get('/molasses', (_, res) => {
    setTimeout(() => {
        res.end();
    }, 5000);
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
