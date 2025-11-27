from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
from datetime import datetime

router = APIRouter()

class ItemPedido(BaseModel):
    nome_produto: str
    valor_unitario: float
    quantidade: int
    subtotal: float

class Pedido(BaseModel):
    nome_cliente: str
    celular: str
    cep: str
    endereco: str
    bairro: str
    complemento: str | None = None
    cidade: str
    estado: str
    forma_pagamento: str
    total: float
    itens: list[ItemPedido]

# ROTA PARA CRIAR O PEDIDO
@router.post("/pedidos")
def criar_pedido(pedido: Pedido):
    try:
        conn = sqlite3.connect("banco_de_dados.db")
        cursor = conn.cursor()

        # DATA E HORA ATUAL
        data_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # INSERE O PEDIDO NA TABELA pedidos
        cursor.execute("""
            INSERT INTO pedidos 
            (nome_cliente, celular, cep, endereco, bairro, complemento, cidade, estado, forma_pagamento, total, data_hora, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            pedido.nome_cliente,
            pedido.celular,
            pedido.cep,
            pedido.endereco,
            pedido.bairro,
            pedido.complemento,
            pedido.cidade,
            pedido.estado,
            pedido.forma_pagamento,
            pedido.total,
            data_hora,
            "pendente"
        ))

        pedido_id = cursor.lastrowid  # pega o id do pedido recém salvo

        # SALVA CADA ITEM DO PEDIDO
        for item in pedido.itens:
            cursor.execute("""
                INSERT INTO itens_pedido 
                (pedido_id, nome_produto, valor_unitario, quantidade, subtotal)
                VALUES (?, ?, ?, ?, ?)
            """, (
                pedido_id,
                item.nome_produto,
                item.valor_unitario,
                item.quantidade,
                item.subtotal
            ))

        conn.commit()
        conn.close()

        return {
            "mensagem": "Pedido registrado com sucesso!",
            "pedido_id": pedido_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao registrar pedido: {str(e)}")
