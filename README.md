# 🧠 DoEasyPeasyCode

<p align="center">
  <strong>See the code. Understand the logic. Explore the execution.</strong>
</p>

<p align="center">
  <em>An AI-assisted interactive code visualization platform built to make programming concepts visual, intuitive, and easier to understand.</em>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-2026-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Fast-purple?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase&logoColor=white)

</p>

---

## ✨ What is DoEasyPeasyCode?

**DoEasyPeasyCode** is a web-based learning and visualization platform that transforms programming code into **interactive visual representations**.

Programming is usually taught through lines of code and static diagrams. The difficult part is that the actual execution of a program is **dynamic** — functions are called, variables change, conditions branch, data moves, and memory structures evolve.

DoEasyPeasyCode adds a visual layer to that process.

```text
             CODE
              │
              ▼
       ┌──────────────┐
       │ Code Analysis│
       └──────┬───────┘
              │
       ┌──────┴───────┐
       ▼              ▼
   ┌────────┐     ┌────────┐
   │  2D    │     │  3D    │
   │ Visual │     │ Visual │
   └────┬───┘     └───┬────┘
        │             │
        └──────┬──────┘
               ▼
        🤖 AI Explanation
               │
               ▼
          💡 Understanding
```

### 🎯 The core idea

> **Don't just read what the code says — see what the code is doing.**

---

# 🚀 Why DoEasyPeasyCode?

A beginner can read this:

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

…but reading the code does not automatically create a correct mental model of the execution.

The platform is designed to make concepts such as:

- 🔁 recursion
- 📚 call stacks
- 🔀 control flow
- 🧩 data structures
- 🔗 relationships between program components
- 🧠 variable/state changes
- ⚙️ algorithm execution

more tangible through visualization.

Instead of asking a learner to mentally simulate the program, the goal is to let them **observe and explore it**.

---

# 🌟 Key Features

## 🎨 Interactive 2D Visualization

Represent program logic through visual structures such as:

- Flow and execution paths
- Nodes and relationships
- Function interactions
- Data structures
- Algorithm steps
- Program states

Example:

```text
Start
  │
  ▼
Condition?
 ├───────────────┐
 │               │
 ▼               ▼
TRUE            FALSE
 │               │
 ▼               ▼
Process A      Process B
 │               │
 └───────┬───────┘
         ▼
        End
```

The purpose is to turn abstract program logic into something that can be **seen rather than imagined**.

---

## 🧊 Interactive 3D Visualization

DoEasyPeasyCode also explores programming concepts in an interactive **3D environment**.

3D visualization can be useful when the concept involves:

- 🌳 hierarchical structures
- 🔗 connected nodes
- 🕸️ graphs and relationships
- 📦 objects and entities
- 🧭 spatial exploration

The project uses **Three.js** and **React Three Fiber** to support browser-based 3D experiences.

---

## 🤖 AI-Assisted Code Understanding

AI is used as an **understanding layer**, not simply as a code generator.

The intended experience is:

```text
User Code
   ↓
AI understands the code
   ↓
Identifies important concepts
   ↓
Explains the logic
   ↓
Visualization helps the user see it
```

For example, for recursion, an explanation can connect:

```text
Recursive Function
       ↓
Recursive Call
       ↓
New Call / Stack Frame
       ↓
Base Condition
       ↓
Return
       ↓
Previous Calls Resolve
```

This connects the **textual explanation** with the **visual execution**.

---

# 🧠 Learning Philosophy

The project is based on a simple principle:

> **Understanding is stronger when the learner can build a mental model instead of memorizing a definition.**

Consider a linked list.

Text:

```text
A node stores data and a reference to the next node.
```

Visual:

```text
┌───────┐     ┌───────┐     ┌───────┐
│  10   │ ──► │  20   │ ──► │  30   │ ──► NULL
└───────┘     └───────┘     └───────┘
```

The second representation exposes the **relationship** immediately.

That is the kind of mental model DoEasyPeasyCode is designed to encourage.

---

# 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| ⚛️ Frontend | React |
| 📘 Language | TypeScript |
| ⚡ Build Tool | Vite |
| 🧊 3D Rendering | Three.js |
| 🎮 3D React Integration | React Three Fiber |
| 🧰 3D Utilities | Drei |
| 🎨 Styling | Tailwind CSS |
| 🔐 Backend / Data | Supabase |
| 🧩 Icons | Lucide React |
| ✅ Code Quality | ESLint |

---

# 🏗️ High-Level Architecture

