import React from 'react'
import SignIn from './SignIn';
import AdminDashboard from './AdminDashBoard'
import FacultyDashBoard from './FacultyDashBoard'
import { Container } from "react-bootstrap"

export default function App() {
    return (
        <>
            <FacultyDashBoard />
            {/* <AdminDashboard /> */}
            {/* <SignIn /> */}
        </>
    )
}