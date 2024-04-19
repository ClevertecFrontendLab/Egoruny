export const findTrainType = (trains, trainList) => {
    const resultTrain: Record<string, number> = {};

    trains.map((e) =>
        e.exercises.forEach((el) => {
            if (el.replays && el.approaches && el.weight) {
                resultTrain[e.name] = el.replays * el.weight * el.approaches;
            }
        }),
    );
    const maxValue = Math.max(...Object.keys(resultTrain).map((key) => resultTrain[key]));
    const maxName = Object.keys(resultTrain).find((key) => resultTrain[key] === maxValue);

    const maxTraining = trainList.find(({ name }) => name === maxName)?.key;

    return maxTraining;
};
