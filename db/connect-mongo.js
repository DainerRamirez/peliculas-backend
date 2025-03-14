
const mongoose = require('mongoose');

const getConnection = async () => {

    try {   
        const url = 'mongodb+srv://user_bd:admin123@dainer.lk97h.mongodb.net/ing-web-peliculas?retryWrites=true&w=majority&appName=Dainer'
    
        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch(error) {
        console.log(error);
    }
}

    module.exports = {
        getConnection,
    }

