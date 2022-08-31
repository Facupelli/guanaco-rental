async function sendWsMessage(messageData) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "542647433662",
    type: "template",
    template: {
      name: "pedido_recibido",
      language: {
        code: "es",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${fullName}`,
            },
            {
              type: "text",
              text: `${orderInfo}`,
            },
          ],
        },
      ],
    },
  });


  try {
    const response = await fetch(
      `https://graph.facebook.com/v13.0/${process.env.WS_NUMBER_ID}/messages`,
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${process.env.WS_ACCESS_TOKEN}`,
          "Content-type": "application/json",
        },
      }
    );
    const whatsappRes = response.json()

    return whatsappRes;
  } catch (err) {
    console.log("whatsapp sending message error:", err);
    return { message: "error, mensaje no enviado" };
  }
}

module.exports = { sendWsMessage };
