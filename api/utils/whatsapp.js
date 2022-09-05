const fetch = require("node-fetch");

async function sendWsMessage(msgData) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: `54${msgData.phone}`,
    type: "template",
    template: {
      name: "guanaco_order",
      language: {
        code: "es_AR",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${msgData.fullName}`,
            },
            {
              type: "text",
              text: `${msgData.pickupDay}`,
            },
            {
              type: "text",
              text: `${msgData.pickupHour}`,
            },
            {
              type: "text",
              text: `${msgData.returnDay}`,
            },
            {
              type: "text",
              text: `${msgData.equipmentList}`,
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
    const whatsappRes = response.json();

    return whatsappRes;
  } catch (err) {
    console.log("whatsapp sending message error:", err);
    return { message: "error, mensaje no enviado" };
  }
}

module.exports = { sendWsMessage };
