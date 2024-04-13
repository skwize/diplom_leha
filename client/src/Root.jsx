import React, {useState, useEffect, useContext} from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import Header from "./components/Header";
import ActionButton from "./components/ActionButton";
import "./assets/Root.css";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom"
import AddObjectToTableModal from "./components/AddObjectToTableModal";
import EditObjectModal from "./components/EditObjectModal";
import CreateNewUserModal from "./components/CreateNewUserModal";
import { ShowAddUserModalContext } from "./Context/ShowModalContext";

export function loader () {
  const authorized = Cookies.get("DolgovAuthorized");
  console.log(authorized);
  if (!authorized){
    return redirect("/signin");
  }
  return null;
} 

const customStyles = {
	header: {
		style: {
			minHeight: '56px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '2px',
			borderTopColor: defaultThemes.default.divider.default,
      fontSize: "18px",
      fontWeight: "700"
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '2px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '2px',
				borderRightColor: defaultThemes.default.divider.default,
        fontSize: "16px",
			},
		},
	},
};

const conditionalRowStyle = [
  {
    when: row => row.status === "Не исправен",
    style: {
      backgroundColor: "#fc6060",
      color: "#fff"
    }
  },
  {
    when: row => row.status === "Списан",
    style: {
      backgroundColor: "#4a4a4a",
      color: "#fff"
    }
  }
]

const columns = [
  {
    name: "ID",
    selector: row => row.id,
  },
  {
    name: "Название",
    selector: row => row.name
  },
  {
    name: "Тип",
    selector: row => row.inventory_type
  },
  {
    name: "Инвентарный номер",
    selector: row => row.inventory_number
  },
  {
    name: "Местоположение",
    selector: row => row.position
  },
  {
    name: "Ответственный",
    selector: row => row.responsible
  },
  {
    name: "Номер телефона",
    selector: row => row.resPhone
  },
  {
    name: "Статус",
    selector: row => row.status
  }
]

const paginationComponentOptions = {
	rangeSeparatorText: 'из',
};



function Root() {

  const [queryData, setQueryData] = useState({});
  const [TableData, setTableData] = useState([]);
  
  const [SelectedRows, setSelectedRows] = useState([{
    name: "",
    inventory_type: "",
    inventory_number: "",
    position: "",
    status: ""
  }]);

  const [error, setError] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [DisableBtn, setDisableBtn] = useState(true);
  const {ShowAddUserModal, HideUserModal} = useContext(ShowAddUserModalContext);

  useEffect(()=>{
    async function getInventoryData () {
      const query = await fetch("http://localhost:8000/inventory", {
        method: "GET"
      });

      const response = await query.json();

      if (response === "Инвентарь пуст"){
        return setError(true);
      }

      return setTableData([...response]);
    }

    getInventoryData();
  },[]);

  function showAddModal() {
    return setShowAddModal(true);
  }

  function hideAddModal() {
    return setShowAddModal(false);
  }

  function showEditModal () {
    if (SelectedRows.length > 1) {
      return alert("Изменить можно только один объект за раз!");
    }

    return setShowEditModal(true);
  }
  function hideEditModal(){
    setShowEditModal(false);
  }

  async function AddObjectToTable(data){

    const query = await fetch("http://localhost:8000/inventory/add",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const response = await query.json();

    if(response === "Ошибка!"){
      return alert("Не удалось добавить объект");
    }

    return setQueryData({...response});
  }

  useEffect(()=>{
    setTableData([...TableData, queryData]);
    setShowAddModal(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  
  useEffect(()=>{
    if(SelectedRows.length === 0){
      return setDisableBtn(true);
    }
    setDisableBtn(false);

  }, [SelectedRows]);
  

  async function ChangeObjectData (data) {
    const query = await fetch(`http://localhost:8000/inventory/edit/${SelectedRows[0].id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const response = await query.json();

    console.log(response)

    if (response === "Не удалось изменить данные"){
      return alert("Не удалось изменить данные");
    }

    const newTableData = TableData.map((e) => {
      if (e.id === SelectedRows[0].id){
        return e = {...response}
      }

      return e;
    });

    setTableData(newTableData);
    setShowEditModal(false);
    return;
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
    return HideUserModal();
}
  

  return (
    <>
      <Header />
      <div className="container">
        <div className="DataTable-container">
          <div className="DataTable-top">
            <h2 className="datatable-title">Инвентарная база данных</h2>
            <div className="DataTable-actionBtns">
              <ActionButton title={"Добавить"} isDisabled={false} handle={showAddModal}/>
              <ActionButton title={"Изменить"} isDisabled={DisableBtn} handle={showEditModal}/>
            </div>
          </div>
          {
            error ? (
              <i>Инвентарь пуст</i>
            ) : (
              <DataTable
                className="DataTable"
                columns={columns}
                data={TableData}
                selectableRows
                customStyles={customStyles}
                conditionalRowStyles={conditionalRowStyle}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                onSelectedRowsChange={({selectedRows})=> setSelectedRows(selectedRows)}
              />
            )
          }
        </div>
        <AddObjectToTableModal isVisible={ShowAddModal} SubmitHandle={AddObjectToTable} cancelHandle={hideAddModal}/>
        <EditObjectModal isVisible={ShowEditModal} DataContext={{...SelectedRows[0]}} SubmitHandle={ChangeObjectData} cancelHandle={hideEditModal}/>
        <CreateNewUserModal isVisible={ShowAddUserModal} SubmitHandle={CreateUser} cancelHandle={HideUserModal}/>
      </div>
    </>
  );
}

export default Root;
