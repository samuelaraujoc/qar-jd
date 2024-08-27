const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

// Endpoint existente para buscar dados com base em data
router.get('/', async (req, res) => {
    try {
        const { singleDate} = req.query;
        
        const match = {};
        if (singleDate) {
            const date = new Date(singleDate);
            const startTimestamp = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0).getTime() / 1000;
            const endTimestamp = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999).getTime() / 1000;
            match.Timestamp = {
                $gte: startTimestamp,
                $lte: endTimestamp
            };
        }

        // Agregação para calcular a média por hora
        const dados = await DadoQualidadeAr.aggregate([
            { $match: match },
            {
                $group: {
                
                    _id: {
                        year: { $year: { $toDate: { $multiply: ["$Timestamp", 1000] } } },
                        month: { $month: { $toDate: { $multiply: ["$Timestamp", 1000] } } },
                        day: { $dayOfMonth: { $toDate: { $multiply: ["$Timestamp", 1000] } } },
                        hour: { $hour: { $toDate: { $multiply: ["$Timestamp", 1000] } } },
                        moqa: "$moqaID"
                    },
                    avgPM25: { $avg: "$pm25" },
                    avgPM10: { $avg: "$pm10" },
                    avgHum: { $avg: "$hum" },
                    avgExtTemp: { $avg: "$extTemp" }
                }
            },
            {
                $project: {
                    "_id.moqa": 1,
                    Timestamp: {
                        $dateToString: {
                            format: "%Y-%m-%dT%H:00:00Z",
                            date: {
                                $dateFromParts: {
                                    year: "$_id.year",
                                    month: "$_id.month",
                                    day: "$_id.day",
                                    hour: "$_id.hour"
                                }
                            }
                        }
                    },
                    avgPM25: { $round: ["$avgPM25", 1] },
                    avgPM10: { $round: ["$avgPM10", 1] },
                    avgHum: { $round: ["$avgHum", 1] },
                    avgExtTemp: { $round: ["$avgExtTemp", 1] },
                }
            },
            { $sort: { Timestamp: 1 } }
        ]);

        res.json(dados);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});
module.exports = router;