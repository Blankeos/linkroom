import cardsSchema from "./cardsSchema";

import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}

const validate = ajv.compile(cardsSchema);

export default validate;
