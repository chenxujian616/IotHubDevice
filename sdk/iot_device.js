/* iot_device.js */
/* �ϸ�ģʽ */
"use strict"
var mqtt = require('mqtt')
const EventEmitter = require('events')

class IotDevice extends EventEmitter{
    /**
     * @brief IotDevice����Ĺ��캯��
     * @param serverAddress MQTT Broker��ַ
     * @notice ʹ��1883�˿�
     */
    constructor({ serverAddress = "127.0.0.1:1883", productName, deviceName, secret, clientID } = {}) {
        /* ���ø��๹�캯�� */
        super()
        this.serverAddress = `mqtt://${serverAddress}`
        this.productName = productName
        this.deviceName = deviceName
        this.secret = secret
        this.username = `${this.productName}/${this.deviceName}`
        // ����clientID����
        if (clientID != null) {
            this.clientID = `${this.username}/${clientID}`
        } else {
            this.clientID = this.username
        }
    }

    /**
     * ��װMQTT Client��connect���������ṩ�˽ӿ�
     */
    connect() {
        this.client = mqtt.connect(this.serverAddress, {
            /**
             * Broker��ַΪ127.0.0.1:8883���ڴ����ʹ��TSL��SSL�����棩
             * һ�������Ҳ������1883�˿ڣ���1883�˿�ֻ֧��MQTTЭ��
             * 8883�˿�֧��MQTTSЭ�飬��Ҫ��1883�˿�����
             * EMQ XĬ��ʹ��һ����ǩ���֤�飬�����Ҫ�趨rejectUnauthorizedΪfalse
             */
            rejectUnauthorized: false,
            username: this.username,
            password: this.secret,
            clientId: this.clientID,
            clean: false
        })
        var self = this
        this.client.on('connect', function () {
            /* ����online�¼������� */
            self.emit("online")
        })
        this.client.on('offline', function () {
            /* ����offline�¼������� */
            self.emit("offline")
        })
        this.client.on('error', function (err) {
            /* ����error�¼������� */
            self.emit("error",err)
        })
    }

    /**
     * ��װMQTT��disconnect����
     */
    disconnect() {
        if (this.client != null) {
            this.client.end()
        }
    }
}


module.exports = IotDevice;