// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'terminal': {
                    'green': '#00ff00',
                    'green-dark': '#00cc00',
                    'green-muted': '#008800',
                    'amber': '#ffaa00',
                    'red': '#ff0000',
                    'yellow': '#ffff00',
                    'cyan': '#00ffff',
                    'bg': '#000000',
                    'bg-alt': '#0a0a0a',
                }
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
            },
            animation: {
                'blink': 'blink 1s infinite',
                'scanline': 'scanline 8s linear infinite',
                'matrix-rain': 'matrix-rain 20s linear infinite',
                'terminal-scan': 'terminal-scan 3s linear infinite',
                'glitch': 'glitch 2s infinite',
                'fadeIn': 'fadeIn 0.5s ease-in',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'typewriter': 'typewriter 4s steps(40) infinite',
            },
        },
    },
}


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('matrixCanvas').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
const charArray = chars.split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";
    
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);


const networkCanvas = document.getElementById('networkCanvas');
let nodes = [];
let packets = [];

function createNetworkVisualization() {

    for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animation = `pulse-glow ${2 + Math.random() * 3}s infinite`;
        networkCanvas.appendChild(node);
        nodes.push(node);
        
  
        if (i > 0) {
            const line = document.createElement('div');
            line.className = 'absolute h-0.5 bg-terminal-green/20';
            line.style.left = nodes[i-1].style.left;
            line.style.top = nodes[i-1].style.top;
            line.style.width = '100px';
            line.style.transform = `rotate(${Math.random() * 360}deg)`;
            networkCanvas.appendChild(line);
        }
    }

    setInterval(() => {
        if (packets.length < 20) {
            const packet = document.createElement('div');
            packet.className = 'data-packet';
            packet.style.left = `${Math.random() * 100}%`;
            packet.style.top = `${Math.random() * 100}%`;
            networkCanvas.appendChild(packet);
            packets.push(packet);
            
       
            const animation = packet.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                packet.remove();
                packets = packets.filter(p => p !== packet);
            };
        }
    }, 300);
}


function updateDateTime() {
    const now = new Date();
    const datetime = now.toLocaleString();
    document.getElementById('datetime').textContent = datetime;
}

updateDateTime();
setInterval(updateDateTime, 1000);

let initializationStep = 0;
const initializationSteps = [
    { element: 'encryptionStatus', text: 'ENCRYPTION ACTIVE', delay: 1000 },
    { element: 'networkStatus', text: 'NETWORK SECURE', delay: 1500 },
    { element: 'systemStatus', text: 'ALL SYSTEMS ONLINE', delay: 2000 },
    { element: 'authStatus', text: 'AUTHENTICATED | ACCESS GRANTED', delay: 2500 },
    { element: 'serverStatus', text: 'OPERATIONAL', delay: 1000 },
    { element: 'dbStatus', text: 'ONLINE', delay: 1200 },
    { element: 'challengeStatus', text: 'RUNNING', delay: 1400 },
    { element: 'authSystemStatus', text: 'ACTIVE', delay: 1600 }
];

function initializeSystem() {
    if (initializationStep < initializationSteps.length) {
        const step = initializationSteps[initializationStep];
        setTimeout(() => {
            document.getElementById(step.element).textContent = step.text;
            initializationStep++;
            initializeSystem();
        }, step.delay);
    } else {
        // Start dynamic updates
        startDynamicUpdates();
    }
}


