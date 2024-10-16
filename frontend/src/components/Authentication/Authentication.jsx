import React, { useState, useEffect } from 'react';
import './Authentication.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Authentication() {
    const navigate = useNavigate();
    
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [registrationName, setRegistrationName] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [registrationPhone, setRegistrationPhone] = useState('');
    const [registrationCourse, setRegistrationCourse] = useState('');
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const switchers = document.querySelectorAll('.switcher');

        const handleClick = function () {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'));
            this.parentElement.classList.add('is-active');
        };

        switchers.forEach(item => item.addEventListener('click', handleClick));

        return () => {
            switchers.forEach(item => item.removeEventListener('click', handleClick));
        };
    }, []);

    useEffect(() => {
        handleFetchCourseData();
    }, []);

    const handleFetchCourseData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getAllCourses');
            setCourseData(response.data.data);
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    const login = async (event) => {
        event.preventDefault();

        if (!studentEmail.includes('@')) {
            Swal.fire('Email must contain @');
            return;
        }
        
        if (studentPassword.length < 7) {
            Swal.fire({
                title: 'Password must be at least 7 characters long',
                icon: 'warning',
                background: 'black',
                color: 'white'
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: studentEmail,
                password: studentPassword
            });

            if (response.data.message === 'Invalid Credentials') {
                Swal.fire({
                    title: 'Invalid Credentials',
                    icon: 'error',
                    background: 'black',
                    color: 'white'
                });
                return;
            }

            if (response.data.userId) {
                localStorage.setItem('studentId', response.data.userId);
                navigate(`/dashboard/${response.data.userId}`);
            }
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again later.';

            if (error.message === 'Network Error') {
                errorMessage = 'Check Your Internet Connection';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                title: errorMessage,
                icon: 'error',
                background: 'black',
                color: 'white'
            });
        }

        setStudentEmail('');
        setStudentPassword('');
    };

    const registration = async (event) => {
        event.preventDefault();

        const data = {
            username: registrationName,
            email: registrationEmail,
            phone: registrationPhone,
            course: registrationCourse,
            password: registrationPassword
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', data);

            if (response.data.message === 'Registration Successfully') {
                Swal.fire({
                    title: 'Registration Successful',
                    icon: 'success',
                    background: 'black',
                    color: 'white'
                });

                setRegistrationName('');
                setRegistrationEmail('');
                setRegistrationPassword('');
                setRegistrationPhone('');
                setRegistrationCourse('');
            }
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again later.';

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                title: errorMessage,
                icon: 'error',
                background: 'black',
                color: 'white'
            });

            setRegistrationName('');
            setRegistrationEmail('');
            setRegistrationPassword('');
            setRegistrationPhone('');
            setRegistrationCourse('');
        }
    };

    return (
        <div className='background-image'>
            <section className="forms-section">
                <div className="logo">
                    <img className="logo-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s" alt="Logo" width="80px" style={{ borderRadius: '50%' }} />
                </div>
                <h1 className="section-title">Student Portal</h1>
                <div className="forms">
                    <div className="form-wrapper is-active">
                        <button type="button" className="switcher switcher-login">
                            <h3>Login</h3>
                            <span className="underline"></span>
                        </button>
                        <form className="form form-login" onSubmit={login}>
                            <fieldset>
                                <div className="input-block">
                                    <label htmlFor="login-email">E-mail</label>
                                    <input
                                        type="email"
                                        id="login-email"
                                        placeholder='abc@gmail.com'
                                        value={studentEmail}
                                        required
                                        onChange={(e) => setStudentEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="login-password">Password</label>
                                    <input
                                        type="password"
                                        id="login-password"
                                        placeholder='*******'
                                        value={studentPassword}
                                        required
                                        onChange={(e) => setStudentPassword(e.target.value)}
                                    />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-login">Login</button>
                        </form>
                    </div>
                    <div className="form-wrapper">
                        <button type="button" className="switcher switcher-signup">
                            <h3>Register</h3>
                            <span className="underline"></span>
                        </button>
                        <form className="form form-signup" onSubmit={registration}>
                            <fieldset>
                                <div className="input-block">
                                    <label htmlFor="signup-username">Username</label>
                                    <input
                                        type="text"
                                        id="signup-username"
                                        placeholder='Abcde'
                                        value={registrationName}
                                        required
                                        onChange={(e) => setRegistrationName(e.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-email">Email</label>
                                    <input
                                        type="email"
                                        id="signup-email"
                                        placeholder='abc@gmail.com'
                                        value={registrationEmail}
                                        required
                                        onChange={(e) => setRegistrationEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password">Password</label>
                                    <input
                                        type="password"
                                        id="signup-password"
                                        placeholder='*******'
                                        value={registrationPassword}
                                        required
                                        onChange={(e) => setRegistrationPassword(e.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-phone">Phone No</label>
                                    <input
                                        type="tel"
                                        id="signup-phone"
                                        placeholder='03111111111'
                                        value={registrationPhone}
                                        required
                                        onChange={(e) => setRegistrationPhone(e.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-course">Course</label>
                                    <select
                                        id="signup-course"
                                        name="course"
                                        value={registrationCourse}
                                        onChange={(e) => setRegistrationCourse(e.target.value)}
                                        disabled={!courseData.length}
                                    >
                                        <option disabled value="">Select Course</option>
                                        {courseData.length ? (
                                            courseData.map((course, index) => (
                                                <option key={index} value={course._id}>
                                                    {course.courseName}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Course Available</option>
                                        )}
                                    </select>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-signup">Register</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Authentication;
