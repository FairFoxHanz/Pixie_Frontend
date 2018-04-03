import _ from "lodash";
import moment from "moment";
import formFields from "./formFields";

const isNumber = value => value && isNaN(Number(value));
const isNegative = value => Number(value) < 0;

export default values => {
  const errors = {};
  console.log(values);
  _.forEach(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}!`;
    }
  });

  if (!values.date) {
    errors.date = `You must provide date of event!`;
  } else {
    if (!moment(values.date).isAfter(Date.now())) {
      errors.date = "Date can't be in past.";
    }
  }

  const inventoryErrors = [];
  if (values.inventory) {
    values.inventory.forEach((item, itemIndex) => {
      const itemErrors = {};
      if (!item.name) {
        itemErrors.name = "You must provide name";
      }
      if (item.amount) {
        itemErrors.amount = isNumber(item.amount)
          ? "Must be a number"
          : isNegative(item.amount) ? "Must be a positive number" : undefined;
      } else {
        itemErrors.amount = "Provide amount";
      }
      if (item.unit) {
        itemErrors.unit = isNumber(item.unit) ? undefined : "Not a unit";
      } else {
        itemErrors.unit = "Provide units";
      }
      inventoryErrors[itemIndex] = itemErrors;
    });
  }
  errors.inventory = inventoryErrors;

  return errors;
};
