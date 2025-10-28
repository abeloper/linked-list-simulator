# 🌐 Linked List Assembly Simulator

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)
![CSS3](https://img.shields.io/badge/CSS3-Animations-blue)
![Web Assembly](https://img.shields.io/badge/Visualization-Interactive-green)

**See assembly language come to life in your browser!**

[![View Demo](https://img.shields.io/badge/VIEW-Live_Demo-8A2BE2)](https://your-username.github.io/linked-list-simulator)
[![Assembly Source](https://img.shields.io/badge/SEE-Assembly_Code-red)](https://github.com/your-username/assembly-linked-list-emu8086)

</div>

## 🎪 Welcome to the Assembly Playground!

Ever wondered what happens inside your computer when you run assembly code? 🤔 This interactive simulator lets you **SEE the invisible** - watch memory operations, pointer manipulation, and algorithms unfold in real-time!

### ✨ What You'll Experience:
- 🎯 **Visual Node Management** - Watch data boxes light up
- 🔗 **Animated Pointers** - See how nodes connect and disconnect  
- 💾 **Live Memory View** - Peek into actual memory addresses
- ⚡ **Real-time Registers** - CPU registers updating before your eyes
- 📜 **Assembly Code Highlighting** - Instructions light up as they execute

## 🚀 Live Demo

**👉 [Click here to try the live simulator!](https://github.com/abeloper/linked-list-simulator.git)**

## 🎮 Features That Make Learning Fun

### 1. 🧊 Visual Node System
```javascript
// Watch nodes come to life!
createNode(value) {
    return {
        value: value,
        next: null,
        address: `0x${address.padStart(8, '0')}`,
        element: null
    };
}
```

### 2. 🔗 Pointer Animation
- **Smooth transitions** when nodes connect
- **Visual highlighting** of active operations  
- **NULL pointer visualization** - see the "end of the road"

### 3. 💾 Memory Inspector
```
Memory View:
0x00001000: 5 | 0x00001004: 0x00001008
0x00001008: 3 | 0x0000100C: 0x00001010
0x00001010: 7 | 0x00001014: NULL
```

### 4. ⚡ Register Monitor
| Register | Value | Purpose |
|----------|-------|---------|
| **EAX** | `0x00001000` | Current node pointer |
| **EBX** | `0x00001018` | Memory allocation |
| **ECX** | `0x00000000` | Temporary storage |
| **EDX** | `0x00000000` | Data transfer |

## 🎯 How to Use the Simulator

### Basic Operations:
1. **📥 Insert at Beginning** - Adds node to the start
2. **📥 Insert at End** - Adds node to the end  
3. **🗑️ Delete Node** - Removes by value
4. **👁️ Display List** - Shows current state
5. **🔄 Generate Random** - Quick test data

### 🧪 Try This Learning Sequence:
```
1. Insert at Beginning: 5
2. Insert at End: 3
3. Insert at Beginning: 7
4. Display List
5. Delete Node: 3
6. Watch the magic happen! ✨
```

## 🏗️ Technical Architecture

### Frontend Stack:
```yaml
HTML5: Semantic structure
CSS3: Gradient backgrounds, animations, responsive design
JavaScript: ES6+ classes, DOM manipulation, event handling
```

### Simulation Engine:
```javascript
class LinkedList {
    constructor() {
        this.head = null;
        this.memoryAddress = 0x1000;
        this.highlightedNode = null;
    }
    // Core linked list operations...
}
```

### Visual Components:
- **Node Visualization** - CSS gradients and animations
- **Memory Display** - Monospace font for authenticity
- **Register Panel** - Real-time CPU state
- **Code Viewer** - Syntax-highlighted assembly

## 🎓 Educational Value

### What You'll Learn:
- **Memory Allocation** - How nodes get space in memory
- **Pointer Manipulation** - The magic of linking nodes
- **Algorithm Visualization** - Seeing code execute step-by-step
- **Computer Architecture** - Registers, memory, and execution

### Perfect For:
- 🎓 **Microprocessor Courses** - Visual aid for assembly concepts
- 💻 **Computer Science Students** - Understanding data structures
- 🔧 **Programming Enthusiasts** - Low-level concepts made accessible
- 👨‍🏫 **Educators** - Classroom demonstrations

## 🔗 Related Projects

### 📟 Assembly Source Code
This simulator is based on real assembly code! Check out the **[Assembly Linked List Repository](https://github.com/abeloper/linked-list-simulator.git)** to see the actual x86 implementation.

### 🎯 Learning Path:
1. **Play with this simulator** ← You are here!
2. **Understand the concepts visually**
3. **Study the assembly implementation**
4. **Write your own assembly code**

## 🛠️ Local Development

Want to run this locally or contribute? Easy!

```bash
# Clone the repository
git clone https://github.com/abeloper/linked-list-simulator.git

# Navigate to project
cd linked-list-simulator

# Open in browser (no build process needed!)
open index.html
```

### File Structure:
```
linked-list-simulator/
├── index.html          # Main simulator page
├── style.css           # Beautiful styling
├── script.js           # Simulation engine
├── images/            # Screenshots and GIFs
├── README.md          # This file!
└── demo.html          # Alternative demo version
```

## 🌟 Special Features

### 🎨 Beautiful Design
- **Gradient backgrounds** - Deep blue learning environment
- **Smooth animations** - Professional polish
- **Responsive layout** - Works on all devices
- **Color-coded elements** - Intuitive understanding

### 🔧 Interactive Elements
- **Real-time feedback** - Immediate visual response
- **Error handling** - Learn from mistakes
- **Status updates** - Know what's happening
- **Memory addresses** - Authentic assembly experience

### 📚 Learning Aids
- **Step-by-step execution** - Understand each operation
- **Visual pointers** - See connections form and break
- **Register updates** - Watch CPU state change
- **Code highlighting** - Connect visuals to code

<div align="center">

### 🚀 Ready to Explore?

[**Try the Live Simulator!**](https://github.com/abeloper/linked-list-simulator.git)

*"See the code, understand the machine, master the concept!"* 🎯

</div>
