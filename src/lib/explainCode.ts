export interface CodeStep {
  title: string;
  description: string;
  line: string;
  lineNumber: number;
}

export type Language = 'javascript' | 'python' | 'java' | 'cpp';

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

export async function explainCode(
  code: string,
  language: Language
): Promise<CodeStep[]> {
  try {
    return await aiExplain(code, language);
  } catch {
    return ruleBasedExplain(code, language);
  }
}

async function aiExplain(
  _code: string,
  _language: Language
): Promise<CodeStep[]> {
  // TODO: Wire up real AI API call here
  throw new Error('AI API not configured');
}

function ruleBasedExplain(code: string, _language: Language): CodeStep[] {
  const rawLines = code.split('\n');
  const steps: CodeStep[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const line = raw.trim();
    if (line.length === 0) continue;

    const step = analyzeLine(line, i + 1, _language, steps.length === 0);
    if (step) steps.push(step);
  }

  return steps;
}

function analyzeLine(
  line: string,
  lineNumber: number,
  language: Language,
  isFirst: boolean
): CodeStep | null {
  // Comments
  if (/^(\/\/|#|\/\*|\*)/.test(line)) {
    return {
      title: 'Comment',
      description: `A note for anyone reading the code — it's ignored at runtime.`,
      line,
      lineNumber,
    };
  }

  // Function/method declarations
  if (/^(function\s+|def\s+|public\s+.*\(|private\s+.*\(|void\s+|static\s+.*\()/.test(line)) {
    const nameMatch = line.match(/(?:function\s+|def\s+)(\w+)/) || line.match(/(\w+)\s*\(/);
    const name = nameMatch ? nameMatch[1] : 'this block';
    return {
      title: 'Function Declaration',
      description: `Defines a function named "${name}" that can be called elsewhere in the program.`,
      line,
      lineNumber,
    };
  }

  // Class declarations
  if (/^(class\s+)/.test(line)) {
    const nameMatch = line.match(/class\s+(\w+)/);
    const name = nameMatch ? nameMatch[1] : 'this class';
    return {
      title: 'Class Declaration',
      description: `Defines a new class called "${name}" — a blueprint for creating objects.`,
      line,
      lineNumber,
    };
  }

  // Imports / includes
  if (/^(import\s|from\s|include\s|#include|using\s)/.test(line)) {
    return {
      title: 'Import',
      description: `Brings an external library or module into scope so its features can be used here.`,
      line,
      lineNumber,
    };
  }

  // Conditional checks
  if (/^(if\s*\(|if\s+|else\s+if|elif\s+|switch\s*\(|case\s)/.test(line)) {
    const condMatch = line.match(/\((.*?)\)/);
    const cond = condMatch ? condMatch[1] : 'a condition';
    return {
      title: 'Conditional Check',
      description: `Evaluates ${cond} — if true, the following block runs; if false, it's skipped.`,
      line,
      lineNumber,
    };
  }

  // Else
  if (/^(else\s*\{|else:)/.test(line)) {
    return {
      title: 'Else Branch',
      description: `This block runs only when the preceding condition was false.`,
      line,
      lineNumber,
    };
  }

  // Loops
  if (/^(for\s*\(|for\s+|while\s*\(|while\s+|do\s*\{|foreach)/.test(line)) {
    const loopMatch = line.match(/\((.*?)\)/);
    const cond = loopMatch ? loopMatch[1] : 'a range';
    return {
      title: 'Loop',
      description: `Repeats the following block while ${cond} holds true.`,
      line,
      lineNumber,
    };
  }

  // Return
  if (/^(return\s)/.test(line)) {
    const valMatch = line.match(/return\s+(.*)/);
    const val = valMatch ? valMatch[1].replace(/[;{}]/g, '').trim() : 'a value';
    return {
      title: 'Return',
      description: `Sends ${val} back to wherever this function was called.`,
      line,
      lineNumber,
    };
  }

  // Variable declarations
  if (/^(const\s|let\s|var\s|int\s|float\s|double\s|String\s|char\s|auto\s|boolean\s|bool\s)/.test(line)) {
    const varMatch = line.match(/(?:const|let|var|int|float|double|String|char|auto|boolean|bool)\s+(\w+)/);
    const varName = varMatch ? varMatch[1] : 'a variable';
    return {
      title: 'Variable Declaration',
      description: `Creates a new variable "${varName}" and stores a value in it for later use.`,
      line,
      lineNumber,
    };
  }

  // Print / console output
  if (/^(print\s*\(|console\.log|System\.out\.print|cout\s*<<|echo\s)/.test(line)) {
    return {
      title: 'Output',
      description: `Prints something to the console or terminal so you can see the result.`,
      line,
      lineNumber,
    };
  }

  // Assignment (has = but not ==)
  if (line.includes('=') && !line.includes('==') && !line.includes('<=') && !line.includes('>=')) {
    return {
      title: 'Assignment',
      description: `Stores a new value into an existing variable.`,
      line,
      lineNumber,
    };
  }

  // Function call
  if (line.includes('(') && line.includes(')')) {
    const callMatch = line.match(/(\w+)\s*\(/);
    const fnName = callMatch ? callMatch[1] : 'a function';
    return {
      title: 'Function Call',
      description: `Calls ${fnName}() — this runs that function's code and may return a result.`,
      line,
      lineNumber,
    };
  }

  // Closing braces
  if (/^[}\]]/.test(line)) {
    return {
      title: 'Block Close',
      description: `Closes the current code block.`,
      line,
      lineNumber,
    };
  }

  // Fallback
  return {
    title: 'Statement',
    description: `Executes an operation: "${truncate(line)}".`,
    line,
    lineNumber,
  };
}

function truncate(s: string, max = 60): string {
  return s.length > max ? s.substring(0, max) + '...' : s;
}
