// Created by pratama_20012
// Contact: adepratama200719@gmail.com

const { decryptMedia, create, vf } = require('@open-wa/wa-automate')
const { color, options } = require('./function')
const left = require('./lib/left')
const welcome = require('./lib/welcome')
const figlet = require('figlet')
const fs = require('fs-extra')
const ms = require('parse-ms')
const HandleMsg = require('./HandleMsg')
const StickerMetadata = { author: 'made with luv', pack: '@thoriqazzikraa', keepScale: true }
const errorpicture = 'https://i.ibb.co/fxY3Hbp/Whats-App-Image-2021-11-24-at-15-39-01.jpg'
const uaOverride = process.env.UserAgent
const botnum = '083829637635@c.us'

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const start = async (urbae = new urbae()) => {
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color(figlet.textSync('Urbaeexyz Bot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color('[CREATOR]', 'aqua'), color('pratama_20012', 'magenta')) // Ganti nama di sini
    console.log(color('[BOT]', 'aqua'), color('URBAE BOT is now Online!', 'magenta'))
    console.log(color('[VER]', 'aqua'), color('2.12.0', 'magenta'))
    
    urbae.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') urbae.forceRefocus()
        if (state === 'UNPAIRED') urbae.forceRefocus()
    })

    urbae.onAnyMessage(async (message) => { // By: pratama_20012 // Ganti nama di sini
        const welcome = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
        const isWelcome = welcome.includes(message.from)
        const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
        const isLeft = left.includes(message.from)
        if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'description') {
            await urbae.sendTextWithMentions(message.from, `Deskripsi grup telah diubah oleh admin @${message.sender.id.split('@')[0]}\nDeskripsi baru:\n${message.body}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'subject') {
            await urbae.sendTextWithMentions(message.from, `Nama grup telah diubah oleh admin @${message.sender.id.split('@')[0]} menjadi *${message.body}*`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'picture') {
            if (message.body == 'remove') return await urbae.sendTextWithMentions(message.from, `Profil grup telah dihapus oleh admin grup @${message.sender.id.split('@')[0]}`)
            if (message.body == 'set') return await urbae.sendTextWithMentions(message.from, `Profil grup telah diubah oleh admin grup @${message.sender.id.split('@')[0]}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'promote') {
            await urbae.sendTextWithMentions(message.from, `Terdeteksi jabatan @${message.recipients[0].split('@')[0]} telah dinaikan menjadi admin oleh @${message.sender.id.split('@')[0]}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'demote') {
            await urbae.sendTextWithMentions(message.from, `Terdeteksi jabatan @${message.recipients[0].split('@')[0]} menjadi member oleh @${message.sender.id.split('@')[0]}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'revoke_invite') {
            await urbae.sendTextWithMentions(message.from, `Link Grup telah direset oleh admin @${message.sender.id.split('@')[0]}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'add' && !botnum.includes(message.recipients) && isWelcome) {
            const mediaData = await urbae.getProfilePicFromServer(message.recipients)
            if (mediaData == null || mediaData == undefined || mediaData == 'ERROR: 404' || mediaData == 'ERROR: 401') {
                var picture = errorpicture
            } else {
                var picture = mediaData
            }
            await urbae.sendFileFromUrl(message.from, picture, '', `Halo @${message.recipients[0].split('@')[0]}\nSelamat datang di Grup *${message.chat.formattedTitle}*\nAnda telah dimasukkan oleh @${message.sender.id.split('@')[0]}\n\nDeskripsi Grup: {\n\n${message.chat.groupMetadata.desc}\n\n}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'remove' && !botnum.includes(message.recipients) && isLeft) {
            const mediaData = await urbae.getProfilePicFromServer(message.recipients)
            if (mediaData == null || mediaData == undefined || mediaData == 'ERROR: 404' || mediaData == 'ERROR: 401') {
                var picture = errorpicture
            } else {
                var picture = mediaData
            }
            await urbae.sendFileFromUrl(message.from, picture, '', `Selamat tinggal @${message.recipients[0].split('@')[0]}\nAnda telah dikick oleh @${message.sender.id.split('@')[0]}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'invite' && !botnum.includes(message.recipients) && isWelcome) {
            const mediaData = await urbae.getProfilePicFromServer(message.recipients)
            if (mediaData == null || mediaData == undefined || mediaData == 'ERROR: 404' || mediaData == 'ERROR: 401') {
                var picture = errorpicture
            } else {
                var picture = mediaData
            }
            await urbae.sendFileFromUrl(message.from, picture, '', `Halo @${message.recipients[0].split('@')[0]}\nSelamat datang di grup *${message.chat.formattedTitle}*\n\nDeskripsi Grup: {\n\n${message.chat.groupMetadata.desc}\n\n}`)
        } else if (message.isGroupMsg == true && message.isNotification == true && message.subtype == 'leave' && !botnum.includes(message.recipients) && isLeft) {
            const mediaData = await urbae.getProfilePicFromServer(message.recipients)
            if (mediaData == null || mediaData == undefined || mediaData == 'ERROR: 404' || mediaData == 'ERROR: 401') {
                var picture = errorpicture
            } else {
                var picture = mediaData
            }
            await urbae.sendFileFromUrl(message.from, picture, '', `Selamat tinggal @${message.recipients[0].split('@')[0]} we'll miss you`)
        }
    })

    urbae.onMessageDeleted(async (message) => { // By: pratama_20012 // Ganti nama di sini
        const antidel = JSON.parse(fs.readFileSync('./lib/database/antidelete.json'))
        const isDelete = antidel.includes(message.from)
        if (message.self == 'in' && message.type == 'chat' && isDelete) {
            await urbae.sendTextWithMentions(message.from, `Terdeteksi @${message.author.split('@')[0]} menghapus pesan bertipe ${message.type}\nPesan: ${message.body}`)
        } else if (message.self == 'in' && isDelete && message.type == 'image' || message.type == 'video') {
            const mediaData = await decryptMedia(message, uaOverride)
            const base64 = `data:${message.mimetype};base64, ${mediaData.toString('base64')}`
            await urbae.sendTextWithMentions(message.from, `Terdeteksi @${message.author.split('@')[0]} telah menghapus pesan bertipe ${message.type}`)
            if (message.caption == null || message.caption == undefined) {
                await urbae.sendFile(message.from, base64)
            } else {
                await urbae.sendFile(message.from, base64, '', message.caption)
            }
        } else if (message.self == 'in' && message.type == 'sticker' && isDelete) {
            const mediaData = await decryptMedia(message, uaOverride)
            const base64 = `data:${message.mimetype};base64, ${mediaData.toString('base64')}`
            await urbae.sendTextWithMentions(message.from, `Terdeteksi @${message.author.split('@')[0]} menghapus sticker`)
            await urbae.sendFile(message.from, base64)
        }
    })
}

create(options).then(start).catch((err) => console.log(err))
