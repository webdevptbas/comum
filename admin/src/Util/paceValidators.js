// utils/paceValidators.js

export const paceValidators = (getFieldValue) => ({
  validator(_, value) {
    const paceMin = Number(getFieldValue("paceMin"));
    const paceMax = Number(value);

    if (value === undefined || value === "") {
      return Promise.resolve();
    }

    if (paceMax < 0 || paceMin < 0) {
      return Promise.reject(new Error("Pace must not be negative"));
    }

    if (paceMax < paceMin) {
      return Promise.reject(
        new Error("Maximum pace must be greater than or equal to minimum pace")
      );
    }

    return Promise.resolve();
  },
});
