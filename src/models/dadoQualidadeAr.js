const mongoose = require('mongoose');

const dadoQualidadeArSchema = new mongoose.Schema({
    Timestamp: Number,
    extTemp: Number,
    pm10: Number,
    moqaID: String,
    pm25: Number,
    hum: Number
}, { collection: 'dadosar' }); // Especifica o nome da coleção 'dadosar'

module.exports = mongoose.model('DadoQualidadeAr', dadoQualidadeArSchema);
