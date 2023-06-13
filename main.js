'use strict';

// Declaração do uso do modo estrito do JavaScript, que ajuda a evitar erros comuns

const openModal = () => {
    // Definição de uma função chamada "openModal" usando a sintaxe de função de seta (arrow function)
    // A função abre o modal adicionando a classe "active" ao elemento com o ID "modal"
    document.getElementById('modal').classList.add('active');
}

const closeModal = () => {
    // Definição de uma função chamada "closeModal" usando a sintaxe de função de seta (arrow function)
    // A função fecha o modal removendo a classe "active" do elemento com o ID "modal"
    clearFields()
    document.getElementById('modal').classList.remove('active')
    
}

// o create irá pegar esse array
const tempCliente = {
    nome: "Matheus",
    email: "matheusteste@gmail.com",
    celular: "115555-4444",
    cidade: "São Paulo"
}

// pega do LocalStorage
const getLocalStorage = () => json.parse(localStorage.getItem('dbcliente')) ?? []
// envia 
const setLocalStorage = (dbcliente) => localStorage.setItem("dbcliente", JSON.stringify(dbcliente))

// DELETE
const deleteCliente = (index) => {
    const dbcliente = readCliente()
    dbcliente.splice(index,1)
    setLocalStorage(dbcliente)
}

// UPDATE
const updateCliente = (index, cliente) => {
    const dbcliente = readCliente()
    dbcliente[index] = cliente
    setLocalStorage(dbcliente)

}

// READ
const readCliente = () => getLocalStorage()

// CREATE
const createClient = (cliente) => {
    const dbcliente = getLocalStorage()
    dbcliente.push(cliente)
    setLocalStorage(dbcliente)
    
}

const isValidFields = () => {
    document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}

// Interação com o Layout
const saveCliente = () => {
    if (isValidFields()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(cliente)
        clearFields()
        closeModal()
    }
}

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveCliente)