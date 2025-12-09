Todo List – Projeto Completo (Front-End + Back-End)

Este é o projeto completo da aplicação Todo List, integrando um front-end em HTML/CSS/JavaScript com um servidor FastAPI responsável pela autenticação e gerenciamento de tarefas.

---

## Pré-requisitos
- Python 3.8 ou superior  
- Navegador web  
- (Opcional) Git para versionamento  

---

## Como Rodar a Aplicação

### 1. Executando o Back-End (FastAPI)

#### Criar ambiente virtual
```
python -m venv venv
```

#### Ativar ambiente
Windows:
```
venv\Scripts\activate
```
Linux/macOS:
```
source venv/bin/activate
```

#### Instalar dependências
```
pip install --upgrade pip
pip install -r requirements.txt
```

#### Rodar o servidor
```
uvicorn main:app --reload
```

Servidor ativo em: **http://127.0.0.1:8000**

---

## Executando o Front-End

Basta abrir:

- index.html  
- register.html  
- tasks.html  

---

## Documentação da API

- Swagger UI: http://127.0.0.1:8000/docs  
- ReDoc: http://127.0.0.1:8000/redoc  

---

## Estrutura do Projeto

```
frontend/
 ├── index.html
 ├── register.html
 ├── tasks.html
 ├── style.css
 └── scripts.js

backend/
 ├── main.py
 ├── entities/
 ├── schemas/
 ├── usecases/
 ├── security.py
 └── database/
```

---

## Funcionamento Geral

O sistema utiliza JWT para autenticação.  
O usuário se registra, faz login, recebe um token e pode criar, editar e excluir tarefas.
