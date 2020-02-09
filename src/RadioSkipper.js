import React  from 'react';
import Switch from 'react-switch';

export default class RadioSkipper extends React.Component {

    constructor ( props, context ) {
        super( props, context );
        this.state = {
            enabled : false,
        };


    }

    componentDidMount () {

    }

    handleChange ( checked ) {
        if ( checked ) {

        } else {

        }
    }

    render () {
        return ( <>
            <label>
                <span>Radio Skip</span>
                <Switch
                    checked = { this.state.enabled }
                    onChange = { this.handleChange }
                />
            </label>
        </> );
    }
};