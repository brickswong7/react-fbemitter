https://github.com/facebook/emitter

在JavaScript中，事件的触发实质上是要经过三个阶段:事件捕获、目标对象本身的事件处理和事件冒泡


行为委托的实质就是将子元素事件的处理委托给父级元素处理（优化性能，通过冒泡来处理事件）


###知识点###   这里区分一下 IE事件与其他浏览事件的机制

1、表示发生事件：
（1）非IE浏览器下，事件对应的函数有一个隐藏的变量e，表示发生事件。
（2）IE下，不需要e变量，window.event表示发生事件。
解决方案：用e||window.event来兼容。

2、触发事件对象（触发事件的元素被认为是目标target）：
（1）IE下，window.event对象有srcElement属性，但没有target属性。
（2）Firefox下，e对象有target属性，但没有srcElement属性。
（3）Chrome下，e对象同时具有target和srcElement属性。
解决方案：event.srcElement ? event.srcElement : event.target来兼容。

3、按键码（字符代码）：
（1）IE下，window.event对象只有keyCode属性。
（2）FireFox下，e对象有which和charCode属性。
（3）Opera下，e对象有keyCode和which属性。
（4）Chrome下，e对象有keyCode、which和charCode属性。
解决方案：用e.keyCode || e.which || e.charCode来兼容。

4、阻止事件的默认行为：
（1）IE 中阻止事件的默认行为需要将window.event.returnValue属性设置为false。
（2）非IE阻止事件的默认行为需要调用 e.preventDefault() 方法。
解决方案：条件判断浏览器是否具有event.preventDefault再做相应处理。

5、阻止事件冒泡：
（1）IE阻止事件冒泡需要设置window.event.cancelBubble = true。
（2）非IE阻止事件冒泡需要调用e.stopPropagation()。
解决方案：条件判断浏览器是否具有event.stopPropagation再做相应处理。

function calBubble  (e) {
        //如果提供了事件对象，则这是一个非IE浏览器
        if (e && e.stopPropagation) {
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        }
        else {
            //否则，我们需要使用IE的方式来取消事件冒泡 
            window.event.cancelBubble = true;
            return false;
        }
    }
function pretDefault (e) {
        //如果提供了事件对象，则这是一个非IE浏览器
        if (e && e.preventDefault) {
            //阻止默认浏览器动作(W3C) 
            e.preventDefault();
        }
        else {
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
            return false;
        }
    }

###react###  的事件机制： 事件委派和自动绑定
事件委派同上，自动绑定是指：每一个组件实例都是指向this，会缓存组件。
但是 ecma6的class 或者是纯函数需要手动实现bind(this);

组件绑定this 事件绑定方法：
1、<div onClick={this.alert.bind(this)}  ></div>  
   <div onClick={::this.alert}  ></div>   只绑定不传参
2、构造函数绑定
   class app extends React.component{
    constructor(props) {
        super(props);
        //构造函数绑定 只需要绑定一次
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        console.log(e)
    }
    return(){
        <div onClick={this.handleClick} ></div>
    }
   }
 3 箭头函数 this直指宿主组件
  class app extends React.component{
    constructor(props) {
        super(props);
    }
    handleClick(e){
        console.log(e)
    }
    return(){
        <div onClick={()=>this.handleClick() } ></div>
    }
   }
 4 使用原生的浏览器事件  在react 生命周期 componentDidMount使用原生 但是必须在组件移除后去除监听 componentWillUnmount remover
 
 5 合成事件与原生事件混用 
   原因：react事件原理是通过事件冒泡绑定到最外层的组件来监听事件，所以并没有把事件绑定到指定元素上.
   body这样的元素实在组件之外，也是无法绑定的.
   reactEvent.nativeEvent.stopPropagation()。只能是用在react的合成系统。无法阻止原生事件 但是原生的阻止事件冒泡可以阻止react的冒泡
   window.reasize需要原生实现，react合成事件是原生事件的子集 
   
   强烈建议不要将合成和原生事件混用
   可以通过target方法捕获指定对象  
   document.body.addEventListener('click',e=>{
        if(e.target && e.target.matches('div.code')){
              return
        }
   })
   
   6 阻止原生事件传播 react只需要使用e.preventDefault()即可，不存在兼容的问题。获取对象e.target也不存在兼容






    
