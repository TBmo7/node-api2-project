const app = require('./server.js');

const PORT = 4000;

app.listen(PORT, ()=>{
    console.log(`\n*** Server running on http://localhost:${PORT} ***\n`)
});