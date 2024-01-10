const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cassandra = require('cassandra-driver');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;


const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'companies_keyspace' })

const JWT_SECRET='Mh$P6#3^T!bA5k@DgF9qRw2Zy&8sXpE*';


const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'assets/'); 
    },
    filename: (req, file, cb) => {
     
      if (fs.existsSync('assets/' + file.originalname)) {
        try {
           
            fs.unlinkSync('assets/' + file.originalname);
            cb(null, file.originalname);
        } catch (err) {
            console.error('Error deleting existing file:', err);
            
        }
    }
        else {
            cb(null, file.originalname);
        }
    }
  }),
  limits: {
    fileSize: 5000000, 
    files: 20 
  }
}).fields([{ name: 'company_logo_url', maxCount: 1 }, { name: 'image_urls', maxCount: 20 }]);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/assets', express.static(path.join(__dirname, 'assets')));




app.post('/forgotpassword', (req, res) => {
  const { email } = req.body;

  client.execute('SELECT * FROM users WHERE email = ?', [email], { prepare: true })
    .then(result => {
        const user = result.first();

        if (!user) {
            
            return res.status(404).send('User not found');
        }

        const token = generateToken({ email: email });
      
        
        transporter.sendMail({
          from: 'patel41100@gmail.com',
          to: email,
          subject: 'Password Reset Request',
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
            + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
            + `http://yourwebsite.com/resetpassword?token=${token}\n\n`
            + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        }, (err, info) => {
          if (err) {
            console.error('Error sending email:', err);
            return res.status(500).send('Error sending email');
          }
          console.log('Email sent:', info.response);
        return res.status(200).send('Password reset email sent');
    })
  })
    .catch(error => {
        console.error('Error querying Cassandra:', error);
        return res.status(500).send('Internal server error');
    });
});


app.post('/resetpassword', (req, res) => {
  const { token, newPassword } = req.body;

  try {
    
    const decodedToken = verifyToken(token);

    
    const email = decodedToken.email;

    
    client.execute('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], { prepare: true })
    .then(result => {
       
        return res.status(200).send('Password updated successfully');
    })
    .catch(error => {
        console.error('Error updating password in Cassandra:', error);
        return res.status(500).send('Internal server error');
    });

  } catch (err) {
   
    console.error('Token verification failed:', err);
    return res.status(400).send('Invalid or expired token');
  }
});


app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userId = uuidv4();

    const query = 'INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)';
    await client.execute(query, [userId, username, email, hashedPassword]);

    res.status(200).send('User signed up successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? ALLOW FILTERING';
  client.execute(query, [email], { prepare: true })
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const user = result.rows[0];

      bcrypt.compare(password, user.password)
        .then((passwordMatch) => {
          if (passwordMatch) {
            const userId = user.user_id;
            const username = user.username;

          
            const token = jwt.sign({ userId, username, email }, JWT_SECRET, { expiresIn: '3h' });

            res.cookie('jwt', token, {
              httpOnly: true,
              secure: true
            });
            
            return res.status(200).json({ message: 'Login successful', token, username, email });
          } else {
            return res.status(401).json({ message: 'Incorrect password' });
          }
        })
        .catch((error) => {
          console.error('Error comparing passwords:', error);
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      console.error('Error logging in:', err);
      res.sendStatus(500);
    });
});


app.post('/api/sendEmail', upload, async (req, res) => {

  const {token, email, company_email, subject, message, sender_id, receiver_id, sender_name, receiver_name } = req.body;

  try {
    const messageId = uuidv4();
    const messageQuery = 'INSERT INTO messages (message_id, message, receiver_id, sender_id, subject, user_id, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await client.execute(messageQuery, [messageId, message, receiver_id, sender_id, subject, sender_id, sender_name]);

    const messagesQuery = 'INSERT INTO messages (message_id, message, receiver_id, sender_id, subject, user_id, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await client.execute(messagesQuery, [messageId, message, receiver_id, sender_id, subject, receiver_id, receiver_name]);

    
    res.status(200).send('Message sent');

  } catch (error) {
    console.error('Error sending the message:', error);
    res.status(500).send('Error sending the message');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587, 
    secure: false, 
    auth: {
      user: email, 
      pass: token,
    },
  });

  try {
    const mailOptions = {
      from: email, 
      to: company_email,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }

});

app.post('/api/saveData', upload, async (req, res) => {
  const { company_contact, company_description, company_email, company_location, company_name, updates, user_id, username } = req.body;
  const { company_logo_url, image_urls } = req.files;

  
  
  try {
    const companyId = uuidv4();
    const companyLogoUrl = req.protocol + '://' + req.get('host') + '/assets/' + company_logo_url[0].filename;
    const processedImages = [];
    const uniqueImageIds = new Set();
    
    for (const image of image_urls) {
      const imageUrl = req.protocol + '://' + req.get('host') + '/assets/' + image.filename;
      if (!processedImages.find(img => img.url === imageUrl)) {
        const imageId = uuidv4();
        processedImages.push({ id: imageId, url: imageUrl });
        uniqueImageIds.add(imageId);
      }
    }
    
    const imageUrls = processedImages.map(image => image.url);
    const companyQuery = 'INSERT INTO companies (id, company_contact, company_description, company_email, company_location, company_logo_url, company_name, image_urls, updates, user_id, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    await client.execute(companyQuery, [companyId, company_contact, company_description, company_email, company_location, companyLogoUrl, company_name, imageUrls, updates, user_id, username]);
    
    res.status(200).send('Company saved successfully');
  } catch (error) {
    console.error('Error saving company data:', error);
    res.status(500).send('Error saving company data');
  }
});

