from fastapi import APIRouter
from database import cursor
import sqlite3

router = APIRouter()

def montar_pedidos():
    banco = sqlite3.connect('banco_de_dados.db')
    cursor = banco.cursor()
    cursor.execute("""
        SELECT 
            p.id, 
            p.nome_cliente, 
            p.celular, 
            p.endereco, 
            p.total, 
            p.forma_pagamento, 
            p.data_hora,
            i.nome_produto, 
            i.quantidade, 
            i.valor_unitario
        FROM pedidos p
        LEFT JOIN itens_pedido i ON p.id = i.pedido_id
        ORDER BY p.id
    """)
    
    resultados = cursor.fetchall()
    pedidos_dict = {}

    for row in resultados:
        pedido_id = row[0]

        if pedido_id not in pedidos_dict:
            pedidos_dict[pedido_id] = {
                "id": row[0],
                "cliente": row[1],
                "celular": row[2],
                "endereco": row[3],
                "total": row[4],
                "forma_pagamento": row[5],
                "data": row[6],
                "itens": []
            }

        if row[7] is not None:
            pedidos_dict[pedido_id]["itens"].append({
                "produto": row[7],
                "quantidade": row[8],
                "preco": row[9]
            })

    return list(pedidos_dict.values())


@router.get("/itens-pedidos")
def listar_itens_pedidos():
    return {"pedidos": montar_pedidos()}
