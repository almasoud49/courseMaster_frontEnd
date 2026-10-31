import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../services/auth.api";

export default function AdminRoute({ children, me: providedMe }) {
    const [me, setMe] = useState(providedMe || null);
    const [loading, setLoading] = useState(!providedMe);

    useEffect(() => {
        if (providedMe) {
            setMe(providedMe);
            setLoading(false);
            return;
        }

        let active = true;
        getMe()
            .then((res) => {
                if (!active) return;
                setMe(res.data);
            })
            .catch(() => {
                if (!active) return;
                setMe(null);
            })
            .finally(() => {
                if (!active) return;
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [providedMe]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!me) {
        return <Navigate to="/login" replace />;
    }

    if (me.role !== "admin") {
        return <Navigate to="/student" replace />;
    }

    return children;
}
