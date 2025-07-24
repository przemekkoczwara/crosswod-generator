function getRandomExercises(arr, countExercise) {
  const result = [];

  while (result.length < countExercise) {
    const randomExercise = arr[Math.floor(Math.random() * arr.length)];

    if (!result.includes(randomExercise)) {
      result.push(randomExercise);
    }
  }

  return result;
}

export default getRandomExercises;
    