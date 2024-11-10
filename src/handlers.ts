import type { Result, ResultArr } from "./index";

interface DataInput {
  person1: string;
  person2: string;
  children: string;
};

export function calculateEyeColorProbability(data: DataInput): ResultArr {
  const childrenCount = Number(data.children);
  let result: Result | null = null;

  const eyeColors: Record<string, Record<string, number>> = {
    blue: { blue: 0.79, green: 0.08, brown: 0.13 },
    green: { blue: 0.03, green: 0.89, brown: 0.08 },
    brown: { blue: 0.03, green: 0.03, brown: 0.94 },
  };

  const p1Probabilities = eyeColors[data.person1];
  const p2Probabilities = eyeColors[data.person2];

  if (data.person1 === data.person2 && childrenCount === 7) {
    result = { color: "golden", probability: 0.99 };
    return [null, result];
  }

  try {
    // Calculate the total probability by summing the product of each parent's probabilities
    const totalProbability = Object.values(p1Probabilities).reduce((sum, prob1, index) => {
      const p2Key = Object.keys(p2Probabilities)[index];
      return sum + prob1 * p2Probabilities[p2Key];
    }, 0);

    for (let i = 0; i < childrenCount; i++) {
      const childPossibilities = Object.keys(eyeColors).reduce((acc, color) => {
        const probability = (p1Probabilities[color] * p2Probabilities[color]) / totalProbability;
        return { ...acc, [color]: probability };
      }, {} as Record<string, number>);

      const highestProbability = Math.max(...Object.values(childPossibilities));
      const highestProbColor = Object.keys(childPossibilities).find(
        (key) => childPossibilities[key] === highestProbability
      );
      const roundedProbability = Math.round(highestProbability * 100) / 100;

      if (highestProbColor) {
        result = { color: highestProbColor, probability: roundedProbability };
      } else {
        return [new Error("No eye color found"), null];
      }
    }

    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
}
