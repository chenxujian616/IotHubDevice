const IotDevice = require("../sdk/iot_device")
require('dotenv').config()

/* ����deviceʵ�� */
/**
 * ���⣺ͨ��Server������username��password������
 * �ֶ�������username��password����ʹ��
 */
var device = new IotDevice({
    productName: process.env.PRODUCT_NAME,
    deviceName: process.env.DEVICE_NAME,
    secret: process.env.SECRET
})
/**
 * device������online�¼�ִ��function����ͬ��
 */
device.on("online", function () {
    /* 1883�˿ڼ�����online�¼�����8883�˿�û�м����� */
    console.log("device is online")
    device.disconnect()
})
device.on("offline", function () {
    console.log("device is offline")
})
device.connect()