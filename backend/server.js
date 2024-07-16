const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Fetch list of dishes
app.get('/dishes', (req, res) => {
    db.all("SELECT * FROM dishes", [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            data: rows
        });
    });
});

// Toggle the isPublished status of a dish
app.put('/dishes/:id/toggle', (req, res) => {
    const { id } = req.params;
    db.get("SELECT isPublished FROM dishes WHERE dishId = ?", [id], (err, row) => {
        if (err || !row) {
            res.status(400).json({ error: "Dish not found" });
            return;
        }
        const newStatus = !row.isPublished;
        db.run(`UPDATE dishes SET isPublished = ? WHERE dishId = ?`, [newStatus, id], function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ success: true, isPublished: newStatus });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
