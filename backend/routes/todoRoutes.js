const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

// GET todos (user-specific)
router.get("/", auth, async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
});

// ADD todo
router.post("/", auth, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        user: req.user.id
    });

    await todo.save();
    res.json(todo);
});

// DELETE todo
router.delete("/:id", auth, async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// TOGGLE complete
router.put("/:id", auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

module.exports = router;