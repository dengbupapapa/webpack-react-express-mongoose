### module
	import {
    	Form,
    	Input,
    	Select,
    	Textarea,
    	Radio,
    	Checkbox,
    	method
	} from 'forms';

### use widget

	<Input
    	className="formas"
        name="name1"
        placeholder="写点啥"
        rules={/^\d+$/}
        errorMessage="请输入数字"
        onlyBlurThrow
        team='team2'
    />
    <Select
    	className="formas"
        name="name1"
        placeholder="写点啥"
        rules={this.fun}
        errorMessage="请输入数字"
        onlyBlurThrow
        team='team2'
    />
    <Textarea
    	className="formas"
        name="name1"
        rules={this.fun}
        errorMessage="请输入数字"
        onlyBlurThrow
        team='team2'
    />
    <Checkbox name="checkbox1" value="yes" checked required errorMessage="必选一个" minNum={2} maxNum={3}/>
    <Checkbox name="checkbox1" value="no" minNum={2} errorMessage="至少选两个"/>
    <Checkbox name="checkbox1" value="no" minNum={3} errorMessage="最多选三个"/>
    <Checkbox
    	name="checkbox1"
       	rules={function(values){
       		return true
      	}}
        checked
        errorMessage="反正就是选错了"
    />
    <Radio name="radio1" value="1" required/>
    <Radio name="radio1"
    	rules={function(value){
    		return value=='3';
    	}}
    	onChange={function(){console.log('onChange')}}
    	errorMessage="来自radio的错误"
    />
    <Radio name="radio1" checked value="3"/>
    <Form onSubmit={this.submithandle.bind(this)} className="formas" team="teamform"></Form>
    
    
### vaild()、getValues()
	let team = 'team2'//需要验证的组或组值
	method.valid(team,(result) => {}).then((result) => {});
    method.getValues(team);