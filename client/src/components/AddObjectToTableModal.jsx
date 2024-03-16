import React from "react";
import "../assets/AddObjectToTableModal.css";
import { useForm } from "react-hook-form";
import ActionButton from "./ActionButton";


const AddObjectToTableModal = ({SubmitHandle, cancelHandle, isVisible}) => {

    const {register, handleSubmit} = useForm();

    return(
        <div className="modal-body" style={{display: isVisible  ? "flex" : "none"}}>
            <div className="modal-block">
                <h1 className="modal-title">Добавить оборудование</h1>
                <form onSubmit={handleSubmit(SubmitHandle)} className="modal-form">
                    <input {...register("name")} placeholder="Название" required={true} className="modal-input"/>
                    <input {...register("inventory_type")} placeholder="Тип" required={true} className="modal-input"/>
                    <input {...register("inventory_number")} placeholder="Инвентарный номер" required={true} className="modal-input"/>
                    <input {...register("position")} placeholder="Местоположение" className="modal-input"/>
                    <select {...register("status")} className="modal-select" required={true}>
                        <option value="Исправен">Исправен</option>
                        <option value="Не исправен">Не исправен</option>
                    </select>
                    <div className="form-btns">
                        <input type="submit" value="Добавить" className="form-submit"/>
                        <ActionButton title={"Отмена"} isDisabled={false} handle={cancelHandle}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddObjectToTableModal;