
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

export const RequireAuth = ({ children }: { children: ReactNode }) => {

    const jwt = useSelector((item: RootState) => item.user.jwt)

    if (!jwt) {
        return <Navigate to="/auth/login" replace />
    }

    return children
};