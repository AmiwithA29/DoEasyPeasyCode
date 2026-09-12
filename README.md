import zipfile, os, re, json, textwrap

zip_path = "/mnt/data/DoEasyPeasyCode.zip"
extract_dir = "/mnt/data/DoEasyPeasyCode_inspected"
os.makedirs(extract_dir, exist_ok=True)

with zipfile.ZipFile(zip_path, "r") as z:
    names = z.namelist()
    z.extractall(extract_dir)

# Build a compact project inventory while avoiding dependencies/build artifacts.
skip_dirs = {"node_modules", ".git", "dist", "build", ".next", "coverage", "__pycache__"}
files = []
for root, dirs, fs in os.walk(extract_dir):
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    for f in fs:
        p = os.path.join(root, f)
        rel = os.path.relpath(p, extract_dir).replace("\\", "/")
        try:
            size = os.path.getsize(p)
        except OSError:
            size = 0
        files.append((rel, size))

interesting = []
for rel, size in files:
    if size > 2_000_000:
        continue
    ext = os.path.splitext(rel)[1].lower()
    if ext in {".js",".jsx",".ts",".tsx",".json",".css",".html",".md",".txt",".vue",".svelte"} or os.path.basename(rel).lower() in {"package.json","vite.config.js","vite.config.ts","next.config.js","next.config.mjs","readme.md"}:
        interesting.append(rel)

# Read selected source/config files, capped to keep inspection manageable.
contents = {}
for rel in interesting[:120]:
    p = os.path.join(extract_dir, rel)
    try:
        with open(p, "r", encoding="utf-8", errors="ignore") as fh:
            txt = fh.read(12000)
        contents[rel] = txt
    except Exception:
        pass

# Generate a project-aware README based on the actual files.
package_files = [r for r in contents if r.endswith("package.json")]
package_data = {}
if package_files:
    for pf in package_files:
        try:
            package_data[pf] = json.loads(contents[pf])
        except Exception:
            pass

all_text = "\n".join(contents.values())
deps = set()
for data in package_data.values():
    deps.update((data.get("dependencies") or {}).keys())
    deps.update((data.get("devDependencies") or {}).keys())

def has_any(patterns):
    return any(re.search(p, all_text, re.I) for p in patterns)

features = []
if has_any([r"three", r"@react-three", r"react-three-fiber", r"3d"]):
    features.append("3D code visualization")
if has_any([r"canvas", r"svg", r"visuali[sz]ation", r"flowchart", r"diagram"]):
    features.append("interactive 2D visualization")
if has_any([r"\bai\b", r"gemini", r"openai", r"anthropic", r"groq", r"generat", r"explain"]):
    features.append("AI-assisted code understanding")
if has_any([r"monaco", r"codemirror", r"syntax", r"highlight"]):
    features.append("code editor / syntax highlighting")
if has_any([r"dark", r"theme", r"gradient", r"glass"]):
    features.append("dark visual interface")

# Infer framework
framework = "React"
if any("next" in d.lower() for d in deps):
    framework = "Next.js"
elif any("vite" in d.lower() for d in deps):
    framework = "React + Vite"

# Root-ish file listing
top_files = sorted([r for r, _ in files if "/" not in r and not r.startswith(".")])[:40]

readme = f"""# DoEasyPeasyCode

> **Turn code into something you can see, understand, and explore.**

DoEasyPeasyCode is an interactive **code visualization platform** designed to make programming logic easier to understand by transforming code snippets into visual representations.

Instead of reading a block of code and mentally simulating what happens, the project aims to **show the logic** — including how code flows, how structures relate to each other, and how an algorithm behaves.

## 🚀 What is DoEasyPeasyCode?

DoEasyPeasyCode combines a code-focused interface with visual explanations so that users can move from:

**Code → Logic → Visualization → Understanding**

The core idea is simple:

> **Don't just read the code. See what the code is doing.**

The project is being built around interactive **2D and 3D code visualizations**, with AI-assisted understanding/explanations as part of the experience.

## ✨ Key Features

- 🧩 **Code-to-visualization** — convert code logic into visual representations.
- 🎨 **2D visualizations** — represent flows, relationships, structures, and execution logic in an easier-to-follow visual form.
- 🧊 **3D visualizations** — explore code concepts and structures in an immersive 3D environment.
- 🤖 **AI-assisted understanding** — use AI to help explain code and make complex logic easier to follow.
- 💻 **Interactive code experience** — work with code snippets while viewing their visual representation.
- 🌑 **Modern developer-focused UI** — a dark, visually rich interface designed around code and visualization.

## 🎯 The Problem

Learning programming often requires students to mentally execute code.

For example, when learning recursion, a beginner may understand the syntax:

```text
function factorial(n) {{
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}}
