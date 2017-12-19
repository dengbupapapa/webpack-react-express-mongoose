import React from 'react'
import {
    render
} from 'react-dom';
import {
    Provider
} from 'react-redux';
import DevTools from './redux/devTools';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';
import rootRouter from 'sRoutes/rootRoute';
import configureStore from './redux/createStore';

const store = configureStore();

// function log(target, name, descriptor) {
//     var oldValue = descriptor.value;

//     descriptor.value = function() {
//         console.log(`Calling "${name}" with`, arguments);
//         return oldValue.apply(null, arguments);
//     };

//     return descriptor;
// }
// class Math {
//     @log
//     add(a, b) {
//         return a + b;
//     }
// }
// console.log(needTool)
// const math = new Math();

// // passed parameters should get logged now
// math.add(2, 4);
fetch.default({
    uriPrefix: notTemplateRequestUriPrefix
});
fetch('/post', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory} routes={rootRouter}/>
            {/*process.env.NODE_ENV=='development'?<DevTools/>:null*/}
        </div>
    </Provider>,
    document.getElementById('Root')
);