require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Require the supabase client initialized in a separate file or here directly
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Import the router from api.js and pass supabase client to it
const apiRouter = require('./routes/api')(supabase);

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the apiRouter under '/api'
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
