const Inventory = require("../database/Inventory");

async function AddObjectToInventory (req, res) {
    if(!req.body) return req.status(400).json("Нет данных");

    const { name, inventory_type, inventory_number, position, status } = req.body;

    const newObject = await Inventory.create({
        name: name,
        inventory_type: inventory_type,
        inventory_number: inventory_number,
        position: position,
        status: status
    }).catch(()=> {
        return res.status(500).json("Ошибка!");
    })

    return res.status(201).json(newObject);


}

async function EditInventoryObject (req, res)  {
    if (!req.body) return res.status(400).json("Нет данных");

    const invObject = await Inventory.findByPk(req.params.id);
    const { name, inventory_type, inventory_number, position, status } = req.body;

    if(!invObject) return res.status(404).json("Объект не найден");

    invObject.name = name || invObject.name;
    invObject.inventory_type = inventory_type || invObject.inventory_type;
    invObject.inventory_number = inventory_number || invObject.inventory_number;
    invObject.position = position || invObject.position;
    invObject.status = status || invObject.status;

    await invObject.save().catch(()=>{
        return res.status(500).json("Не удалось изменить данные");
    });

    return res.status(200).json(invObject);
}

async function GetObjectsFromInventory (req, res) {
    const invObjects = await Inventory.findAll();
    
    if (invObjects.length == 0) return res.status(404).json("Инвентарь пуст");

    return res.status(200).json(invObjects);
}

async function DeleteObjectFromInventory (req, res) {

    const invObject = await Inventory.findByPk(req.params.id);

    if(!invObject) return res.status(404).json("Объект не найден");

    const isDeleted = await invObject.destroy();

    if (!isDeleted) return res.status(500).json("Не удалось удалить объект");

    return res.status(200).json("Объект удален");
}

module.exports = {
    AddObjectToInventory,
    EditInventoryObject,
    GetObjectsFromInventory,
    DeleteObjectFromInventory
}