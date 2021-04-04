import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyComponent from './MyComponent';
// ComponentName.test.js
describe("MyComponent", () => {
  Enzyme.configure({ adapter: new Adapter() });
  it("should render my component", () => {
    const wrapper = shallow(<MyComponent />);
  });
  it("should render initial layout", () => {
    //   When
    const component = shallow (<MyComponent/>);
    //   Then
    expect (component.getElements()).toMatchSnapshot();
  });
  it("should create an entry in component state", () => {
    // given
    const component = shallow(<MyComponent />);
    const form = component.find('input');
    // when
    form.props().onChange({target: {
      name: 'myName',
      value: 'myValue'
    }});
    // then
    expect(component.state('input')).toBeDefined();
  });
  it("should create an entry in component state with the event value", () => {
    // given
    const component = shallow(<MyComponent />);
    const form = component.find('input');
    // when
    form.props().onChange({target: {
      name: 'myName',
      value: 'myValue'
    }});
    // then
    expect(component.state('input')).toEqual('myValue');
  });
});