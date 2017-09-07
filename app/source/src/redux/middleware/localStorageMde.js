export default function localStorageMde({
    getState,
    dispatch
}) {
    return (next) => (action) => {

        if (action.localStorage) {

            delete action.type;
            delete action.localStorage;

            for (let i in action) {
                localStorage.setItem(i, action[i]);
            }

            return localStorage;

        }

        let returnValue = next(action);

        return returnValue
    }
}