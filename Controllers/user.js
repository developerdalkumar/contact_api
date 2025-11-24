import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (name == '' || email == '' || phone == '' || password == '') return res.json({ message: "All Fields are Required" });

    let user = await User.findOne({ email })
    if (user)
        return res.json({ message: "User already Exist...!", success: false });


    const hashPassword = await bcrypt.hash(password, 10)
    user = await User.create({ name, email, phone, password: hashPassword });


    // console.log("printing the data", req.body)
    res.json({ message: 'User created successfulyy', success: true, user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (email == '' || password == '') return res.json({ message: "All Fields are Required" });

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: " User Not Exist", success: false })
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) return res.json({message:'Invalid Password ', success: false});


    var token = jwt.sign({userId:user.id}, process.env.JWT,{
        expiresIn:'1d'
    });

    res.json({ message: `welcome ${user.name}`, token, success: true });


};