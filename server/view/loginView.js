const layout = require('express').Router();
const { join } = require('path');

layout.get("/", (req, res)=>{
    res.sendFile(join(req.__dirname, 'src/view/login.html'));
})


module.exports = layout;