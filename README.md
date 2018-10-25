## 单向数据流 示例


单向数据流是一种与React很好地协作的模式。这是因为组件不会修改它们收到的数据。<br>
它们只监听此数据的更改并可能提供新值，但它们不会更新实际数据。<br>
此更新发生在另一个位置的另一个机制之后，组件只是使用新值重新呈现。<br>
例如，让我们得到一个Switcher包含按钮的简单组件。如果我们点击它，我们必须在系统中启用一个标志。<br>

```javascript
class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false };
    this._onButtonClick = e => this.setState({
      flag: !this.state.flag
    });
  }
  render() {
    return (
      <button onClick={ this._onButtonClick }>
        { this.state.flag ? 'lights on' : 'lights off' }
      </button>
    );
  }
};

// ... and we render it
function App() {
  return <Switcher />;
};
```

此时我们的组件内部有数据。<br>
换句话说，Switcher是唯一一个了解我们的地方flag。让我们把它发送到某种商店：

```js
var Store = {
  _flag: false,
  set: function(value) {
    this._flag = value;
  },
  get: function() {
    return this._flag;
  }
};

class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false };
    this._onButtonClick = e => {
      this.setState({ flag: !this.state.flag }, () => {
        this.props.onChange(this.state.flag);
      });
    }
  }
  render() {
    return (
      <button onClick={ this._onButtonClick }>
        { this.state.flag ? 'lights on' : 'lights off' }
      </button>
    );
  }
};

function App() {
  return <Switcher onChange={ Store.set.bind(Store) } />;
};
```
我们的Store对象是一个单例，我们有帮助器来设置和获取_flag属性的值。<br>
通过将setter传递给Switcher我们，我们可以在外部更新数据。<br>
或多或少我们的应用程序工作流程如下：

假设我们通过标志将标志值保存到后端服务Store。<br>
当用户回来时，我们必须设置适当的初始状态。<br>
如果用户离开标志，true我们必须显示“开灯”而不是默认的“关灯”。<br>
现在它变得棘手，因为我们有两个地方的数据。<br>
用户界面和Store拥有自己的状态。<br>
我们必须从商店到切换台以及从切换台到商店的双向通信

