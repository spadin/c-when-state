import React from 'react';
import WhenState from './WhenState';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

chai.use(chaiEnzyme());

const mockStore = configureStore([]);

describe('<WhenState>', () => {
  it('renders children when predicate function returns true', () => {
    const store = mockStore();
    const children = <span>Hello world!</span>;
    const component = mount(
      <WhenState
        predicate={() => true}
        store={store}
      >
        {children}
      </WhenState>
    );
    expect(component).to.contain(children);
  });

  it('does not render children when predicate function returns false', () => {
    const store = mockStore();
    const children = <span>Hello world!</span>;
    const component = mount(
      <WhenState
        predicate={() => false}
        store={store}
      >
        {children}
      </WhenState>
    );
    expect(component).be.empty;
  });

  it('passes redux state to predicate callback', () => {
    const store = mockStore({isTesting: true});
    const children = <span>Hello world!</span>;
    const component = mount(
      <WhenState
        predicate={({isTesting}) => isTesting}
        store={store}
      >
        {children}
      </WhenState>
    );
    expect(component).to.contain(children);
  });
});
