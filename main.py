import sqlite3
from fastapi import FastAPI
from routes.pedidos import router as pedidos_router
from routes.itens_pedidos import router as itens_router
from routes.produtos import router as produtos_router
from routes.clientes import router as clientes_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# registra as rotas no app principal
app.include_router(pedidos_router)
app.include_router(itens_router)
app.include_router(produtos_router)
app.include_router(clientes_router)


# rota inicial obrigatoriamente precisa ter uma função
@app.get("/")
def home():
    return {"mensagem": "API está funcionando corretamente"}

# Configuração do CORS

origins = [
    "http://localhost:5173",   # FRONT rodando no Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Quem pode acessar
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE...
    allow_headers=["*"],        # Libera todos os headers
)
