/* test_mqtt.js */
var jwt = require('jsonwebtoken')
var password = jwt.sign({
    /**
     * ����emqxsecret��ǩ��һ��JWT����
     * payloadҪ������Brokerʱʹ�õ��û���һ�²���ͨ����֤
     */
    username: "jwt_user",
    // JWT������ЧֵΪ10��
    exp:Math.floor(Date.now()/1000)+10
},"emqxsecret")

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1:1883', {
    username: "jwt_user",
    password:password
})
client.on('connect', function (connack) {
    console.log(`return code: ${connack.returnCode}`)
    // client.end()
    client.subscribe("$SYS/brokers/+/clients/+/+/connected", function () {
        
    })
    client.subscribe("$SYS/brokers/+/clients/+/+/disconnected", function (err) {
        
    })
    // client.subscribe("$SYS/brokers/+/version")
})

client.on('message', function (_, message, _) {
    console.log(message.toString())
})