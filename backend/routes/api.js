const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


module.exports = (supabase) => {
    // User Registration
    // User Registration
    router.post('/register', async (req, res) => {
        const { name, email, password } = req.body;

        // Proceed with registration directly
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) return res.status(400).json({ error: error.message });

        // Insert into users table additional info
        const { error: insertError } = await supabase.from('users').insert([{ id: user.id, name, email }]);

        if (insertError) {
            return res.status(500).json({ error: insertError.message });
        }

        return res.status(201).json({ message: 'User registered successfully' });
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

    async function fetchRecipes(ingredients) {
        const prompt = `Given the ingredients ${ingredients.join(', ')}, what are two delicious recipes I can make?`;
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: 'user', content: prompt }]
            });

            if (completion.choices && completion.choices.length > 0) {
                const recipes = completion.choices[0].message.content.trim().split("\n").filter(line => line.trim() !== "");
                return recipes;
            } else {
                throw new Error("Failed to generate recipes");
            }
        } catch (error) {
            console.error('Error fetching recipe suggestions:', error);
            throw error;
        }
    }


    router.post('/suggest-recipes', async (req, res) => {
        const ingredients = req.body.ingredients;
        console.log("Handling POST request to /suggest-recipes with ingredients:", ingredients);

        try {
            const recipes = await fetchRecipes(ingredients);
            console.log("Sending recipes back to client:", recipes);
            res.json({ recipes });
        } catch (error) {
            console.error('Error in recipe generation:', error);
            res.status(500).json({ error: 'Error fetching recipe suggestions: ' + error.message });
        }
    });


    return router;
};
