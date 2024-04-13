import React, { useContext } from "react";
import "../assets/Header.css"
import ActionButton from "./ActionButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ShowAddUserModalContext } from "../Context/ShowModalContext";

const Header = () => {

    const navigate = useNavigate(); // навигация по сайту
    const {ShowUserModal} = useContext(ShowAddUserModalContext);

    const SignOut = () => {
        Cookies.remove("DolgovAuthorized");
        navigate("/signin");
    }

    return (
        <>
            <header>
                <div className="container">
                    <h1 className="title">АО "Радиозавод"</h1>
                    <span className="diplom-theme">Учет инвентаря на складе</span>
                    <div className="header-btns">
                        <ActionButton title={"Добавить сотрудника"} handle={ShowUserModal}/>
                        <button className="signout-btn" onClick={SignOut}>Выйти</button>
                    </div>
                </div>
            </header>
        </>
    )
}


export default Header;