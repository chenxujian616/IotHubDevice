/* iot_device.js */
/* 严格模式 */
"use strict"
var mqtt = require('mqtt')
const EventEmitter = require('events')

class IotDevice extends EventEmitter{
    /**
     * @brief IotDevice对象的构造函数
     * @param serverAddress MQTT Broker地址
     * @notice 使用1883端口
     */
    constructor({ serverAddress = "127.0.0.1:1883", productName, deviceName, secret, clientID } = {}) {
        /* 调用父类构造函数 */
        super()
        this.serverAddress = `mqtt://${serverAddress}`
        this.productName = productName
        this.deviceName = deviceName
        this.secret = secret
        this.username = `${this.productName}/${this.deviceName}`
        // 根据clientID设置
        if (clientID != null) {
            this.clientID = `${this.username}/${clientID}`
        } else {
            this.clientID = this.username
        }
    }

    /**
     * 封装MQTT Client的connect方法，并提供了接口
     */
    connect() {
        this.client = mqtt.connect(this.serverAddress, {
            /**
             * Broker地址为127.0.0.1:8883，在传输层使用TSL（SSL升级版）
             * 一般情况下也可以用1883端口，但1883端口只支持MQTT协议
             * 8883端口支持MQTTS协议，需要和1883端口区分
             * EMQ X默认使用一个自签署的证书，因此需要设定rejectUnauthorized为false
             */
            rejectUnauthorized: false,
            username: this.username,
            password: this.secret,
            clientId: this.clientID,
            clean: false
        })
        var self = this
        this.client.on('connect', function () {
            /* 调用online事件监听器 */
            self.emit("online")
        })
        this.client.on('offline', function () {
            /* 调用offline事件监听器 */
            self.emit("offline")
        })
        this.client.on('error', function (err) {
            /* 调用error事件监听器 */
            self.emit("error",err)
        })
    }

    /**
     * 封装MQTT的disconnect方法
     */
    disconnect() {
        if (this.client != null) {
            this.client.end()
        }
    }
}


module.exports = IotDevice;