import _ from "lodash";
import moment from "moment";
import formFields from "./formFields";

export default (values) => {
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

        // if (values.inventory) {
        //     values.inventory.forEach((item, itemIndex) => {
        //         if(!item.name){
        //             const nameError = "asdas"
        //             errors.inventory[itemIndex].name="asdasd"
        //         }
        //     })
        // }
      
        return errors;
      
}