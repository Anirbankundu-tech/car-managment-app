const User=require('../models/userModels');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

exports.signup=async(req,res)=>
    {
        try {
            const{username,email,password}=req.body;
            const user=new User({username,email,password});
            await user.save();
            res.status(201).json({message:'User registerd successfully'});
            
        } catch (err) {
            res.status(500).json({error:err.message});
            }
    };
    exports.login = async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };


    