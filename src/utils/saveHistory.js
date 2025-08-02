function saveScoreHistory(newScore) {
  const savedHistory = localStorage.getItem('workoutHistory');
  const history = savedHistory ? JSON.parse(savedHistory) : [];

  const updatedHistory = [...history, newScore];

  localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));

  return updatedHistory;
}

export default saveScoreHistory;
