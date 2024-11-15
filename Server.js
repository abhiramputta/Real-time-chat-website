import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define Contact schema and model
const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});

const Contact = mongoose.model("Contact", contactSchema);

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add member endpoint

app.post('/api/addmember', async (req, res) => {
  const { userId, contactname } = req.body;

  try {
    // Find the friend by username
    const friend = await User.findOne({ username: contactname });
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the contact already exists for the user
    const existingContact = await Contact.findOne({
      user: userId,
      contacts: friend._id,
    });
    if (existingContact) {
      return res.status(400).json({ message: "User already added" });
    }

    // Add the contact to the user's list
    let userContacts = await Contact.findOne({ user: userId });
    if (!userContacts) {
      userContacts = new Contact({ user: userId, contacts: [friend._id] });
    } else {
      userContacts.contacts.push(friend._id);
    }
    await userContacts.save();

    // Add the user to the friend's contact list
    let friendContacts = await Contact.findOne({ user: friend._id });
    if (!friendContacts) {
      friendContacts = new Contact({ user: friend._id, contacts: [userId] });
    } else {
      friendContacts.contacts.push(userId);
    }
    await friendContacts.save();

    res.status(201).json({ message: "Users added to each other's contact list successfully" });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to fetch messages between two users
app.get("/api/messages", async (req, res) => {
  const { userId, contactId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to send a message from one user to another
app.post("/api/messages", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Retrieve contacts for a user
app.get('/getcontacts', async (req, res) => {
  const { userId } = req.query;

  try {
    const userContacts = await Contact.findOne({ user: userId }).populate('contacts', 'username');
    if (!userContacts) {
      return res.status(404).json({ message: "No contacts found for this user." });
    }

    res.status(200).json({ contacts: userContacts.contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
