export const formsWidgetNamesArray = [
    "react-validate-forms-input",
    "react-validate-forms-select",
    "react-validate-forms-textarea",
    "react-validate-forms-checkbox",
    "react-validate-forms-radio"
]
export const controlStorePosition = {
    "ALONES": "alones",
    "CHECKBOXS": "checkboxs",
    "RADIOS": "radios"
}

const RULES_FUNC = Symbol('RULES_FUNC');

function rulesDefaultProps() {}

rulesDefaultProps.RULES_FUNC = RULES_FUNC;

export function rulesDefaultProps() {}