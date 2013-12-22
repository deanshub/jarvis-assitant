//Inserts

//users
db.users.insert({email:"deanshub@gmail.com", password:"pass",firstName:"dean",lastName:"shub",apps:["jarvis"]})
db.users.insert({email:"deanshub@shubapp.com", password:"pass",firstName:"dean2",lastName:"shub",apps:["jarvis","word"]})

//plugins
db.jarvisplugins.insert({app:"jarvis", type:"os", method:"C:\\Users\\Dean\\Downloads\\chrome-win32\\chrome.exe", text: ["open browser"],tags:["chrome"] })
db.jarvisplugins.insert({app:"jarvis", type:"os", method:"C:\\Users\\Dean\\Downloads\\chrome-win32\\chrome.exe `http://localhost/demo/jarvisExample.htm", text: ["demo"],tags:["chrome"] })
db.jarvisplugins.insert({app:"jarvis", type:"os", method:"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe `C:\\Users\\Dean\\Dropbox\\Success\\success.mp3", text: ["listen to audiobook"],tags:["audio"] })
db.jarvisplugins.insert({app:"jarvis", type:"os", method:"rundll32.exe`user32.dll,`LockWorkStation", text: ["Jarvis I'm out"],tags:["windows"] })