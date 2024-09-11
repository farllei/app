// Declaração dos imports do inquirer

const { select, input, checkbox } = require("@inquirer/prompts");

// Modelo de meta
let meta = {
  value: "Beber 3L de água por dia",
  checked: false,
};

// Array de metas

let metas = [meta];

// função cadastrarNovaMeta
const cadastrarNovaMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    console.log("A meta não pode estar vazia.");
    console.log("");
    return;
  }

  metas.push({ value: meta, checked: false });
};

// função listar metas
const listarMetas = async () => {
  // Values from array metas [...]
  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar esta etapa.",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    console.log("Nenhum meta selecionada!");
    return;
  }

  // Searching for equal answers
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true;
  });

  console.log("Meta(s) marcadas como concluída(s)");
};

// função metas realizadas

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });
  if (realizadas.length == 0) {
    console.log("Não existem metas realizadas! :(");
    return;
  }

  await select({
    message: "Metas realizadas: " + realizadas.length,
    choices: [...realizadas],
  });
};

// funcao metas abertas
const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length == 0) {
    console.log("Não existem metas abertas! :(");
    return;
  }

  await select({
    message: "Metas abertas: " + abertas.length,
    choices: [...abertas],
  });
};

// Menu de início

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    // Switch com as opções

    switch (opcao) {
      case "cadastrar":
        await cadastrarNovaMeta();
        console.log(metas);
        break;
      case "listar":
        await listarMetas();
        break;
      case "sair":
        await metasRealizadas();
        break;
      case "abertas":
        await metasAbertas();
        break;
      case "sair":
        console.log("Até a próxima!");
        return;
    }
  }
};

start();
