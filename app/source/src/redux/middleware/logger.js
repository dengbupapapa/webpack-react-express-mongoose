export default function logger({
    getState,
    dispatch
}) {
    return (next) => (action) => {

        console.log('will dispatch', action);

        let returnValue = next(action);

        console.log('state after dispatch', getState());

        return returnValue

    }
}