import { useEffect, useRef } from 'react';

const CODE_SNIPPETS = [
  'function fibonacci(n) {',
  '  if (n <= 1) return n;',
  '  let a = 0, b = 1;',
  '  for (let i = 2; i <= n; i++) {',
  '    let temp = a + b;',
  '    a = b;',
  '    b = temp;',
  '  }',
  '  return b;',
  '}',
  'const arr = [3, 1, 4, 1, 5, 9];',
  'arr.sort((a, b) => a - b);',
  'console.log(arr);',
  'class Node {',
  '  constructor(val) {',
  '    this.val = val;',
  '    this.next = null;',
  '  }',
  '}',
  'def quicksort(arr):',
  '    if len(arr) <= 1:',
  '        return arr',
  '    pivot = arr[0]',
  'public class Main {',
  '  public static void main(String[] args) {',
  '    System.out.println("Hello");',
  '  }',
  '}',
  '#include <iostream>',
  'using namespace std;',
  'int main() {',
  '  cout << "Hello World";',
  '  return 0;',
  '}',
  'const debounce = (fn, ms) => {',
  '  let timer;',
  '  return (...args) => {',
  '    clearTimeout(timer);',
  '    timer = setTimeout(() => fn(...args), ms);',
  '  };',
  '};',
  'async function fetchData(url) {',
  '  const res = await fetch(url);',
  '  return res.json();',
  '}',
];

export default function CodingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let animationId = 0;

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    interface FallingCode {
      text: string;
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fontSize: number;
    }

    const columns: FallingCode[] = [];
    const colCount = Math.floor(width / 220);

    for (let i = 0; i < colCount; i++) {
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      columns.push({
        text: snippet,
        x: (i * width) / colCount + Math.random() * 40,
        y: Math.random() * height * -1,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.06,
        fontSize: 11 + Math.random() * 3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = '500 13px "IBM Plex Mono", monospace';

      for (const col of columns) {
        const lines = col.text.split('\n');
        ctx.fillStyle = `rgba(56, 217, 169, ${col.opacity})`;

        for (let j = 0; j < lines.length; j++) {
          ctx.fillText(lines[j], col.x, col.y + j * (col.fontSize + 4));
        }

        col.y += col.speed;

        if (col.y > height + 100) {
          col.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          col.y = -200;
          col.x = Math.random() * width;
          col.opacity = 0.03 + Math.random() * 0.06;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
