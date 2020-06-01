/**
 *
 * @author 	Iesypko Denys
 */
function calculator(string) {

    let result = "";
    if (!validation(string)) {
        throw new SyntaxError("ошибка валидации входно строки");
    }
    // масив разбитых подстрок
    let arr_string = parser_String(string);
    // код если строка из римских цифр
    if (isResultRome(string)) {

        // получаем и преобразуем преобразовываем цифры
        let rom_arab1_numeral = convertRomeToArab(arr_string[0]);
        let mathematical_operation = arr_string[1];
        let rom_arab2_numeral = convertRomeToArab(arr_string[2]);
        // результат вычисления
        rezult = calculation(rom_arab1_numeral, mathematical_operation, rom_arab2_numeral);
        // округляем
        rezult = Math.floor(rezult);
        //конвертируем в римские цифры
        rezult = convertArabToRome(rezult);
    }
    // если строка из арабских цифр
    else {
        // получаем цифры
        let arab1_numeral = arr_string[0];
        let mathematical_operation = arr_string[1];
        let arab2_numeral = arr_string[2];
        // результат вычисления
        rezult = calculation(arab1_numeral, mathematical_operation, arab2_numeral);
        // округляем
        rezult = Math.floor(rezult);
        // преобразуем результат в строку
        rezult = rezult + "";
    }
    ///   возвращаем  результат
    return rezult;

//    *************  Вспомогательные функции


    /**
     * проверка на совпадение шаблону входной строки
     * @param in_string  входная строка
     * @returns {boolean}  логический результат проверки
     */

    function validation(in_string) {
        const resultArab = /^([1-9]|10)([\s]?)*[-+*/]([\s]?)*([1-9]|10)$/g;
        const resultRome = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)([\s]?)*[-+*/]([\s]?)*(I|II|III|IV|V|VI|VII|VIII|IX|X)$/g;
        in_string = in_string.trim();

        const boolean_resultArab = resultArab.test(string);
        const boolean_resultRome = resultRome.test(string);

        return boolean_resultArab || boolean_resultRome
    }

    /**
     * проверка  является ли шаблон строкой с римскими цифрами
     * @param input_string входная строка
     * @returns {boolean} логический результат проверки
     */
    function isResultRome(input_string) {
        input_string = input_string.trim();
        const resultRome = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)([\s]?)*[-+*/]([\s]?)*(I|II|III|IV|V|VI|VII|VIII|IX|X)$/g;
        return resultRome.test(input_string);
    }

    /**
     *  разбивает  строку на  3 подстроки и возвоащет масив
     * @param input_string ходная строка
     * @returns {[string, string, string]}
     */
    function parser_String(input_string) {
        let math_start_position = 0;
        for (let i = 0; i < input_string.length; i += 1) {
            if ((input_string.charAt(i) === '-') ||
                (input_string.charAt(i) === '+') ||
                (input_string.charAt(i) === '*') ||
                (input_string.charAt(i) === '/')
            ) math_start_position = i;
        }
        // 1 цифра
        const str1 = input_string.substring(0, math_start_position).trim();
        //2  цифра
        const str2 = input_string.substring(math_start_position + 1).trim();
        // математический знак (+,-,*,/)
        const mathematical_operation = input_string.charAt(math_start_position).trim();

        return [str1, mathematical_operation, str2];
    }

    /**
     * преобразовывает арабские цифры в римские
     * @param int
     * @returns {string} римскую цифру
     */
    function convertArabToRome(int) {
        const map2 = new Map([["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]]);
        let value = '';

        for (let entry of map2) {
            while (int >= entry[1]) {
                value += entry[0];
                int -= entry[1];
            }
        }
        return value;
    }

    /**
     *
     * @param str1  - 1 цифра
     * @param mathematical_operation -математический знак
     * @param str2  - 2 цифра
     * @returns {number} результат вычисления
     */
    function calculation(str1, mathematical_operation, str2) {
        let result = 0;

        switch (mathematical_operation) {
            case "*":
                result = str1 * str2;
                break;
            case "/":
                result = str1 / str2;
                break;
            case "+":
                result = parseInt(str1) + parseInt(str2);
                break;
            case "-":
                result = str1 - str2;
                break;
        }
        return result;
    }

    /**
     * преобразовываем  римские цифры в арабские
     * @param romanNumber
     * @returns {number} арабская цифра
     */

    function convertRomeToArab(romanNumber){

        const romanNumList = ["CM","M","CD","D","XC","C","XL","L","IX","X","IV","V","I"];
        const corresp = [900,1000,400,500,90,100,40,50,9,10,4,5,1];
        let index =  0, num = 0;
        for(let rn in romanNumList){
            index = romanNumber.indexOf(romanNumList[rn]);
            while(index !== -1){
                num += parseInt(corresp[rn]);
                romanNumber = romanNumber.replace(romanNumList[rn],"-");
                //console.log(romanNumber);
                index = romanNumber.indexOf(romanNumList[rn]);
            }
        }
        return num;
    }

}
module.exports = calculator;


