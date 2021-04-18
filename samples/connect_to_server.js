const IotDevice = require("../sdk/iot_device")
require('dotenv').config()

/* 创建device实例 */
/**
 * 问题：通过Server创建的username和password不能用
 * 手动创建的username和password可以使用
 */
var device = new IotDevice({
    productName: process.env.PRODUCT_NAME,
    deviceName: process.env.DEVICE_NAME,
    secret: process.env.SECRET
})
/**
 * device监听到online事件执行function，下同理
 */
device.on("online", function () {
    /* 1883端口监听到online事件，但8883端口没有监听到 */
    console.log("device is online")
    device.disconnect()
})
device.on("offline", function () {
    console.log("device is offline")
})
device.connect()