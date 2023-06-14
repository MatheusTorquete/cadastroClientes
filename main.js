'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');
// Função para abrir o modal, parte do CREATE

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
};
// Função para fechar o modal, parte do CREATE

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
// Função para obter os dados do LocalStorage, parte do READ

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));
// Função para definir os dados no LocalStorage, parte do CREATE e UPDATE

const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
};
// Função para excluir um cliente da lista, parte do DELETE

const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
};
// Função para atualizar um cliente na lista, parte do UPDATE

const readClient = () => getLocalStorage();
// Função para ler os dados dos clientes, parte do READ

const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push (client);
    setLocalStorage(dbClient);
};
// Função para adicionar um novo cliente à lista, parte do CREATE

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
};
// Função para verificar se os campos do formulário são válidos, parte do CREATE

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
    document.getElementById('nome').dataset.index = 'new';
    document.querySelector(".modal-header>h2").textContent = 'Novo Cliente';
};
// Função para limpar os campos do formulário, parte do CREATE e UPDATE

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        };
        const index = document.getElementById('nome').dataset.index;
        if (index == 'new') {
            createClient(client);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
};
// Função para salvar um cliente, adicionando-o ou atualizando-o na lista, parte do CREATE e UPDATE

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableClient>tbody').appendChild(newRow);
};
// Função para criar uma nova linha na tabela com os dados do cliente, parte do READ

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
};
// Função para limpar a tabela, parte do READ

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
};
// Função para atualizar a tabela com os dados dos clientes, parte do READ

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
};
// Função para preencher os campos do formulário com os dados de um cliente, parte do UPDATE

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    document.querySelector(".modal-header>h2").textContent = `Editando ${client.nome}`;
    openModal();
};
// Função para editar um cliente, preenchendo o formulário com seus dados, parte do UPDATE

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');
        if (action == 'edit') {
            editClient(index);
        } else {
            const client = readClient()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`);
            if (response) {
                deleteClient(index);
                updateTable();
            }
        }
    }
};
// Função para tratar os eventos de edição e exclusão de um cliente, parte do UPDATE e DELETE

updateTable();
// Atualiza a tabela ao carregar a página, parte do READ

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
// Evento para abrir o modal ao clicar no botão de cadastrar cliente, parte do CREATE

document.getElementById('modalClose').addEventListener('click', closeModal);
// Evento para fechar o modal ao clicar no botão de fechar, parte do CREATE

document.getElementById('salvar').addEventListener('click', saveClient);
// Evento para salvar o cliente ao clicar no botão de salvar, parte do CREATE e UPDATE

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);
// Evento para tratar a edição e exclusão de um cliente ao clicar nos botões correspondentes, parte do UPDATE e DELETE

document.getElementById('cancelar').addEventListener('click', closeModal);
// Evento para fechar o modal ao clicar no botão de cancelar, parte do CREATE e UPDATE
