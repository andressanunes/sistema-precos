const lista = document.getElementById('lista-clientes');
const form = document.getElementById('form-cliente');
let clienteEditando = null; // para controle de edição

// Listar todos os clientes
function carregarClientes() {
  fetch('http://localhost:3000/clientes')
    .then(res => res.json())
    .then(clientes => {
      lista.innerHTML = '';
      clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${cliente.cli_razaosocial} (CNPJ: ${cliente.cli_cnpj})
          <button onclick="editarCliente(${cliente.cli_id}, '${cliente.cli_cnpj}', '${cliente.cli_razaosocial}')">✏️</button>
          <button onclick="excluirCliente(${cliente.cli_id})">🗑️</button>
        `;
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar clientes:", error);
    });
}

// Cadastrar ou atualizar cliente
form.addEventListener('submit', e => {
  e.preventDefault();

  const cli_cnpj = document.getElementById('cnpj').value.trim();
  const cli_razaosocial = document.getElementById('razao').value.trim();

  const cliente = { cli_cnpj, cli_razaosocial };

  if (clienteEditando) {
    // Atualizar
    fetch(`http://localhost:3000/clientes/${clienteEditando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(res => res.json())
      .then(() => {
        clienteEditando = null;
        form.reset();
        carregarClientes();
      })
      .catch(error => {
        alert('Erro ao atualizar cliente');
        console.error(error);
      });
  } else {
    // Cadastrar
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        carregarClientes();
      })
      .catch(error => {
        alert('Erro ao cadastrar cliente');
        console.error(error);
      });
  }
});

// Excluir cliente
function excluirCliente(id) {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => carregarClientes())
      .catch(error => {
        alert('Erro ao excluir cliente');
        console.error(error);
      });
  }
}

// Preencher formulário para edição
function editarCliente(id, cnpj, razao) {
  document.getElementById('cnpj').value = cnpj;
  document.getElementById('razao').value = razao;
  clienteEditando = id;
}

const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');
let produtoEditando = null;

// Listar produtos
function carregarProdutos() {
  fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(produtos => {
      listaProdutos.innerHTML = '';
      produtos.forEach(prod => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${prod.pro_descricao} (SKU: ${prod.pro_SKU})
          <button onclick="editarProduto(${prod.pro_id}, '${prod.pro_SKU}', '${prod.pro_descricao}')">✏️</button>
          <button onclick="excluirProduto(${prod.pro_id})">🗑️</button>
        `;
        listaProdutos.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar produtos:", error);
    });
}

// Cadastrar ou atualizar produto
formProduto.addEventListener('submit', e => {
  e.preventDefault();

  const pro_SKU = document.getElementById('sku').value.trim();
  const pro_descricao = document.getElementById('descricao').value.trim();
  const produto = { pro_SKU, pro_descricao };

  if (produtoEditando) {
    fetch(`http://localhost:3000/produtos/${produtoEditando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    })
      .then(res => res.json())
      .then(() => {
        produtoEditando = null;
        formProduto.reset();
        carregarProdutos();
      })
      .catch(error => {
        alert('Erro ao atualizar produto');
        console.error(error);
      });
  } else {
    fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    })
      .then(res => res.json())
      .then(() => {
        formProduto.reset();
        carregarProdutos();
      })
      .catch(error => {
        alert('Erro ao cadastrar produto');
        console.error(error);
      });
  }
});

// Excluir produto
function excluirProduto(id) {
  if (confirm('Deseja realmente excluir este produto?')) {
    fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => carregarProdutos())
      .catch(error => {
        alert('Erro ao excluir produto');
        console.error(error);
      });
  }
}

// Preencher o formulário para edição
function editarProduto(id, sku, descricao) {
  document.getElementById('sku').value = sku;
  document.getElementById('descricao').value = descricao;
  produtoEditando = id;
}

const formCond = document.getElementById('form-condpagto');
const listaCond = document.getElementById('lista-condicoes');
let condEditando = null;

