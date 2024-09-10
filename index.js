// Intro

// Let variable can have its value changed later
// let mensagem = "Hello world!"

// Const variable cannot have its value changed later 
// const mensagem1 = "Hello World1"

//--- Example or inner scope
// variables inside inner scopes are read first
//{
//    const mensagem = "Olá mundo!"
//    console.log(mensagem);
//}

// console.log(mensagem);

// arrays, objects

// const number = [1,2,3,4,5]

// function // arrow function
// const criarMeta = () => {}

// named function
//function criarMeta(){}

let meta = {
    value: "Ler um livro por mês",
    checked: true,
}

let metas = [
    meta,
    {
        value: "Caminhar 20 min todos os dias",
        checked: false 
    }
]

console.log(metas[1].value);