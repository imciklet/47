const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");
const fetch = require('node-fetch');

client.conf = {
"token": "ODMxODM0MjgwMDE4NTc1Mzcx.YHbACw.I3KVfLaqVDxAs8eoTKVgrLATwaw",
 "pref": "!",
  "own": "791680930623258674",
  "oynuyor": "!help",
  "durum": "idle"
}

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.conf.pref)) return;
  let command = message.content.split(" ")[0].slice(client.conf.pref.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.on("ready", () => {
  console.log(`Bütün komutlar yüklendi, bot çalıştırılıyor...`);
  console.log(`${client.user.username} ismi ile Discord hesabı aktifleştirildi!`);
  client.user.setStatus(client.conf.durum);
  client.user.setActivity(client.conf.oynuyor);
  console.log(`Oynuyor ayarlandı!`);
})

client.on('message', async(message) => {
if(message.author.bot) return;
  if(message.channel.id !== '719188846939734127') return;
if(message.content.startsWith('.')) return;
if(message.content.split(" ").length > 1) return message.channel.send('kelime ya bruh').then(msg => {
                msg.delete({ timeout: 5000})
                message.delete()
            })
let kelime = db.get(`son_${message.guild.id}`)
let kelimeler = db.get(`kelimeler_${message.guild.id}`)

let kişi = db.get(`klm_${message.guild.id}`)
if(kişi == message.author.id) return message.channel.send('en son zaten sen yazmışsın -_-').then(msg => {
                msg.delete({ timeout: 5000})
                message.delete()
            })

if(kelime == null) {
let random = String.fromCharCode(65+Math.floor(Math.random() * 26))
let son = random.charAt(random.length-1)
db.set(`son_${message.guild.id}`, son)
message.channel.send('Oyun **' + son + '** harfi ile başladı')
} 

if(kelime.toLowerCase() !== message.content.charAt(0)) return message.channel.send('en son yazılan kelime **'+ kelime + '** ile bitmiş üzgünüm :(').then(msg => {
                msg.delete({ timeout: 5000})
                message.delete()
            })

if(!kelimeler) return db.push(`kelimeler_${message.guild.id}`, message.content)
if(kelimeler.includes(message.content)) return message.channel.send('Bu kelime zaten yazılmış başka bir şey dene :/').then(msg => {
                msg.delete({ timeout: 5000})
                message.delete()
    })
