import sqlite3

banco = sqlite3.connect('banco_de_dados.db')
cursor = banco.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome text, celular text, Cep text, endereco text, bairro text, complemento text)")
cursor.execute("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome text , preco integer, descricao text, imagem text, categoria text, ativo integer)")
cursor.execute("CREATE TABLE IF NOT EXISTS pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_cliente text, celular text, cep text, endereco text, bairro text, complemento text, cidade text, estado text, forma_pagamento text, total real, data_hora text, status text)")
cursor.execute("CREATE TABLE IF NOT EXISTS itens_pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, pedido_id integer, nome_produto text, valor_unitario real, quantidade integer, subtotal real, FOREIGN KEY (pedido_id) REFERENCES pedidos(id))")


banco.commit()
banco.close()

#Sempre colocar o banco.commit antes de fechar a conexão