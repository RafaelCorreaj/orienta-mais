import urllib.request, json

# Teste de login com senha correta do seed
data = json.dumps({"email": "aluno@teste.com", "senha": "aluno123"}).encode()
req = urllib.request.Request("http://localhost:3001/api/auth/login", data=data, headers={"Content-Type": "application/json"}, method="POST")
try:
    resp = urllib.request.urlopen(req)
    print("LOGIN OK:", resp.read().decode())
except Exception as e:
    print("LOGIN ERROR:", e)

# Teste de cadastro
data2 = json.dumps({"nome": "Novo Aluno", "email": "novo@teste.com", "senha": "senha123"}).encode()
req2 = urllib.request.Request("http://localhost:3001/api/auth/register", data=data2, headers={"Content-Type": "application/json"}, method="POST")
try:
    resp2 = urllib.request.urlopen(req2)
    print("REGISTER OK:", resp2.read().decode())
except Exception as e:
    print("REGISTER ERROR:", e)