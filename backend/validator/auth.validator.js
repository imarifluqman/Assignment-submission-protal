const { z } = require('zod')

const signupSchema = z.object({
    username: z.string({ required_error: 'Name is required' }).trim().min(3, { message: 'Name atleast of 3 characters' }),

    email: z.string({ required_error: 'Email is required' }).trim().email({ message: 'Invalid email' }).includes('@', { message: 'Email should contain @' }),

    phone: z.string({ required_error: 'Name is required' }).trim().length(11, { message: 'Phone number should be of length 11' }),

    
    password: z.string({ required_error: 'Password is required' }).trim().min(7, { message: 'Password atleast consist of 7 characters' }).max(20, { message: "Password can't be consist of more than 20 characters " }),

    course: z.string({ required_error: 'Course is Required' }).trim()
})

const instructorSignUp =z.object({
    instructorName :z.string({ required_error: 'Name is required' }).trim().min(3, { message: 'Name atleast of 3 characters' }),

    email: z.string({ required_error: 'Email is required' }).trim().email({ message: 'Invalid email' }).includes('@', { message: 'Email should contain @' }),

    phone: z.string({ required_error: 'Name is required' }).trim().length(11, { message: 'Phone number should be of length 11' }),

    
    password: z.string({ required_error: 'Password is required' }).trim().min(7, { message: 'Password atleast consist of 7 characters' }).max(20, { message: "Password can't be consist of more than 20 characters " }),

    course: z.string({ required_error: 'Course is Required' }).trim(),

    qualification :z.string({ required_error: 'Course is Required' }).trim()
})

const loginSchema = z.object({
    email: z.
        string({ required_error: "Email is required" }).trim().email({ message: 'Invalid Email' }).includes('@', { message: "Email should contain @" }),
    password: z.
        string({ required_error: "Password is required" }).trim().min(7, { message: "Password must be atleast of 7 characters" }).max(255, { message: "Maximum length of Password is 255 characters" }),


})

module.exports = { signupSchema, loginSchema , instructorSignUp }