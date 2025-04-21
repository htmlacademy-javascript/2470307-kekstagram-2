// Функция для проверки длины строки.

const checkLengthString = (string, maxLength) => string.length <= maxLength;

console.log('Проверка длины строки: ', checkLengthString('проверяемая строка абрвал', 27));
console.log('Проверка длины строки: ', checkLengthString('проверяемая строка абрвал', 3));


// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (str) => {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  return normalizedStr === [...normalizedStr].reverse().join('');
};

console.log('Проверка на палиндромность: ', isPalindrome('Лёша на полке клопа нашёл '));
console.log('Проверка на палиндромность: ', isPalindrome('Кот'));


/*
Функция принимает строку, извлекает содержащиеся в ней цифры
от 0 до 9 и возвращает их в виде целого положительного числа.
*/

const returnNumber = (input) => {
  let digits = '';
  for (const char of String(input)) {
    if (char >= '0' && char <= '9') {
      digits += char;
    }
  }
  return digits ? +digits : NaN;
};

console.log('Пытаемся вернуть число: ', returnNumber('1 кефир, 0.5 батона'));
console.log('Пытаемся вернуть число: ', returnNumber('а я томат'));
console.log('Пытаемся вернуть число: ', returnNumber(-1.5));
console.log('Пытаемся вернуть число: ', returnNumber('агент 007'));
