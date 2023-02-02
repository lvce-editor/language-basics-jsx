class Foo extends Component{
  render(){
    const { foo } = bar;

    return (
      <div attr="value">
        <p>Foo</p>
      </div>
    );
  }
}

class Foo extends Component{
  render(){
    const {
      foo } = bar;

    return (
      <div attr="value">
        <p>Foo</p>
      </div>
    );
  }
}