```text
┌─────────────────────────────────────────┐
│               USER INTERFACE            │
│                                         │
│  Code Input • Controls • AI • Visuals  │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│             CODE PROCESSING             │
│                                         │
│  Structure • Logic • Relationships      │
└────────────────────┬────────────────────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
┌──────────────────┐   ┌──────────────────┐
│   2D VISUALIZER  │   │   3D VISUALIZER  │
│                  │   │                  │
│ Flow / Nodes /   │   │ Spatial Nodes /  │
│ Relationships    │   │ Structures       │
└─────────┬────────┘   └─────────┬────────┘
          │                      │
          └──────────┬───────────┘
                     ▼
            ┌─────────────────┐
            │   AI LAYER      │
            │                 │
            │ Explanation /   │
            │ Understanding   │
            └─────────────────┘
```

---

# 🎓 Educational Use Cases

### 🔁 Recursion

Visualize:

```text
factorial(5)
     ↓
factorial(4)
     ↓
factorial(3)
     ↓
factorial(2)
     ↓
factorial(1)
     ↓
   return
     ↑
   resolve
```

This makes the call-stack behavior easier to reason about.

### 🔀 Control Flow

Show how `if`, `else`, loops, and branching affect execution.

### 🧩 Data Structures

Potential visual representations include:

- Arrays
- Linked Lists
- Stacks
- Queues
- Trees
- Graphs
- Heaps
- Hash structures

### ⚙️ Algorithms

Potential visualizations include:

- Sorting
- Searching
- Traversal
- Graph algorithms
- Step-by-step algorithm execution

---

# 👥 Target Audience

### 🎓 Students

For learners studying programming, data structures, and algorithms.

### 🌱 Beginners

For people who understand basic syntax but struggle to understand execution.

### 👨‍🏫 Educators

For teachers who want visual material for explaining abstract programming concepts.

### 💻 Developers

For developers who want to inspect relationships and execution patterns in unfamiliar code.

---

# 🔮 Future Scope

The project can evolve into a broader **visual programming learning environment**.

### Visualization

- [ ] Step-by-step execution
- [ ] Execution timeline
- [ ] Play / pause / replay
- [ ] Variable-state visualization
- [ ] Memory/reference visualization
- [ ] Advanced 3D structures
- [ ] More algorithm visualizations

### Data Structures

- [ ] Linked Lists
- [ ] Stacks & Queues
- [ ] Trees
- [ ] Graphs
- [ ] Heaps
- [ ] Hash Tables

### AI

- [ ] Explain selected line
- [ ] Beginner / advanced explanations
- [ ] AI-generated visualizations
- [ ] Complexity explanations
- [ ] Error explanations
- [ ] Interactive AI tutor

### Learning

- [ ] Interactive quizzes
- [ ] Practice problems
- [ ] Learning progress
- [ ] Concept-based challenges

---

# 💻 Getting Started

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd DoEasyPeasyCode
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

# 📁 Project Structure

A simplified view of the application:

```text
DoEasyPeasyCode/
│
├── public/
│
├── src/
│   ├── components/
│   ├── ...
│
├── package.json
├── vite.config.*
├── tsconfig.*
└── README.md
```

> The structure may evolve as new visualization modules and AI capabilities are added.

---

# 🗺️ Product Vision

DoEasyPeasyCode is designed to move programming education from:

```text
READ → MEMORIZE → REPEAT
```

towards:

```text
WRITE → VISUALIZE → EXPLORE → UNDERSTAND
```

The long-term goal is to create a platform where programming concepts are not only explained but **experienced interactively**.

---

# 💡 What Makes It Different?

There are plenty of code editors.

There are plenty of AI coding assistants.

There are plenty of programming tutorials.

The opportunity here is the combination:

```text
             ┌──────────┐
             │   CODE   │
             └────┬─────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   🤖 AI       🎨 2D       🧊 3D
 Explanation  Visuals     Visuals
       │          │          │
       └──────────┼──────────┘
                  ▼
          🧠 UNDERSTANDING
```

The platform focuses on the **relationship between code and behavior**, rather than treating code as text alone.

---

# 📌 Project Status

🚧 **DoEasyPeasyCode is actively under development.**

The current project direction focuses on building the core experience around:

- Interactive code visualization
- 2D visual representations
- 3D visual environments
- AI-assisted explanations
- Modern developer-oriented UI

Features and visualization modules will continue to evolve as the platform develops.

---

# 🤝 Contributing

Ideas, feedback, bug reports, and contributions are welcome.

If you have an idea for a new visualization, programming concept, or learning interaction, feel free to open an issue or submit a pull request.

---

# 📄 License

Add an appropriate open-source license before distributing the repository publicly.

---

<p align="center">
  <strong>DoEasyPeasyCode</strong><br>
  <em>Make code visible. Make logic understandable.</em>
</p>
