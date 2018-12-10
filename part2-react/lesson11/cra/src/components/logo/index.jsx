import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';

export default class Logo extends Component {
    static propTypes = {
        num: PropTypes.number,
    };

    printLogo = () => {
        const ms = [];
        for(let i =0; i < this.props.num; i++){
            ms.push(<img key={`img_${ i }` } src={logo} className="App-logo" alt="logo" />);
        }
        return ms;
    };

    render() {
        return (
            <React.Fragment>
            {
                this.printLogo()
            }
            {
                this.props.children
            }
            </React.Fragment>);
    }
}