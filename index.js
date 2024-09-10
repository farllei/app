// Intro

// Let variable can have its value changed later
let mensagem = "Hello world!"

// Const variable cannot have its value changed later 
const mensagem1 = "Hello World1"

//--- Example or inner scope
// variables inside inner scopes are read first
{
    const mensagem = "Olá mundo!"
    console.log(mensagem);
}

console.log(mensagem);

// arrays, objects

const number = [1,2,3,4,5]
let meta = {
    value: "Ler um livro por mês",
    address: "2, Palm street",
    checked: false,
    log: (info)=> {
        console.log(info);
    }
}
meta.value = "Não é mais ler um livro";
meta.log(meta.value);

// function // arrow function
const criarMeta = () => {}

// named function
//function criarMeta(){}
