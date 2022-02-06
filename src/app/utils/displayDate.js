import { DateTime } from 'luxon';

export function displayDate(createdDate) {
  const date = new Date(parseInt(createdDate));
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();

  if (yearDif === 0) {
    const dayDif = dateNow.getDay() - date.getDay();

    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();

      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();

        if (minutesDif >= 0 && minutesDif < 5) return '1 минуту назад';
        if (minutesDif >= 5 && minutesDif < 10) return '5 минуту назад';
        if (minutesDif >= 10 && minutesDif < 30) return '10 минут назад';

        return '30 минут назад';
      }

      return DateTime.fromJSDate(date).toFormat('T');
    }

    return DateTime.fromJSDate(date).setLocale('ru').toFormat('d LLL');
  }

  return DateTime.fromJSDate(date).setLocale('ru').toFormat('DDD');
}
