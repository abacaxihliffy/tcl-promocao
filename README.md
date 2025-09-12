# TCL Promoção SC (pronto para rodar)

## Como abrir o site agora (passo a passo)
1) Instale o **Node.js** (https://nodejs.org)
2) Baixe este arquivo ZIP e extraia em uma pasta.
3) Abra a pasta no **VS Code** (ou outro editor).
4) No terminal, rode:
   ```bash
   npm install
   npm run dev
   ```
5) Abra o link que aparecer (ex.: http://localhost:5173).

## Imagens
Coloque suas imagens **.webp** nas pastas:
- `public/assets/TCL 75/IMG1.webp ... IMG10.webp`
- `public/assets/TCL 50/IMG.webp ... IMG9.webp`
- `public/assets/TCL 43/IMG.webp ... IMG10.webp`
- `public/assets/TCL 32/IMG.webp ... IMG8.webp`

## Pagamento (Mercado Pago)
Este projeto é o **frontend**. Para pagamento real, crie um backend com uma rota
`/api/mercadopago/create_preference` e redirecione para o checkout.
Posso te enviar um backend Express pronto, se quiser.