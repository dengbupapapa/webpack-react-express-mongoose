import {
    GET_RE_TRACE_SLIDE_TITLE
} from 'rActions/page/retraceSlide/retraceSlide1'
import Immutable from 'immutable';

let titleMatch = location.search.match(/((\?|\&)title=(.+(?=\&)))|((\?|\&)title=(.+))/);
let titleDefault = titleMatch ? [titleMatch[6]] : [];

export const retraceSlideTitle = (title = titleDefault, action) => {
    switch (action.type) {
        case GET_RE_TRACE_SLIDE_TITLE:

            let $$title = Immutable.List.of(...title);
            let titleIndex = $$title.indexOf(action.title)
            let titleBool = $$title.includes(action.title)

            if (titleBool) {
                return $$title.slice(0, titleIndex + 1).toJS();
            } else {
                return [...$$title.toJS(), action.title];
            }

        default:
            return title;
    }
}