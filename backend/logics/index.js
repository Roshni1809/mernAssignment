var express = require('express')
var productLogic  = require ("./products")
var userLogic     = require('./Users')

module.exports={
    productLogic,
    userLogic
}