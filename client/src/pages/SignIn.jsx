import React from "react";
import { useForm } from "react-hook-form";
import "../assets/SignIn.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        const response = await fetch("http://localhost:8000/auth/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const authorized = await response.json();

        Cookies.set("DolgovAuthorized", authorized.authorized);
        
        return navigate("/");
    };

    return (
        <div className="signin-page">
            <div className="signin-block">
                <h1 className="signin-title">Вход</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                    <input {...register("username", {required: true})} placeholder="Имя пользователя" required={true}/>
                    <input {...register("password", {required: true})} type="password" placeholder="Пароль" required={true}/>
                    <input type="submit" value="Войти" className="submit" />
                </form>
            </div>
        </div>
    )
}

export default SignIn;