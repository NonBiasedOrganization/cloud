const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(parseHTML(`
<div class="item" onclick="showIcon('icon')">
<img src="/icon" />
<span>icon.png</span>
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
document.querySelector('#banner').innerHTML = "<img src='/icon'>";
}
</script>
`));
});

app.get('/icon', (req, res) => {
  res.sendFile(`${__dirname}/icon.png`);
});

/* Functions */
function parseHTML(content) {
  return `<!DOCTYPE html>
<html>
<head>
<title>NBO Cloud</title>
</head>
<body>
<div class="nav">
<span>NBO Cloud</span>
</div>
<div style="padding: 10px">
${content}
</div>
<style>
body {
  font-family: Helvetica;
  margin: 0;
}

.nav {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
  padding: 13px;
  font-size: 25px;
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
}
</style>
</body>
</html>
`;
}

app.listen(3000, () => {
  console.log('server started');
});