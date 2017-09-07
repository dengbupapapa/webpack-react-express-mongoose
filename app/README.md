# 开发文档（Asiainfo erp Internal use system--dbp) 
#### up--2017.5.29

* ## 一、技术栈
#### webpack [https://webpack.toobug.net/zh-cn/chapter2/](https://webpack.toobug.net/zh-cn/chapter2/)
#### react [http://www.css88.com/react/docs/animation.html](http://www.css88.com/react/docs/animation.html)
#### react-router [http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu) [http://www.uprogrammer.cn/react-router-cn/](http://www.uprogrammer.cn/react-router-cn/)
#### react-redux [http://cn.redux.js.org/index.html](http://cn.redux.js.org/index.html)
#### express [http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)
#### es6 [http://es6.ruanyifeng.com/#docs/destructuring](http://es6.ruanyifeng.com/#docs/destructuring)
#### less [http://less.bootcss.com](http://less.bootcss.com)
#### antd [https://ant.design/components/icon/](https://ant.design/components/icon/)
* ## 二、实现功能	
	* 1.利用webpack实现开发环境与生产环境的资源整合、热替换、按需加载等功能
	* 2.利用react实现数据渲染视图
	* 3.利用react-router实现客户端路由功能－单页面spa
	* 4.利用express搭建前端服务、结合swagger生成后端代理接口
	* 5.利用less对css开发的友好化
	* 6.利用es6语法和新属性提高开发效率、页面性能
	* 7.利用antd节省了大量招轮子时间

* ## 三、开发目录


		├── api -- 通过swagger生成代理后端api
		├── middleware -- express中间件集中营
		├── request -- 接收各种来自客户端的请求
		│        └── async -- 接收异步请求
		├── node_modules
		├── publish -- 发布时生成的文件（不用理它）
		├── source -- 源码目录
		│   ├── src
		│   │    ├── redux
		│   │    │    ├── action -- redux_action存放开发目录
		│   │    │    ├── reducers -- redux_reducers存放开发目录
		│   │    │    └── middleware -- redux_middleware
		│   │    │          ├── logger -- redux日志
		│   │    │          └── localStorage -- 本地存储（action包涵localStorage属性均本地存储）
		│   │    ├── module -- 页面视图、交互逻辑部分
		│   │    │    ├── use -- 各页面入口
		│   │    │    └── widget -- 公共模块
		│   │    ├── routes -- 客户端路由实现部分
		│   │    │    └── rootRoute -- 路由入口
		│   │    └── index.js -- javascript入口
		│   └── static -- 公共静态资源
		│        ├── images 
		│        ├── javascript
		│        └── less
		├── .baelrc
		├── webpack.config.js
		├── server.js
		└── app.js

* ## 四、开发前准备
	* #### 1.svn、github
	* #### 2.npm install、npm install webpack -g、npm run getApi
	* #### 3.sublime安装babel、JsFormat设置"e4x": true

