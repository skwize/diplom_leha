import React, { useEffect, useState } from "react";
import "../assets/EditObjectModal.css";
import { useForm } from "react-hook-form";
import ActionButton from "./ActionButton";


const EditObjectModal = ({DataContext, SubmitHandle, cancelHandle, isVisible}) => {

    const {register, handleSubmit} = useForm();
    const [name, setName] = useState("");
    const [inventory_type, setInventoryType] = useState("");
    const [inventory_number, setInventoryNumber] = useState("");
    const [position, setPosition] = useState("");
    const [responsible, setResponsible] = useState("");
    const [ResPhone, setResPhone] = useState("");
    const [status, setStatus] = useState("");
    
    useEffect(()=>{
        setName(DataContext.name);
        setInventoryType(DataContext.inventory_type);
        setInventoryNumber(DataContext.inventory_number);
        setPosition(DataContext.position);
        setStatus(DataContext.status);
    }, [DataContext])

    function onNameChange(event){
        setName(event.target.value);
    }

    function onTypeChange(event){
        setInventoryType(event.target.value);
    }

    function onNumberChange(event){
        setInventoryNumber(event.target.value);
    }

    function onPositionChange(event){
        setPosition(event.target.value);
    }

    function onResponsibleChange(event){
        setResponsible(event.target.value);
    }

    function onResPhoneChange(event){
        setResPhone(event.target.value);
    }

    function onStatusChange(event){
        setStatus(event.target.value);
    }


    return(
        <div className="modal-body" style={{display: isVisible ? "flex" : "none"}}>
            <div className="modal-block">
                <h1 className="modal-title">Изменить данные оборудования</h1>
                <form onSubmit={handleSubmit(SubmitHandle)} className="modal-form">
                    <input {...register("name")} placeholder="Название" required={true} className="modal-input" onChange={onNameChange} value={name}/>
                    <input {...register("inventory_type")} placeholder="Тип" required={true} className="modal-input" onChange={onTypeChange} value={inventory_type}/>
                    <input {...register("inventory_number")} placeholder="Инвентарный номер" required={true} className="modal-input" onChange={onNumberChange} value={inventory_number}/>
                    <input {...register("position")} placeholder="Местоположение" className="modal-input" onChange={onPositionChange} value={position}/>
                    <input {...register("responsible")} placeholder="ФИО ответственного" className="modal-input" onChange={onResponsibleChange} value={responsible}/>
                    <input {...register("resPhone")} placeholder="Номер телефона ответственного" className="modal-input" onChange={onResPhoneChange} value={ResPhone}/>
                    <select {...register("status")} className="modal-select" required={true} onChange={onStatusChange} value={status}>
                        <option value="Исправен">Исправен</option>
                        <option value="Не исправен">Не исправен</option>
                        <option value="Списан">Списан</option>
                    </select>
                    <div className="form-btns">
                        <input type="submit" value="Изменить" className="form-submit"/>
                        <ActionButton title={"Отмена"} isDisabled={false} handle={cancelHandle}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditObjectModal;