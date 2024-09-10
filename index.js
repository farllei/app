// Intro

// Let variable can have its value changed later
let mensagem = "Hello world!"

// Const variable cannot have its value changed later 
const mensagem1 = "Hello World1"

//--- Example or inner scope
// variables inside inner scopes are read first
{
    const mensage = "Olá mundo!"
    console.log(mensagem);
}

console.log(mensagem);
