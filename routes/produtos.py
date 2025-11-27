import sqlite3
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
router = APIRouter()

class Produto(BaseModel):
    nome: str
    preco: int
    descricao: str
    imagem: str
    categoria: str
    ativo: int

@router.post("/produtos")
def criar_produto(produto: Produto):
    try:
        conn = sqlite3.connect("banco_de_dados.db")
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO produtos (nome, preco, descricao, imagem, categoria, ativo)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            produto.nome,
            produto.preco,
            produto.descricao,
            produto.imagem,
            produto.categoria,
            produto.ativo
    
        ))
        
        conn.commit()
        conn.close()
        
        return {"message": "Produto criado com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar produto: {str(e)}")