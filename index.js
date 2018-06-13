const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect('mongodb://toby-adedipe:angelus95@ds159110.mlab.com:59110/powerful-api')
mongoose.connection.once('open', ()=> {
    console.log('connected to database');
})


const init = async () => {
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function(request, reply){
                return `<h1> My Modern Api</h1>`;
            }
        },
        {
            method: 'GET',
            path: '/api/v1/paintings',
            handler: (req, reply)=>{
                return Painting.find()
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            handler: (req, reply)=>{
                const {name, url, techniques } = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    techniques
                });

                return painting.save()
            }
        }
    ]);

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
}

init();