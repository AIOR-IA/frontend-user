const removeBlankSpaces = (text: string): string => {
    return text.replace(/\s/g, '');
}

const shortenBlankSpaces = ( text: string ): string => {
    return text.replace(/\s+/g, ' ');
} 

const validationPatternNames = "[A-Za-z'ñÑáéíóúÁÉÍÓÚ ]*";

const validationPatternUserName = "[0-9A-Za-z]*";

const validationPatternEmail = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

const validationPatternPassword = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$";


export {
    removeBlankSpaces,
    shortenBlankSpaces,
    validationPatternNames,
    validationPatternUserName,
    validationPatternEmail,
    validationPatternPassword,
};
  