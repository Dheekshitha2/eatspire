const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
    // User Registration
    router.post('/register', async (req, res) => {
        const { name, email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) return res.status(400).json({ error: error.message });

        // Save additional user info
        await supabase.from('users').insert([{ id: data.user.id, name, email }]);

        res.status(201).json({ message: 'User registered successfully' });
    });

    // User Login
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return res.status(400).json({ error: error.message });

        res.json({ token: data.session.access_token });
    });

    // Get Ingredients
    router.get('/ingredients', async (req, res) => {
        const { data, error } = await supabase.from('ingredients').select('*');

        if (error) return res.status(400).json({ error: error.message });

        res.json(data);
    });

    router.post('/ingredients', async (req, res) => {
        const { name, expiry_date } = req.body;

        if (!name || !expiry_date) {
            console.error('Missing required fields:', { name, expiry_date });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const { data, error } = await supabase.from('ingredients').insert([{ name, expiry_date }]).select();
            console.log('Data received:', data); // Log the full data object
            if (error) {
                console.error('Error adding ingredient:', error);
                return res.status(400).json({ error: error.message });
            }

            if (!data || data.length === 0) {
                console.error('No ingredient data was returned after insert.');
                return res.status(500).json({ error: 'No ingredient data returned after insert' });
            }

            console.log('Ingredient added:', data[0]);
            res.status(201).json(data[0]);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    });




    // Delete Ingredient
    router.delete('/ingredients/:id', async (req, res) => {
        const { id } = req.params;
        const { data, error } = await supabase.from('ingredients').delete().eq('id', id);

        if (error) return res.status(400).json({ error: error.message });

        res.status(204).end();
    });

    // Recipe Suggestions
    router.post('/suggest-recipes', async (req, res) => {
        const { ingredients } = req.body;
        // Mocked response for simplicity. Replace with your actual logic
        const recipes = [
            'Recipe 1 based on ingredients',
            'Recipe 2 based on ingredients',
        ];
        res.json({ recipes });
    });

    return router;
};