* ## 五、使用
	* #### package scrpits
		* 1.npm star 启动开发环境
		* 2.npm start-tools 启动开发环境并打开store监听视图模块（有点问题）
		* 3.npm run publish 打包并发布
		* 4.npm run getApi 生成代理接口

	* #### contrller
		* 1.代理后端的api通过npm run getapi生成
		* 2.客户端请求通过async目录下的express_Mini_router访问
		* 3.express中间件规整在middleware中

	* #### src
		* 1.action type建议使用Symbol类型保障安全

				export const SET_LOGIN_ACTIVE = Symbol('SET_LOGIN_ACTIVE');

				export const setLoginAction = index => ({
    				type: SET_LOGIN_ACTIVE,
    				index
				});											
			async_action
			
				//demo 一般情况够用了
				/*
				 *  异步action
				 *  statusAction {dispatsh} 异步请求前后触发的dispatsh
				 *  start {opt} 异步请求前传入action的关键属性
				 *  end {opt} 异步请求后传入action的关键属性
				 *  opts {arg} fetch参数
				 */
				export const sendAsyncAction = ({
    				statusAction,
    				start,
    				end
				}, ...opts) => (dispatch) => {

    			if (start) statusAction(start);

    			return fetch(...opts)
        			.then(response => response.json(), err=> err)
        			.then(json => statusActend, json));

				}
			promise_action
			
					/*
					 *  p1 action ispromise
					 */
					export const sendPromiseAction = ({
					    action
					}, ...opts) => {
					    return fetch(opts)
					        .then(response => action(response.json()))

					};

					//p2 action.payload ispromise

					export const sendPromisePayloadAction = (type, ...opts) => ({
					    type: type,
					    payload: fetch(opts)
					        .then(response => action(response.json()))
					})

					//感觉目前用了redux－thunk就用不上这个玩意了（ps：可能还没想到场景，哈哈） 有兴趣可以去看下源码了解下/node_modules/redux-promise/lib/index.js
		* 2.书写 reducers 改变 state时切记不要直接改变state，可以通过es6剩余参数或assgin合并覆盖、Immutable操作 [相关文档](http://cn.redux.js.org/docs/basics/Reducers.html)

				{ ...state, ...newState }✅正确姿势
		
				Object.assign({},state, { visibilityFilter: action.filter })✅正确姿势
		
				export const retraceSlideTitle = (title = titleDefault, action) => {✅正确姿势
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
		
				Object.assign(state, { visibilityFilter: action.filter })❌错误姿势
		
				state.xxx = xxx ❌错误姿势
		
		* 3.module 一个模块等于一个文件夹，一个文件夹包涵了它所有的独有的资源，告别传统开发的资源散乱在各个目录中。另外使用less时，除公共样式直接给样式名外其余less需要导入后.classname

				import style from './index.less';
				<div className={style.div}> 导入独有样式
    				index<input className='input-main focus'/> 公共样式
				</div>

		* 4.routes 在开发页面级的widget时最好通过router去设置，其功能类似nunjucks的extents
		
				//router
				const index = {
    				path: 'index',
    				indexRoute: {
        				getComponent(nextState, callback) {
            				require.ensure([], (require) => {
                				callback(null, require('useModule/System/workIndex/workIndex').default)
            				}, 'use/System/workIndex')
        				},
    				},
    				getComponent(nextState, callback) {
        				require.ensure([], (require) => {
            				callback(null, require('widModule/headFoot/headFoot').default)
        				}, 'widget/headFoot')
    				},
    				childRoutes: [
        				require('./workDemo').default,
        				require('./workDemo2').default
    				]
				}

				export default index;
				
				//headFoot
				export default class headFoot extends Component {
    				render() {
        				return (
            				<div className='fn-bgd-fff fn-h-rate100'>
                				<HeadContent/>
                				{this.props.children}
                				<FootContent/>
            				</div>
        				)
    				}
				}
				
				//childroutes module直接写就是了不再需要引用 headfoot
				class workDemo extends Component {
    				render() {
        				return (
            				<div>
							........
            				</div>
        				);
    				}
				}

	* #### static
		* 1.公共资源存放处，less除reset外，按style属性分类，另外antdExtents.less为覆盖antd style 文件，然后baseConfig为less变量文件
	* #### async request
		* 1.请求url为request 内目录结构拼接＋自定义
	* #### 路径别名
		* 1.可以到webpack.base.config.js里去配置alias
		* 2.目前有	
				
				//src下目录
				'rActions': path.join(__dirname, './source/redux/src/actions'),
            	'rReducers': path.join(__dirname, './source/redux/src/reducers'),
            	'rmiddleware': path.join(__dirname, './source/redux/src/middleware'),
            	'sRoutes': path.join(__dirname, './source/src/routes'),
            	//static下目录
            	'jStatic': path.join(__dirname, './source/static/javascript'),
            	'lStatic': path.join(__dirname, './source/static/less'),
            	'iStatic': path.join(__dirname, './source/static/images'),
            	//module下目录
            	'useModule': path.join(__dirname, './source/src/module/use'),
            	'widModule': path.join(__dirname, './source/src/module/widget'),

* ## 六、存在问题
	* #### 1.貌似reducers、routes都存在开发期间开发人员都会动到根级文件从而导致冲突的情况，虽然只是少量内容的冲突非常好解决，不晓得各位有木有解决的办法
	* #### 2.想区分package script 配置除环境参数以外的值，从而是否开启tools工具，然而没找到入参到客户端code的方法。









































