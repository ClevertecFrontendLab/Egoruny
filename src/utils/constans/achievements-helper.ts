import moment, { Moment } from 'moment';

export const treningByPeriod = (traningList, startDate, endDate) => {
    const filtredTrenings = traningList.filter((training) =>
        moment(training.date).isBetween(startDate, endDate),
    );
    return filtredTrenings;
};

export const filteredTrainings = (trainings: Training[], filter: string) => {
    if (filter !== 'Все' && trainings) {
        return trainings.filter((e) => e.name.toLowerCase() === filter.toLowerCase());
    }

    return trainings;
};

export const avargeLoad = (trenings) => {
    if (!trenings.length) {
        return 0;
    } else {
        const allExercices = trenings.map((traning) => traning.exercises).flat();
        const totalLoad = trenings.reduce((acc, training) => {
            const exercises = training.exercises;

            exercises.forEach((exercise) => {
                const { approaches, weight, replays } = exercise;
                const load = weight * replays * approaches;
                acc += load;
            });
            return acc;
        }, 0);

        const averageLoad = totalLoad / allExercices.length;

        return Math.round(averageLoad);
    }
};

export const getDataByPlotConfig = (filtredTrenings, startDate: Moment, endDate: Moment) => {
    const data = [];
    while (startDate.isSameOrBefore(endDate, 'day')) {
        const dateToString = startDate.format('DD.MM');
        const trainingByDay = filtredTrenings.filter(
            (training) => moment(training.date).format('DD.MM') === dateToString,
        );

        data.push({ date: dateToString, value: avargeLoad(trainingByDay) });
        startDate.add(1, 'day');
    }

    return data;
};

export const getTotalReplays = (trainings: Training[]) => {
    const allExercicesForPeriod = trainings.map((e) => e.exercises).flat();
    let totalReplays = 0;
    if (trainings.length) {
        totalReplays = allExercicesForPeriod.reduce((acc, curr) => acc + (curr.replays || 0), 0);
    }

    return totalReplays;
};

export const getTotalApproaches = (trainings: Training[]) => {
    const allExercicesForPeriod = trainings.map((e) => e.exercises).flat();
    let totalReplays = 0;

    if (trainings.length) {
        totalReplays = allExercicesForPeriod.reduce((acc, curr) => acc + (curr.approaches || 0), 0);
    }

    return totalReplays;
};

export const totalLoadForPeriod = (trainings: Training[]) => {
    const allExercicesForDay = trainings.map((e) => e.exercises).flat();
    let totalLoad = 0;

    if (trainings.length) {
        totalLoad = allExercicesForDay.reduce(
            (acc, curr) => acc + (curr.approaches || 0) * (curr.weight || 0) * (curr.replays || 0),
            0,
        );
    }

    return totalLoad ? totalLoad : '';
};

export const getToppPactice = (trenings) => {
    const treningName = trenings?.map((item) => item.name);
    const obj = {};
    treningName?.forEach((el) => {
        obj[el] ? (obj[el] += 1) : (obj[el] = 1);
    });
    const val = Object.values(obj);
    const max = Math.max(...val);
    const TopPactice = Object.keys(obj).find((key) => obj[key] === max);

    return TopPactice;
};

const getExesiseName = (trenings) =>
    trenings
        .map((item) => item.exercises)
        .map((item) => item.map((item) => item.name))
        .flat();

export const getTopExesise = (trenings) => {
    const exesisesName = getExesiseName(trenings);
    const obj = {};
    exesisesName?.forEach((el) => {
        obj[el] ? (obj[el] += 1) : (obj[el] = 1);
    });
    const val = Object.values(obj);
    const max = Math.max(...val);
    const TopExesise = Object.keys(obj).find((key) => obj[key] === max);
    const exercise = { name: TopExesise, count: max };
    return exercise;
};

export const getDataForPie = (trenings) => {
    const exesisesName: string[] = getExesiseName(trenings);

    const counts: { [key: string]: number } = {};
    const transformedArray: Array<{ name: string; count: number }> = [];

    exesisesName.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
    });

    Object.keys(counts).forEach((key) => {
        transformedArray.push({
            name: key,
            count: counts[key],
        });
    });

    return transformedArray;
};

export const getTopExesiseByDay = (trenings) => {
    const data: { date: string | Moment; name: string | undefined; count: number }[] = [];
    for (let i = 0; i < 7; i++) {
        const filteredTrainingsByWeekDay = trenings.filter(
            (trening) => moment(trening.date).day() === i,
        );
        const exerciseName = getTopExesise(filteredTrainingsByWeekDay);
        const count = getTopExesise(filteredTrainingsByWeekDay);
        const exerciseData = {
            date: moment().day(i).format('DD.MM'),
            name: '',
            count: 0,
        };

        if (filteredTrainingsByWeekDay.length) {
            exerciseData.date = moment(filteredTrainingsByWeekDay[0].date).format('DD.MM');
            exerciseData.name = exerciseName.name;
            exerciseData.count = count.count;
        }
        data.push(exerciseData);
    }

    return data;
};
