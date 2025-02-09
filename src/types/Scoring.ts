export type ScoringCategory =
  'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes' |
  'threeOfAKind' | 'fourOfAKind' |
  'smallStraight' | 'largeStraight' | 'fullHouse' | 'chance' |
  'yatzy' // The categories a player may score in

export type ScoringSection = 'Upper' | 'Lower'; // A category may be in the upper or lower sections

export interface ScoringCategoryDetails {
  category: ScoringCategory;
  name: string;
  description: string;
  section: ScoringSection;
}

// Provides supplemental information about each scoring category,
// such as a description of how the category is scored.
export const ScoringCategoryDescriptions: ScoringCategoryDetails[] = [
  {
    category: "ones",
    name: "Ones",
    section: "Upper",
    description: "The sum of all dice showing the number 1."
  },
  {
    category: "twos",
    name: "Twos",
    section: "Upper",
    description: "The sum of all dice showing the number 2."
  },
  {
    category: "threes",
    name: "Threes",
    section: "Upper",
    description: "The sum of all dice showing the number 3."
  },
  {
    category: "fours",
    name: "Fours",
    section: "Upper",
    description: "The sum of all dice showing the number 4."
  },
  {
    category: "fives",
    name: "Fives",
    section: "Upper",
    description: "The sum of all dice showing the number 5."
  },
  {
    category: "sixes",
    name: "Sixes",
    section: "Upper",
    description: "The sum of all dice showing the number 6."
  },
  {
    category: "threeOfAKind",
    name: "Three of a Kind",
    section: "Lower",
    description: "Three dice showing the same number. Score: Sum of all the dice."
  },
  {
    category: "fourOfAKind",
    name: "Four of a Kind",
    section: "Lower",
    description: "Four dice with the same number. Score: Sum of all the dice."
  },
  {
    category: "fullHouse",
    name: "Full House",
    section: "Lower",
    description: "Any set of three combined with a different pair. Score: 25 points."
  },
  {
    category: "smallStraight",
    name: "Small Straight",
    section: "Lower",
    description: "Sequence of 4 dice. Score: 30 points."
  },
  {
    category: "largeStraight",
    name: "Large Straight",
    section: "Lower",
    description: "Sequence of 5 dice. Score: 40 points."
  },
  {
    category: "yatzy",
    name: "Yatzy",
    section: "Lower",
    description: "All five dice with the same number. Score: 50 points."
  },
  {
    category: "chance",
    name: "Chance",
    section: "Lower",
    description: "Any combination of dice. Score: Sum of all the dice."
  }
];
