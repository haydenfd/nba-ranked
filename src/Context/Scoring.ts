const soln_map = {
  "2544": 0,
  "101108": 3,
  "202681": 1,
  "202710": 2,
  "1629642": 4,
};

const selected = [
  {
    _id: "669567863ef13914a0300ca3",
    PLAYER_NAME: "LeBron James",
    PLAYER_ID: "2544",
    FROM_YEAR: 2003,
    PPG: 27.1,
    GP: 1484,
    EXP: 21,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300a73",
    PLAYER_NAME: "Kyrie Irving",
    PLAYER_ID: "202681",
    FROM_YEAR: 2011,
    PPG: 23.8,
    GP: 781,
    EXP: 13,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300dcd",
    PLAYER_NAME: "Chris Paul",
    PLAYER_ID: "101108",
    FROM_YEAR: 2005,
    PPG: 17.6,
    GP: 1262,
    EXP: 19,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300d22",
    PLAYER_NAME: "Nassir Little",
    PLAYER_ID: "1629642",
    FROM_YEAR: 2019,
    PPG: 5.6,
    GP: 231,
    EXP: 5,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300d7c",
    PLAYER_NAME: "Jimmy Butler",
    PLAYER_ID: "202710",
    FROM_YEAR: 2011,
    PPG: 18.4,
    GP: 869,
    EXP: 13,
    TO_YEAR: 2024,
    __v: 0,
  },
];

const computeScore = (sel: any, soln: any) => {
  const scores = [];

  for (let i = 0; i < sel.length; i++) {
    const currIdx = i;
    const currPlayerId = sel[i].PLAYER_ID;
    const currPlayerCorrectIdx = soln[currPlayerId];
    let diff = Math.abs(currIdx - currPlayerCorrectIdx);
    if (diff > 2) {
      diff = -1;
    }
    scores.push(diff);
  }

  return scores;
};

export { computeScore };
