import React from 'react';
import './Track.css';

export default class Track extends React.Component {

    async play () {
        try {
            await this.props.spotifyWebApi.play( {
                uris : [ `spotify:track:${ this.props.data.id }` ],
            } );
        } catch ( err ) {
            console.log( err.message );
        }
    }

    componentDidMount () {

    }

    render () {
        return (
            <div className = 'd-flex p-2 col-3' style = { {
                justifyContent : 'flex-start',
                alignItems     : 'center',
            } }>
                <img
                    alt = { this.props.data.name }
                    src = { this.props.data.album.images[ 1 ].url }
                    width = '150px'
                    height = '150px'
                    // className = 'm-1'
                    style = { {
                        backgroundColor : '#333',
                    } }
                />
                <div
                    onClick = { () => { this.play().then(); } }
                    className = 'btn-play'
                />
                <div className = 'w-100'>
                    <p className = 'm-3 text-center'>{ this.props.data.name }</p>
                    <p>
                        { this.props.data.artists.map( artist => {
                            return <span
                                className = 'small mx-1'
                                key = { artist.id }
                            >
                                { artist.name }
                            </span>;
                        } ) }
                    </p>
                </div>
            </div>
        );
    }
}