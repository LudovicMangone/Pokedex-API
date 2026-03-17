export function joiValidator(schema, dataToValidate) {
    const { error, value } = schema.validate(dataToValidate, { abortEarly: false });
    if (error) {
        return error;
        }
    return true;
}