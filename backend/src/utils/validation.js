exports.HandleValidationFails = (validation_object) => {
  if (validation_object.fails()) {
    const errors = validation_object.errors.all();
    throw new Error(errors[Object.keys(errors)[0]]);
  } else {
    return;
  }
};