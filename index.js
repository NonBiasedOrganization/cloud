const express = require('express');
const multer = require('multer');
const app = express();

let items = ["text"];

/* Items */
let style = `body {
  font-family: Helvetica;
  margin: 0;
}

.nav {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
  padding: 13px;
  font-size: 25px;
}

#banner {
  color: white;
}

#banner > a {
  color: white;
  font-size: 20px;
}

.item {
  display: inline-block;
  text-align: center;
  margin: 10px 23px;
  border: 2px;
  border-style: solid;
  border-radius: 20px;
  border-color: #b3b3b3;
  background-color: #fff;
  padding: 20px;
  width: 85px;
  height: 85px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
  transition: 0.5s;
  word-break: none;
  overflow: hidden;
  cursor: pointer;
}

.item img {
  width: 90%;
  height: 90%;
}

.item:hover {
  box-shadow: 0 4px 18px 0 rgba(32, 33, 36, .28);
}`;

/* Page */
app.get('/', (req, res) => {
  let icons = "";
  for (let i = 0; i < items.length; i++) {
    icons = icons + `
<div class="item" onclick="showIcon('icon')">
<img src="/${items[i]}" />
<span>${items[i]}.nbo</span>
</div>`;
  }
  res.send(parseHTML(`
${icons}

<div class="item" onclick="newIcon()">
<span style="font-size: 50px; margin-top: 15px; display: block;">+</span>
</div>

<div style="z-layer: 999;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
transition: 0.5;
display: none;
cursor: pointer;
text-align: center;
padding-top: 10%" onclick="this.style.display = 'none'" id="banner"></div>

<script>
function showIcon(icon) {
document.querySelector('#banner').style.display = 'block';
document.querySelector('#banner').innerHTML = \`
<img src='/\${icon}'>
<br>
<a href="#" onclick="deleteIcon()">delete</a> - 
<a href="#" onclick="alert('cannot edit this file!')">edit</a> - 
<a href="#" onclick="alert('cannot download invalid file!')">download</a>
\`;
}

function newIcon() {
  fetch("/new/" + confirm("Would you like to create a text file?").toString())
    .then(response => response.json())
    .then(data => refresh(data))
}

function deleteIcon() {
  fetch("/delete")
    .then(response => response.json())
    .then(data => refresh(data))
}

function refresh(data) {
  window.location.reload(); // the files should be loaded in the page instead of reloading
  console.log(data); // for debugging
}
</script>
`));
});

app.get('/image', (req, res) => {
  res.sendFile(`${__dirname}/image.png`);
});
app.get('/text', (req, res) => {
  res.sendFile(`${__dirname}/text.png`);
});

app.get('/new/:icon', (req, res) => {
  let e = 'text';
  if (req.params.icon != 'true') e = 'image';
  items = items.concat(e);
  res.json({success: true});
});

app.get('/delete', (req, res) => {
  items.splice(items.length - 1);
  res.json({success: true});
});

/* Functions */
function parseHTML(content) {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NBO Cloud</title>
</head>
<body>
<div class="nav">
<span>NBO Cloud</span>
</div>
<div style="padding: 10px; padding-top: 30px;">
<span style="font-size: 30px">Public Files</span>
<hr>
${content}
</div>
<style>
${style}
</style>
</body>
</html>
`;
}

app.listen(3000, () => {
  console.log('server started');
});