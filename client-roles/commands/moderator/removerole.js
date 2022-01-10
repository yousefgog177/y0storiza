module.exports = {
	name: 'removerole', // اسم الامر
	description: "Add Role in Shop", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"

if(msg.author.id !== row[0].owner && msg.author.id !== row[0].buyOwner) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": "Only Owner Bot or now Owner Can set Owner!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})

  var role = msg.channel.guild.roles.get(msg.roleMentions[0]) || msg.channel.guild.roles.get(args[0]) || msg.channel.guild.roles.find(r => r["name"].toLowerCase().startsWith(args[0].toLowerCase()))
if(!role) return client.createMessage(msg.channel.id, {
  embed:{
    description:"**I Can't find this role**" ,
    color: 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
  }
})
if(!row[0].roles.find(d => d.id === role.id)) return client.createMessage(msg.channel.id, {
  embed:{
    description:"** I Can't find this role in list**" ,
    color: 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }

  }
})
await db.updateOne({id: client.user.id} , { $pull: 
{ roles: row[0].roles.find(d => d.id === role.id) }
 })
return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": `**Done**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})

  }
}