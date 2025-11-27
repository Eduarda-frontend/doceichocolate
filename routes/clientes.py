from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3

router = APIRouter()

class cliente(BaseModel):
    nome: str
    celular: int
    cep: str
    endereco: str
    bairro: str
    complemento: str | None = None

# ROTA PARA CRIAR O CLIENTE
@router.post("/clientes")   

def criar_cliente(cliente: cliente):
    try:
        conn = sqlite3.connect("banco_de_dados.db")
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO clientes (nome, celular, cep, endereco, bairro, complemento)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            cliente.nome,
            cliente.celular,
            cliente.cep,
            cliente.endereco,
            cliente.bairro,
            cliente.complemento
        ))
        
        conn.commit()
        conn.close()
        
        return {"message": "Cliente criado com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar cliente: {str(e)}")