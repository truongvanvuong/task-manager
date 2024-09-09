import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const filterTasksByDate = (tasks, filterType, specificDate = null) => {
    let startOfDay, endOfDay;

    if (filterType === 'last1days') {
        startOfDay = dayjs().subtract(1, 'days').startOf('day');
        endOfDay = dayjs().endOf('day');
    } else if (filterType === 'last3days') {
        startOfDay = dayjs().subtract(3, 'days').startOf('day');
        endOfDay = dayjs().endOf('day');
    } else if (filterType === 'specific' && specificDate) {
        startOfDay = dayjs(specificDate).startOf('day');
        endOfDay = dayjs(specificDate).endOf('day');
    } else {
        return [];
    }

    const tasksByDate = tasks.filter((task) => {
        const taskDate = dayjs(task.date);
        return taskDate.isBetween(startOfDay, endOfDay, null, '[]');
    });
    return tasksByDate;
};
export default filterTasksByDate;
