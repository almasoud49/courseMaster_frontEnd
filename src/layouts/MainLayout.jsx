import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { getMeAsync } from "../store/slices/authSlice";
import { fetchMyEnrollments } from "../store/slices/enrollmentSlice";

export default function MainLayout() {
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const lastFetchedTokenRef = useRef(null);

    useEffect(() => {
        if (token && !isAuthenticated) {
            dispatch(getMeAsync());
        }
    }, [token, isAuthenticated, dispatch]);

    useEffect(() => {
        // Fetch enrollments once per auth token/session to avoid repeated requests
        if (isAuthenticated && token && lastFetchedTokenRef.current !== token) {
            lastFetchedTokenRef.current = token;
            dispatch(fetchMyEnrollments());
        }
    }, [isAuthenticated, token, dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
