import Bfg9000 from  "../lib";
import "./index.css";


const h1 = document.createElement('h1');
h1.textContent = 'Hello World!';
document.body.appendChild(h1);

const colors = ['#256EFF','#46237A','#3DDC97','#FF495C','#012A36','#29274C','#7E52A0','#D295BF','#E6BCCD','#F5CB5C','#453823','#561F37','#39A2AE','#55DBCB','#75E4B3','#242331','#533E2D','#A27035','#DDCA7D'];

const cubeCount = 50;
for(let i = 0; i < cubeCount; i++) {
    const div = document.createElement('div');
    div.classList.add('cube');
    div.style.backgroundColor = colors[i%colors.length];
    div.style.left = Math.round((window.innerWidth - 200) * Math.random()) + 'px';
    div.style.top = Math.round((window.innerHeight - 200) * Math.random()) + 'px';
    document.body.appendChild(div);
}

const bfgInstance = new Bfg9000({reloadTime: 300});