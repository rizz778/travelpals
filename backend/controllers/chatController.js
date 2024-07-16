import Chat from '../models/Chat.js';

// Get chat history between two users
export const getChatHistory = async (req, res) => {
  const userId = req.user.id;
  const recipientId = req.params.recipientId;

  try {
    const chat = await Chat.findOne({
       participants: { $all: [userId, recipientId] } })
       .populate('participants', 'name')
      .exec();

    if (!chat) {
      return res.status(404).json({ message: 'Chat history not found' });
    }

    // Transform messages based on the requester
    const transformedMessages = chat.messages.map((message) => {
      if (message.sender.toString() === userId) {
        return { ...message.toObject(), status: 'sent' };
      } else {
        return { ...message.toObject(), status: 'received' };
      }
    });

    res.status(200).json(transformedMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save new message
export const saveMessage = async (senderId, recipientId, text) => {
  try {
    console.log('saveMessage called with:', { senderId, recipientId, text });
    if (!senderId || !recipientId || !text) {
      throw new Error('Missing required fields');
    }
    let chat = await Chat.findOne({ participants: { $all: [senderId, recipientId] } }).exec();

    if (!chat) {
      chat = new Chat({ participants: [senderId, recipientId], messages: [] });
    }
    console.log('Before saving message:', chat);
    chat.messages.push({ text, sender: senderId, recipient: recipientId,status: 'sent',timestamp: new Date(),  });
    console.log('After pushing message:', chat);
    
    await chat.save();
    console.log('Message saved successfully');
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};