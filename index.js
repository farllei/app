// Declaração dos imports do inquirer

const { select, input, checkbox } = require("@inquirer/prompts");



// Array de metas
let metas

const carregarMetas = async () => {
  try {
      const dados = await fs.readFile("metas.json", "utf-8")
      metas = JSON.parse(dados)
  }
  catch (erro) {
      metas = []
  }
}

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


// função cadastrarNovaMeta
const cadastrarNovaMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    console.log("A meta não pode estar vazia.");
    console.log("");
    return;
  }

  metas.push({ value: meta, checked: false });
  console.log("Meta cadastrada com sucesso!");
  console.log("");
};

// função listar metas
const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas!";
    console.log("");
    return;
  }

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
    mensagem = "Nenhuma meta selecionada!";
    console.log("");
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
  if (metas.length == 0) {
    mensagem = "Não existem matas!";
    console.log("");
    return;
  }

  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas! :(";
    console.log("");
    return;
  }

  await select({
    message: "Metas realizadas: " + realizadas.length,
    choices: [...realizadas],
  });
};

// função metas abertas
const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas!";
    console.log("");
    return;
  }
  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas! :(";
    console.log("");
    return;
  }

  await select({
    message: "Metas abertas: " + abertas.length,
    choices: [...abertas],
  });
};

// função deletar meta(s)

const deletarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas!";
    console.log("");
    return;
  }

  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });

  const itensADeletar = await checkbox({
    message: "selecione meta(s) para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itensADeletar.length == 0) {
    console.log("Nenhuma meta para deletar!");
    console.log("");
    return;
  }

  itensADeletar.forEach((item) => {
    metas.filter((meta) => {
      return meta.value != item;
    });
  });

  console.log("Meta(s) deletada(s) com sucesso!");
};


//__________________________________________________________________

// Menu de início

const start = async () => {
  
  while (true) {

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar nova meta",
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
          name: "Deletar meta(s)",
          value: "deletar",
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
      case "deletar":
        await deletarMetas();
        break;
      case "sair":
        console.log("Até a próxima!");
        return;
    }
  }
};

start();
