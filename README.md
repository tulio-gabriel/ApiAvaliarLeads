# ⚡ Enriquecedor e Validador Inteligente de Leads (Make + Node.js Serverless)

Projeto de automação híbrida que captura potenciais clientes através de Webhook, valida e pontua os dados (*Lead Scoring*) através de uma API própria em Node.js alojada na Vercel, e encaminha os resultados condicionalmente para um Data Store e Google Sheets.

## 🛠️ Tecnologias Utilizadas

* **Make (Integromat):** Orquestração de fluxos e integração no-code.
* **Node.js / Vercel:** Microsserviço serverless para lógica de validação e algoritmo de Lead Scoring.
* **Google Sheets & Data Store:** Armazenamento e perssitência dos dados qualificados.
* **PowerShell / cURL:** Testes de requisição HTTP POST.

## 📐 Arquitetura do Fluxo

![Fluxo do Make](assets/fluxo-make.png)

1. **Webhook:** Recebe os dados brutos do formulário ou aplicação.
2. **Data Store (Busca):** Verifica a existência prévia do contacto.
3. **HTTP Request:** Envia o JSON do lead para o microsserviço na Vercel.
4. **Lógica de Scoring (Node.js):** 
   * Validação de e-mail corporativo vs. genérico (+20 pts).
   * Faixa de colaboradores (+10 a +50 pts).
   * Regras adicionais de nome e empresa (+30 pts).
5. **Router & Filtros:** Avalia se `is_qualified == true` (score $\ge 50$).
6. **Data Store & Google Sheets:** Regista o lead enriquecido com a classificação final.

## 🚀 Como Replicar este Projeto

### 1. Configurar a API na Vercel
```bash
git clone [https://github.com/seu-usuario/lead-scoring-automation.git](https://github.com/seu-usuario/lead-scoring-automation.git)
cd lead-scoring-automation
npm install
vercel --prod
```

### 2. Importar o Fluxo no Make
1. No Make, crie um novo cenário.
2. Clique nos três pontos (...) no menu inferior e selecione **Import Blueprint**.
3. Escolha o ficheiro `make/blueprint.json`.
4. Atualize a URL do módulo HTTP com o endpoint da sua API na Vercel.