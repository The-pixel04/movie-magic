import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\@[a-zA-Z]+.[a-zA-Z]+$/, 'Email is invalid'],
        minLenght: 10
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLenght: [6, 'Password must be at least 6 characters long'],
        match: [/^\w+$/, 'Password must contain only letters and numbers']
    }
});

userSchema.virtual('rePassword')
    .set(function (rePassword) {
        if (rePassword !== this.password) {
            throw new Error(`Passwords didn't match`);
        }
    });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model("User", userSchema);

export default User;