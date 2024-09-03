"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { useGlobalContext } from "./GlobalContext";

const AuthContext = () => {
    //const { updateGlobalState } = useGlobalContext();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [logado, setLogado] = useState(false);
    const [errors, setErrors] = useState(null);

    async function login(email, senha) {

        console.log(email, senha);

        setLoading(true);
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": senha,
                }),
            });
            const json = await response.json();
            console.log(json);
            // getConfig(json.data.access_token, email);
        } catch (erro) {
            alert(erro);
            setErrors(erro);
        } finally {
            setLoading(false);
        }
    };

    async function getConfig(token, email) {
        try {
            const response = await fetch(`/users?filter[email][_eq]=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const json = await response.json();
            console.log(json);
            localStorage.setItem("logado", true);
            //updateGlobalState({ logado: true });
            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        login,
        loading,
        //logado,
        //errors,
    }
}

export default AuthContext;
