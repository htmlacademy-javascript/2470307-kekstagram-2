// Функция для проверки длины строки.

const checkLengthString = (string, maxLength) => string.length <= maxLength;

checkLengthString('проверяемая строка абрвал', 27);
checkLengthString('проверяемая строка абрвал', 3);

// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (str) => {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  return normalizedStr === [...normalizedStr].reverse().join('');
};

isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('Кот');


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

returnNumber('1 кефир, 0.5 батона');
returnNumber('а я томат');
returnNumber(-1.5);
returnNumber('агент 007');
