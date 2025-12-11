import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'

export default function AppLayout() {
    return (
        <>
            <header className='bg-gray-800 py-6 px-4 text-white'>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-64'>
                        <Logo />
                    </div>
                    <nav>

                    </nav>
                </div>
            </header>
            <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
                <Outlet />
            </section>

            <footer className='py-5'>
                <p className='text-center'>
                    &copy; {new Date().getFullYear()} UpTask - Todos los derechos reservados
                </p>

            </footer>
        </>
    )
}