app.delete('/api/deletePage/:pageId', async (req, res) => {
  const { pageId } = req.params;

  try {
    
    const deleteQuery = 'DELETE FROM companies WHERE id = ? ALLOW FILTERING';
    await client.execute(deleteQuery, [pageId]);

    res.status(200).send('Company page deleted successfully');
  } catch (error) {
    console.error('Error deleting company page:', error);
    res.status(500).send('Error deleting company page');
  }
});




app.get('/api/getData', async (req, res) => {
  try {

    const companiesQuery = 'SELECT id, user_id, company_contact, company_description, company_email, company_location, company_logo_url, company_name, image_urls, updates FROM companies';
    const companiesResult = await client.execute(companiesQuery);

    if (companiesResult.rows.length === 0) {
      return res.status(404).json({ error: 'No companies found' });
    }

    const companiesWithIds = companiesResult.rows.map(company => ({
      id: company.id,
      user_id: company.user_id,
      company_contact: company.company_contact,
      company_description: company.company_description,
      company_email: company.company_email,
      company_location: company.company_location,
      company_logo_url: company.company_logo_url,
      company_name: company.company_name,
      image_urls: company.image_urls,
      updates: company.updates
    }));

    return res.status(200).json(companiesWithIds);

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).send('Error fetching data');
  }
});

app.get('/api/userData', async (req, res) => {
  try {
    
    const { user_id } = req.query;

    const query = 'SELECT id, company_contact, company_description, company_email, company_location, company_logo_url, company_name, image_urls, updates FROM companies WHERE user_id = ? ALLOW FILTERING';

    const result = await client.execute(query, [user_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No data found for this user' });
    } else {
      
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/posts', async (req, res) => {
  try {

    const query = 'SELECT * FROM posts';
    const result = await client.execute(query);
    const posts = result.rows.map(row => ({
      post_id: row.post_id,
      created_at: row.created_at,
      post_content: row.post_content,
      user_id: row.user_id,
      username: row.username
    }));
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
});


app.post('/api/posts', async (req, res) => {
  const { user_id, post_content, username } = req.body;

  try {
    const postId = uuidv4();
    const createdAt = new Date();
    const query = 'INSERT INTO posts (post_id, created_at, post_content, user_id, username) VALUES (?, ?, ?, ?, ?)';
    await client.execute(query, [postId, createdAt, post_content, user_id, username]);

    const selectQuery = 'SELECT * FROM posts WHERE post_id = ? ALLOW FILTERING';
    const result = await client.execute(selectQuery, [postId]);
    const newPost = result.rows[0];

    res.status(201).json(newPost); 
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post');
  }
});


app.get('/api/comments', async (req, res) => {
  const { post_id } = req.query;

  try {
    const query = 'SELECT comment_id, content FROM comments WHERE post_id = ? ALLOW FILTERING';
    const result = await client.execute(query, [post_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No data found' });
    } else {
      
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});


app.post('/api/comments', async (req, res) => {
  const { post_id, user_id, content, username } = req.body;

  try {
    const commentId = uuidv4();
    const createdAt = new Date();
    const query = 'INSERT INTO comments (comment_id, content, created_at, post_id, user_id, username) VALUES (?, ?, ?, ?, ?, ?)';
    await client.execute(query, [commentId, content, createdAt, post_id, user_id, username]);

    const selectQuery = 'SELECT * FROM comments WHERE comment_id = ? ALLOW FILTERING';
    const result = await client.execute(selectQuery, [commentId]);
    const newComment = result.rows[0];

    res.status(201).send(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Error creating comment');
  }
});

app.post('/api/replies', async (req, res) => {
  const { post_id, comment_id, user_id, content, username } = req.body;

  try {
    const replyId = uuidv4();
    const createdAt = new Date();
    const query = 'INSERT INTO replies (reply_id, comment_id, content, created_at, post_id, user_id, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await client.execute(query, [replyId, comment_id, content, createdAt, post_id, user_id, username]);

    const selectQuery = 'SELECT * FROM replies WHERE reply_id = ? ALLOW FILTERING';
    const result = await client.execute(selectQuery, [replyId]);
    const newReply = result.rows[0];

    res.status(201).send(newReply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).send('Error creating reply');
  }
});

app.get('/api/messages', async (req, res) => {
  const { userId } = req.query;

  try {
    const query = 'SELECT message_id, sender_id, receiver_id, subject, message FROM messages WHERE user_id IN (?, ?)';
    const result = await client.execute(query, [userId, userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No messages found' });
    } else {
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});



app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});    