import React from 'react';
import './../styles/Headline.scss';

export default class Headline extends React.Component {
    render() {
        return <span className="Headline-label">{this.props.text}</span>;
    }
}