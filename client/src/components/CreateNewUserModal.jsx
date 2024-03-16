import React from "react";
import "../assets/CreateNewUserModal.css";
import { useForm } from "react-hook-form";
import ActionButton from "./ActionButton";


const CreateNewUserModal = ({SubmitHandle, cancelHandle, isVisible}) => {

    const {register, handleSubmit} = useForm();

    return(
        <div className="modal-body" style={{display: isVisible  ? "flex" : "none"}}>
            <div className="modal-block">
                <h1 className="modal-title">Добавить пользователя</h1>
                <form onSubmit={handleSubmit(SubmitHandle)} className="user-form">
                    <input {...register("username")} placeholder="Логин" required={true} className="modal-input"/>
                    <input {...register("password")} placeholder="Пароль" type="password" required={true} className="modal-input"/>
                    <div className="form-btns">
                        <input type="submit" value="Добавить" className="form-submit"/>
                        <ActionButton title={"Отмена"} isDisabled={false} handle={cancelHandle}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewUserModal;