import React, { useState } from "react";
import "../assets/Header.css"
import ActionButton from "./ActionButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CreateNewUserModal from "./CreateNewUserModal";

const Header = () => {

    const navigate = useNavigate();
    const [ModalVisible, setModalVisible] = useState(false);

    const SignOut = () => {
        Cookies.remove("DolgovAuthorized");
        navigate("/signin");
    }

    function ShowModal() {
        return setModalVisible(true);
    }
    
    function HideModal() {
        return setModalVisible(false);
    }

    const CreateUser = async (data) => {
        const query = await fetch("http://localhost:8000/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const response = await query.json();

        if(response === "Ошибка создания пользователя"){
            return alert(response);
        }

        alert("Пользователь создан!")
        return setModalVisible(false)
    }

    return (
        <>
            <header>
                <div className="container">
                    <h1 className="title">ООО "Радиозавод"</h1>
                    <span className="diplom-theme">Учет инвентаря на складе</span>
                    <div className="header-btns">
                        <ActionButton title={"Добавить сотрудника"} handle={ShowModal}/>
                        <button className="signout-btn" onClick={SignOut}>Выйти</button>
                    </div>
                </div>
            </header>
            <CreateNewUserModal isVisible={ModalVisible} SubmitHandle={CreateUser} cancelHandle={HideModal}/>
        </>
    )
}


export default Header;