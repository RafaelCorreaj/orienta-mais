import urllib.request, json

# Teste de cadastro com dados completos (como o formulário envia)
data = json.dumps({
    "nome": "Teste Formulario",
    "email": "form@teste.com",
    "senha": "123456",
    "telefone": "(11) 99999-9999",
    "dataNascimento": "2000-01-01"
}).encode()

req = urllib.request.Request("http://localhost:3001/api/auth/register", data=data, headers={"Content-Type": "application/json"}, method="POST")
try:
    resp = urllib.request.urlopen(req)
    print("REGISTER OK:", resp.read().decode())
except Exception as e:
    print("REGISTER ERROR:", e)
    if hasattr(e, 'read'):
        print("DETALHE:", e.read().decode())