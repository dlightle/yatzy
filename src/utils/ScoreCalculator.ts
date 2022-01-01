import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';
import {Player} from '../types/Player';
import {ScoringCategory, ScoringCategoryDescriptions} from '../types/Scoring';

export interface IScoreCalculator {
  calculateUpperSectionTotal: (player: Player) => number;
  calculateUpperSectionBonus: (player: Player) => number;
  calculateLowerSectionTotal: (player: Player) => number;
  calculateTotal: (player: Player) => number;
  calculators: Record<ScoringCategory, (dice: number[]) => number>;
}

const groupDice = (dice: number[]) => {
  // Group dice by their value, then order them by the count of each value showing (descending)
  const grouped = groupBy(dice);

  let result: number[][] = [];

  for (let d = 1; d <= dice.length; d++) {
    if (grouped[d]) {
      result.push(grouped[d]);
    }
  }

  result = orderBy(result, (arr: number[]) => arr.length, "desc");

  return result;
};

function includesAll (dice: number[], expected: number[]) {
  return expected.every(e => dice.includes(e))
}

export const ScoreCalculator: IScoreCalculator = {
  calculateUpperSectionTotal: (player: Player) => {
    return ScoringCategoryDescriptions
        .filter((scd) => scd.section === "Upper")
        .map((scd) => player.scoring[scd.category] ?? 0)
        .reduce((total, previous) => (total ?? 0) + (previous ?? 0)) ?? 0;
  },
  calculateUpperSectionBonus: (player: Player) => {
    const upperTotal = ScoreCalculator.calculateUpperSectionTotal(player);

    return upperTotal >= 63 ? 50 : 0;
  },
  calculateLowerSectionTotal: (player: Player) => {
    return ScoringCategoryDescriptions
        .filter((scd) => scd.section === "Lower")
        .map((scd) => player.scoring[scd.category] ?? 0)
        .reduce((total, previous) => (total ?? 0) + (previous ?? 0)) ?? 0;
  },
  calculateTotal: (player: Player) => {
    const upperTotal = ScoreCalculator.calculateUpperSectionTotal(player);
    const upperBonus = ScoreCalculator.calculateUpperSectionBonus(player);
    const lowerTotal = ScoreCalculator.calculateLowerSectionTotal(player);

    return upperTotal + upperBonus + lowerTotal;
  },
  calculators: {
    "ones": (dice: number[]) => {
      // Sum all dice showing 1
      return sum(dice.filter((d) => d === 1));
    },
    "twos": (dice: number[]) => {
      // Sum all dice showing 2
      return sum(dice.filter((d) => d === 2));
    },
    "threes": (dice: number[]) => {
      // Sum all dice showing 3
      return sum(dice.filter((d) => d === 3));
    },
    "fours": (dice: number[]) => {
      // Sum all dice showing 4
      return sum(dice.filter((d) => d === 4));
    },
    "fives": (dice: number[]) => {
      // Sum all dice showing 5
      return sum(dice.filter((d) => d === 5));
    },
    "sixes": (dice: number[]) => {
      // Sum all dice showing 6
      return sum(dice.filter((d) => d === 6));
    },
    "threeOfAKind": (dice: number[]) => {
      // Sum of 3 identical dice, otherwise 0
      const groupedDice = groupDice(dice);

      if (groupedDice[0].length >= 3) {
        return sum(dice);
      }

      return 0;
    },
    "fourOfAKind": (dice: number[]) => {
      // Sum of 4 identical dice, otherwise 0
      const groupedDice = groupDice(dice);

      if (groupedDice[0].length >= 4) {
        return sum(dice);
      }

      return 0;
    },
    "fullHouse": (dice: number[]) => {
      // Score 25 if there is a separate three of a kind and one pair
      const groupedDice = groupDice(dice);

      if (groupedDice.length === 2 && groupedDice[0].length === 3 && groupedDice[1].length === 2) {
        return 25;
      }

      return 0;
    },
    "smallStraight": (dice: number[]) => {
      // Score 30 if small straight [1, 2, 3, 4], [2, 3, 4, 5], or [3, 4, 5, 6] is showing
      if (includesAll(dice, [1, 2, 3, 4]) || includesAll(dice, [2, 3, 4, 5]) || includesAll(dice, [3, 4, 5, 6])) {
        return 30;
      }

      return 0;
    },
    "largeStraight": (dice: number[]) => {
      // Score 40 if large straight [1, 2, 3, 4, 5] or [2, 3, 4, 5, 6] is showing
      if (includesAll(dice, [1, 2, 3, 4, 5]) || includesAll(dice, [2, 3, 4, 5, 6])) {
        return 40;
      }

      return 0;
    },
    "yatzy": (dice: number[]) => {
      // Score 50 if all dice are the same, otherwise 0
      const groupedDice = groupDice(dice);

      if (groupedDice[0].length === 5) {
        return 50;
      }

      return 0;
    },
    "chance": (dice: number[]) => {
      // Sum all dice, regardless of value
      return sum(dice);
    }
  }
};