function startDynamicUpdates() {
  
    setInterval(() => {
        const networkLoad = 30 + Math.random() * 40;
        const systemResources = 20 + Math.random() * 50;
        
        document.getElementById('networkLoadValue').textContent = `${Math.round(networkLoad)}%`;
        document.getElementById('networkLoadBar').style.width = `${networkLoad}%`;
        
        document.getElementById('systemResourcesValue').textContent = `${Math.round(systemResources)}%`;
        document.getElementById('systemResourcesBar').style.width = `${systemResources}%`;
    }, 2000);
    
 
    setTimeout(() => {
        document.getElementById('teamPosition').textContent = '#12';
        document.getElementById('teamPoints').textContent = '1850';
        document.getElementById('rankProgress').style.width = '65%';
        
        document.getElementById('topTeamsList').innerHTML = `
            <li class="pl-2">Zero Cool - 4250 pts</li>
            <li class="pl-2">Acid Burn - 4100 pts</li>
            <li class="pl-2">Crash Override - 3950 pts</li>
        `;
        
        document.getElementById('challengesList').innerHTML = `
            <li class="flex justify-between items-center pb-3 border-b border-dashed border-terminal-green/20">
                <span class="text-terminal-green">Cryptography - RSA Weakness</span>
                <span class="text-terminal-amber font-semibold">200 pts</span>
            </li>
            <li class="flex justify-between items-center pb-3 border-b border-dashed border-terminal-green/20">
                <span class="text-terminal-green">Web - SQL Injection</span>
                <span class="text-terminal-amber font-semibold">300 pts</span>
            </li>
            <li class="flex justify-between items-center pb-3 border-b border-dashed border-terminal-green/20">
                <span class="text-terminal-green">Forensics - Memory Analysis</span>
                <span class="text-terminal-amber font-semibold">250 pts</span>
            </li>
            <li class="flex justify-between items-center pb-3 border-b border-dashed border-terminal-green/20">
                <span class="text-terminal-green">Reverse Engineering - Crackme</span>
                <span class="text-terminal-amber font-semibold">400 pts</span>
            </li>
            <li class="flex justify-between items-center">
                <span class="text-terminal-green">Steganography - Hidden Message</span>
                <span class="text-terminal-amber font-semibold">150 pts</span>
            </li>
        `;
    }, 3000);
}


const commands = [
    "scan --network",
    "challenges --list --category all",
    "team --stats --detailed",
    "scoreboard --live --update",
    "monitor --traffic --real-time",
    "crypto --analyze --weakness",
    "forensics --tools --list",
    "help --commands"
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeCommand() {
    const currentCommand = commands[commandIndex];
    const commandElement = document.getElementById('currentCommand');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!isWaiting) {
        if (!isDeleting) {
            commandElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentCommand.length) {
                isWaiting = true;
                setTimeout(() => {
                 
                    const outputLine = document.createElement('div');
                    outputLine.className = 'text-terminal-green-muted ml-6 mb-4';
                    outputLine.textContent = getCommandOutput(currentCommand);
                    terminalOutput.appendChild(outputLine);
                    
                 
                    const newLine = document.createElement('div');
                    newLine.className = 'terminal-line mb-2';
                    newLine.innerHTML = `
                        <span class="text-terminal-cyan font-medium">sysien@ctf-dashboard:~$</span>
                        <span id="currentCommand" class="text-terminal-green"></span>
                        <div class="terminal-cursor"></div>
                    `;
                    terminalOutput.appendChild(newLine);
                    
                   
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                    
                    isDeleting = true;
                    setTimeout(typeCommand, 500);
                }, 1000);
                return;
            }
        } else {
            commandElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    typeCommand();
                }, 500);
                return;
            }
        }
    }
    
    setTimeout(typeCommand, isDeleting ? 50 : 100);
}

function getCommandOutput(command) {
    const outputs = {
        "scan --network": "> Scanning network... Found 5 active targets. No threats detected.",
        "challenges --list --category all": "> Retrieving all challenges... 8 challenges available across 4 categories.",
        "team --stats --detailed": "> Team: Byte Bandits | Rank: #12 | Points: 1850 | Members: 4/5",
        "scoreboard --live --update": "> Live scoreboard updating... Top team: Zero Cool (4250 pts)",
        "monitor --traffic --real-time": "> Monitoring network traffic... 42 packets/sec. All encrypted.",
        "crypto --analyze --weakness": "> Analyzing cryptographic implementations... 2 potential weaknesses identified.",
        "forensics --tools --list": "> Available tools: binwalk, strings, hexdump, volatility, autopsy",
        "help --commands": "> Available commands: scan, challenges, team, scoreboard, monitor, crypto, forensics, auth, system"
    };
    return outputs[command] || "> Command executed successfully.";
}


document.addEventListener('DOMContentLoaded', () => {
    createNetworkVisualization();
    initializeSystem();
    setTimeout(typeCommand, 2000);
    
   
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});