const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res) {
  res.render('register', {
    title: defaultTitle
  })
}


async function add(req, res) {
  //dados que estão vindo do form
  const {
    name,
    age,
    email,
    password,
  } = req.body

  const passwordCrypto = await crypto(password)

  const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto,
  })

  register.save()
  res.render('register', {
    title: defaultTitle,
    message: 'Cadastro realizado com sucesso!'
  })
}

async function listUsers(req, res) {
  //metodo do mongoose para procurar usuarios "find"
  const users = await CustomersModel.find()

  res.render('listUsers', {
    title: "Listagem de Usuários",
    users
  })
}

module.exports = {
  index,
  add,
  listUsers,
}