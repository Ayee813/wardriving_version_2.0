import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API endpoint to save game results
app.post('/api/save-result', async (req, res) => {
    try {
        const result = req.body;
        const resultPath = path.join(__dirname, 'public', 'json', 'result.json');

        // Read existing results
        let results = [];
        try {
            const data = await fs.readFile(resultPath, 'utf-8');
            if (data.trim()) {
                results = JSON.parse(data);
            }
        } catch (error) {
            // File doesn't exist or is empty, start with empty array
            console.log('Creating new result.json file');
        }

        // Add new result
        results.push(result);

        // Save to file
        await fs.writeFile(resultPath, JSON.stringify(results, null, 2));

        res.json({ success: true, message: 'Result saved successfully' });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API endpoint to get all results
app.get('/api/results', async (req, res) => {
    try {
        const resultPath = path.join(__dirname, 'public', 'json', 'result.json');

        try {
            const data = await fs.readFile(resultPath, 'utf-8');
            const results = data.trim() ? JSON.parse(data) : [];
            res.json(results);
        } catch (error) {
            // File doesn't exist, return empty array
            res.json([]);
        }
    } catch (error) {
        console.error('Error reading results:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
