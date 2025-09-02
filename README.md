# 🍫 **Doce & Chocolate** - Cardápio Online 🍰 
### (Projeto em desenvolvimento)

## 📜 Descrição

O projeto **Doce & Chocolate** é uma aplicação web que exibe o cardápio de uma confeitaria, permitindo aos clientes visualizar produtos, realizar pedidos diretamente pela interface e finalizar a compra de maneira simples. O sistema também oferece funcionalidades como busca de endereço pelo CEP e envio do pedido via WhatsApp 📱.

A aplicação é construída utilizando React e integrações com o **Tailwind** para o layout e componentes responsivos.

![Página inicial](./src/assets/printPaginaInicial.png)

### Protótipo no Figma
[Acesse o protótipo](https://www.figma.com/design/nvMOS2rFI1Rw4oxQfUe0rC/e-Commerce?node-id=0-1&p=f&t=lNTr89jSK3KQORkK-0)

## ⚙️ Funcionalidades

- **Exibição de Produtos**: Os produtos são apresentados com imagens, descrições e preços, permitindo aos usuários escolher itens do cardápio.
- **Carrinho de Compras 🛒**: Os itens adicionados são listados no carrinho e o usuário pode visualizar seu pedido antes de finalizar.
- **Busca de Endereço via CEP 📍**: O endereço do usuário pode ser preenchido automaticamente a partir do CEP fornecido, utilizando a API do **ViaCEP**.
- **Formulário de Pedido 📝**: O usuário preenche seus dados (nome, telefone, endereço) e escolhe a forma de pagamento 💳 antes de finalizar o pedido.
- **Envio de Pedido via WhatsApp 📲**: O pedido é gerado em formato de mensagem e enviado automaticamente para o WhatsApp do estabelecimento, com todos os dados preenchidos.

- # 🚀 Como Funciona

### 1. 🍰 **Visualização dos Produtos**
- Os produtos são exibidos nas categorias "Bentô Cake", "Bolos Decorados" e "Brigadeiro".
- Cada produto tem uma imagem, título, descrição e preço.
- O usuário pode adicionar os itens ao carrinho clicando no botão "Adicionar ao carrinho".

### 2. 🛒 **Carrinho de Compras**
- Após adicionar um item ao carrinho, o botão "Finalizar Pedido" aparece na seção do carrinho.
- O usuário pode visualizar os itens selecionados e clicar para finalizar o pedido.

### 3.📍 **Busca de Endereço**

- O usuário pode inserir o **CEP** no campo apropriado, e o sistema preencherá automaticamente os campos de **endereço**, **bairro**, **cidade** e **estado** utilizando a API do ViaCEP.
- O preenchimento é feito automaticamente ao clicar no botão de "Buscar CEP".

### 4. 📝 **Formulário de Pedido**
- O formulário solicita o **nome**, **telefone**, **celular**, **endereço**, **bairro**, **complemento** e **forma de pagamento**.
- O usuário pode escolher entre **dinheiro** ou **parcelamento**.
- O botão de "Finalizar Pedido" gera uma mensagem com os dados do pedido e redireciona o usuário para o WhatsApp do estabelecimento.

### 5. 📲 **Envio via WhatsApp**
- Ao clicar no botão "Finalizar Pedido", o pedido é enviado para o WhatsApp com todos os dados preenchidos automaticamente.
- A URL do WhatsApp é gerada dinamicamente com os dados codificados.

### 6. 📝 **Cadastro de novos produtos**
- Validação dos dados do novo produto
- Integração com o backend

### 7. 🛠 Testar Funcionalidade
- **CEP**: Teste a busca automática do endereço ao inserir um CEP válido.
- **Carrinho**: Adicione itens ao carrinho e finalize o pedido.
- **WhatsApp**: Verifique se a URL do WhatsApp está sendo gerada corretamente ao finalizar o pedido.
