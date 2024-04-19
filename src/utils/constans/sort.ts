export const sortFeedbakcsByDate = (items) =>
    [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
