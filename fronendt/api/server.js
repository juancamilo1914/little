const webpush = require( 'web-push' );
const express = require('express')
const cors  = require('cors')
const  bodyParser=require("body-parser");

const app = express();

//settings VAPID


const vapidkeys = {
    "PublicKey": "BFO8rwxL5YC1Ny3Ep7uG2kF13Xn1yAU144ez10JGMnOL7EpJw07E84LwkE_JXSK3zz9UAHaOD2CKrlu_jso-Q9w",
    "PrivateKey": "GK_l2vSItzR8Zjq2Rbq0l3Ybp2V6h5qWnsQ-j2TklLY"
}

webpush.setVapidDetails(
    'mailto:example@yourwebsite.com',
    vapidkeys.PublicKey,
    vapidkeys.PrivateKey
);

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())

// app.use(cors())


const enviarNotificacion = (req, res) => {
    const pushSubscription = {
        endpoint: "https://fcm.googleapis.com/fcm/send/fXbfvtiapNs:APA91bGufp-MC7D1_DM-StIX0bA_iUR_Lb_7UA90lfINoncGeNnhEfqaZUbyH3CGw09N5nHbLFAZztBmi3z4BwloSH_AfeArllzD9Xn7Yq00QCgMmiCwiUt0-fKONkZCw8-ZpFFSY_sG",
        keys: {
            auth:  "VVMH3aqFaXvdDpbsU9sSMA",
            p256dh: "BOv-eDQmPBrmHtbc8XXtdaJXXl8zojTooTvWHJCsnY7EOI-vBsuwUG3gd6815NjRS1m22ZyWtgjlGpA9UqtSDhk"
        }
    };

    const Payload = {
        "notification": {
            "title": "😊😊hola",
            "body": `¡Haz recibido un mensaje!`,
            "icon": "/assets/Icon-192.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primarykey": "0"
            },
            "actions": [{
                    "action": "explore",
                    "title": "Go to site"
            }],
        }
    }

    webpush.sendNotification(
        pushSubscription,
         JSON.stringify(Payload))
         .then(res => {
            console.log("enviado");
         }).catch(err => {
            console.log("error", err);
         })
        



}


app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
})