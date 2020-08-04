import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react'


import Button, {ButtonType, ButtonProps,ButtonSize} from './button'

//创建click实例
const defaultProps = {
    onClick: jest.fn()
}

const testProps : ButtonProps = {
    btnType:    ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps :ButtonProps = {
    disabled: true
}


describe('test Button Component', () => {
    it('should render the current default button', () => {
        const wrapper =  render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')   //测试是否有这些classname
        //测试element上是否有click
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the current component base on different props', () => {
        const wrapper =  render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href='http://www.baidu.com'>Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn-link btn')
    })
    it('should render disabled button when disabled set to true', () => {
       const wrapper = render(<Button {...disabledProps}>Disable</Button>)
       const element = wrapper.getByText('Disable') 
       expect(element).toBeInTheDocument()
       expect(element.disabled).toBeTruthy()
    //    fireEvent.click(element)
    //    expect(disabledProps.onClick).toHaveBeenCalled()
    })
})