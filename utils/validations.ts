export const RESTRICTIONS = {
  title: {
    min: 2,
    max: 128,
  },
  pka: {
    min: 2,
    max: 128,
  },
};

const albumSharedValidations = {
  title: (value?: string) => {
    if (!value) {
      return "Album name is required";
    }

    return value.length < RESTRICTIONS.title.min
      ? `Name must be at least ${RESTRICTIONS.title.min} characters`
      : value.length > RESTRICTIONS.title.max
      ? `Name must be shorted than ${RESTRICTIONS.title.max} characters`
      : null;
  },
  pka: (value?: string) => {
    if (!value) {
      return "PKA is required";
    }

    return value.length < RESTRICTIONS.pka.min
      ? `PKA must be at least ${RESTRICTIONS.pka.min} characters`
      : value.length > RESTRICTIONS.pka.max
      ? `PKA must be shorted than ${RESTRICTIONS.pka.max} characters`
      : null;
  },
};

export function getEditFormValidateInput() {
  return albumSharedValidations;
}