// Listar condições de pagamento
function carregarCondicoes() {
  fetch('http://localhost:3000/condpagto')
    .then(res => res.json())
    .then(condicoes => {
      listaCond.innerHTML = '';
      condicoes.forEach(cond => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${cond.cpg_descricao} - Dias: ${cond.cpg_dias}
          <button onclick="editarCondicao(${cond.cpg_id}, '${cond.cpg_descricao}', '${cond.cpg_dias}')">✏️</button>
          <button onclick="excluirCondicao(${cond.cpg_id})">🗑️</button>
        `;
        listaCond.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar condições:", error);
    });
}

// Cadastrar ou atualizar condição
formCond.addEventListener('submit', e => {
  e.preventDefault();

  const cpg_descricao = document.getElementById('descricao-cond').value.trim();
  const cpg_dias = document.getElementById('dias-cond').value.trim();
  const cond = { cpg_descricao, cpg_dias };

  if (condEditando) {
    fetch(`http://localhost:3000/condpagto/${condEditando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cond)
    })
      .then(res => res.json())
      .then(() => {
        condEditando = null;
        formCond.reset();
        carregarCondicoes();
      })
      .catch(error => {
        alert('Erro ao atualizar condição');
        console.error(error);
      });
  } else {
    fetch('http://localhost:3000/condpagto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cond)
    })
      .then(res => res.json())
      .then(() => {
        formCond.reset();
        carregarCondicoes();
      })
      .catch(error => {
        alert('Erro ao cadastrar condição');
        console.error(error);
      });
  }
});

// Excluir condição
function excluirCondicao(id) {
  if (confirm('Deseja excluir esta condição de pagamento?')) {
    fetch(`http://localhost:3000/condpagto/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => carregarCondicoes())
      .catch(error => {
        alert('Erro ao excluir condição');
        console.error(error);
      });
  }
}

// Preencher para editar
function editarCondicao(id, descricao, dias) {
  document.getElementById('descricao-cond').value = descricao;
  document.getElementById('dias-cond').value = dias;
  condEditando = id;
}

const formPreco = document.getElementById('form-preco');
const selectCliente = document.getElementById('cliente-select');
const selectProduto = document.getElementById('produto-select');
const selectCondicao = document.getElementById('condicao-select');
const listaPrecos = document.getElementById('lista-precos');

// Carregar opções nos selects
function carregarSelects() {
  fetch('http://localhost:3000/clientes')
    .then(res => res.json())
    .then(clientes => {
      selectCliente.innerHTML = '<option value="">Cliente</option>';
      clientes.forEach(c => {
        selectCliente.innerHTML += `<option value="${c.cli_id}">${c.cli_razaosocial}</option>`;
      });
    });

  fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(produtos => {
      selectProduto.innerHTML = '<option value="">Produto</option>';
      produtos.forEach(p => {
        selectProduto.innerHTML += `<option value="${p.pro_id}">${p.pro_descricao}</option>`;
      });
    });

  fetch('http://localhost:3000/condpagto')
    .then(res => res.json())
    .then(condicoes => {
      selectCondicao.innerHTML = '<option value="">Condição</option>';
      condicoes.forEach(cp => {
        selectCondicao.innerHTML += `<option value="${cp.cpg_id}">${cp.cpg_descricao}</option>`;
      });
    });
}

// Listar preços cadastrados
function carregarPrecos() {
  fetch('http://localhost:3000/precos')
    .then(res => res.json())
    .then(precos => {
      listaPrecos.innerHTML = '';
      precos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.cli_razaosocial} - ${p.pro_descricao} - ${p.cpg_descricao} = R$ ${p.preco} (início: ${p.data_inicio})`;
        listaPrecos.appendChild(li);
      });
    });
}

// Enviar novo preço
formPreco.addEventListener('submit', e => {
  e.preventDefault();

  const cli_id = selectCliente.value;
  const pro_id = selectProduto.value;
  const cpg_id = selectCondicao.value;
  const preco = parseFloat(document.getElementById('preco').value);
  const data_inicio = document.getElementById('data-inicio').value;

  fetch('http://localhost:3000/precos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cli_id, pro_id, cpg_id, preco, data_inicio })
  })
    .then(res => res.json())
    .then(() => {
      formPreco.reset();
      carregarPrecos();
    })
    .catch(error => {
      alert('Erro ao cadastrar preço');
      console.error(error);
    });
});


carregarClientes();
carregarProdutos();
carregarCondicoes();
carregarSelects();  
carregarPrecos(); 

